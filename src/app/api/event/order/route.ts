import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { google } from 'googleapis';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 });
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

function sanitize(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function appendToSheet(rowData: string[]) {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !rawKey || !sheetId) {
    throw new Error('Google Sheets is not configured.');
  }

  let privateKey = rawKey;
  if (rawKey.includes('\\n')) {
    privateKey = rawKey.replace(/\\n/g, '\n');
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const tabName = 'Orders';
  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tabName}!A1:L1`,
  });

  if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${tabName}!A1:L1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [['Date', 'Full Name', 'Email', 'Phone', 'Organization', 'Region', 'City', 'Address', 'Workbook Type', 'Quantity', 'Purpose', 'Notes']],
      },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tabName}!A:L`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [rowData],
    },
  });
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { fullName, email, phone, region, city, workbookType, quantity } = body;

    if (!fullName || !email || !phone || !region || !city || !workbookType || !quantity) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const workbookLabels: Record<string, string> = {
      'ai-workbook': 'Coding & AI Workbook',
      'both': 'Both (Coding Kit + AI Workbook)',
    };

    const purposeLabels: Record<string, string> = {
      'personal': 'Personal Use',
      'classroom': 'Classroom / Teaching',
      'school-bulk': 'School Bulk Order',
      'organization': 'Organization / NGO',
      'gift': 'Gift',
      'other': 'Other',
    };

    const safe = {
      fullName: sanitize(fullName),
      email: sanitize(email),
      phone: sanitize(phone),
      organization: sanitize(body.organization || 'Not specified'),
      region: sanitize(region),
      city: sanitize(city),
      address: sanitize(body.address || 'Not provided'),
      workbookType: sanitize(workbookLabels[workbookType] || workbookType),
      quantity: sanitize(String(quantity)),
      purpose: sanitize(purposeLabels[body.purpose] || body.purpose || 'Not specified'),
      message: sanitize(body.message || 'None'),
    };

    // Send email and write to Google Sheets in parallel
    await Promise.all([
      resend.emails.send({
        from: 'Ghana Code Club <onboarding@resend.dev>',
        to: 'codeclubghana@gmail.com',
        replyTo: email,
        subject: `📦 New Workbook Order: ${safe.quantity}x ${safe.workbookType} — ${safe.fullName}`,
        text: `New Workbook Order\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nOrganization: ${body.organization || 'Not specified'}\n\nDelivery:\nRegion: ${region}\nCity: ${city}\nAddress: ${body.address || 'Not provided'}\n\nOrder:\nWorkbook: ${workbookLabels[workbookType] || workbookType}\nQuantity: ${quantity}\nPurpose: ${purposeLabels[body.purpose] || body.purpose || 'Not specified'}\n\nNotes: ${body.message || 'None'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 24px; border-radius: 12px 12px 0 0;">
              <h2 style="color: white; margin: 0;">📦 New Workbook Order</h2>
              <p style="color: rgba(255,255,255,0.9); margin: 4px 0 0;">${safe.quantity}x ${safe.workbookType}</p>
            </div>
            <div style="background-color: #f9fafb; padding: 24px; border-radius: 0 0 12px 12px;">
              <h3 style="color: #1f2937; margin: 0 0 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Customer Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Name</td><td style="padding: 8px 0; color: #4b5563;">${safe.fullName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email</td><td style="padding: 8px 0; color: #4b5563;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone</td><td style="padding: 8px 0; color: #4b5563;">${safe.phone}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Organization</td><td style="padding: 8px 0; color: #4b5563;">${safe.organization}</td></tr>
              </table>
              <h3 style="color: #1f2937; margin: 16px 0 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Delivery Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Region</td><td style="padding: 8px 0; color: #4b5563;">${safe.region}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">City / Town</td><td style="padding: 8px 0; color: #4b5563;">${safe.city}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Address</td><td style="padding: 8px 0; color: #4b5563;">${safe.address}</td></tr>
              </table>
              <h3 style="color: #1f2937; margin: 16px 0 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Order Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Workbook</td><td style="padding: 8px 0; color: #4b5563;">${safe.workbookType}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Quantity</td><td style="padding: 8px 0; color: #4b5563; font-size: 18px; font-weight: bold;">${safe.quantity}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Purpose</td><td style="padding: 8px 0; color: #4b5563;">${safe.purpose}</td></tr>
              </table>
              <h3 style="color: #1f2937; margin: 16px 0 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Additional Notes</h3>
              <p style="color: #4b5563; white-space: pre-wrap;">${safe.message}</p>
            </div>
          </div>
        `,
      }),

      appendToSheet([
        new Date().toLocaleString('en-GB', { timeZone: 'Africa/Accra' }),
        fullName,
        email,
        phone,
        body.organization || '',
        region,
        city,
        body.address || '',
        workbookLabels[workbookType] || workbookType,
        String(quantity),
        purposeLabels[body.purpose] || body.purpose || '',
        body.message || '',
      ]),
    ]);

    return NextResponse.json({ message: 'Order submitted successfully!' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit order. Please try again later.' },
      { status: 500 }
    );
  }
}
