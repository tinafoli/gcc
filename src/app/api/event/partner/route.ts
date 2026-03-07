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
  const tabName = 'Partners';

  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tabName}!A1:I1`,
  });

  if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${tabName}!A1:I1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          'Date',
          'Full Name',
          'Organization',
          'Role',
          'Email',
          'Phone',
          'Partnership Type',
          'Support Areas',
          'Budget',
        ]],
      },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tabName}!A:I`,
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
    const { fullName, email, phone, partnershipType } = body;

    if (!fullName || !email || !phone || !partnershipType) {
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

    const supportAreas = Array.isArray(body.supportAreas) ? body.supportAreas.map((a: string) => sanitize(a)).join(', ') : 'None selected';

    const partnershipLabels: Record<string, string> = {
      'sponsor': 'Event Sponsor',
      'partner': 'Strategic Partner',
      'donor': 'Donor',
      'corporate': 'Corporate Partner',
      'ngo': 'NGO / Foundation Partner',
      'individual': 'Individual Supporter',
    };

    const safe = {
      fullName: sanitize(fullName),
      email: sanitize(email),
      phone: sanitize(phone),
      organization: sanitize(body.organization || 'Not specified'),
      role: sanitize(body.role || 'Not specified'),
      partnershipType: sanitize(partnershipLabels[partnershipType] || partnershipType),
      budget: sanitize(body.budget || 'Not specified'),
      message: sanitize(body.message || 'None provided'),
    };

    await Promise.all([
      resend.emails.send({
        from: 'Ghana Code Club <onboarding@resend.dev>',
        to: 'codeclubghana@gmail.com',
        replyTo: email,
        subject: `🤝 New Partner/Sponsor Interest: ${safe.fullName}${body.organization ? ` (${safe.organization})` : ''}`,
        text: `Partner/Sponsor Interest - Workbook Launch\n\nName: ${fullName}\nOrganization: ${body.organization || 'Not specified'}\nRole: ${body.role || 'Not specified'}\nEmail: ${email}\nPhone: ${phone}\n\nPartnership Type: ${partnershipLabels[partnershipType] || partnershipType}\nSupport Areas: ${supportAreas}\nBudget: ${body.budget || 'Not specified'}\n\nMessage: ${body.message || 'None provided'}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #16a34a, #15803d); padding: 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0;">🤝 New Partner/Sponsor Interest</h2>
            <p style="color: rgba(255,255,255,0.9); margin: 4px 0 0;">Workbook Launch Event</p>
          </div>
          <div style="background-color: #f9fafb; padding: 24px; border-radius: 0 0 12px 12px;">
            <h3 style="color: #1f2937; margin: 0 0 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Name</td><td style="padding: 8px 0; color: #4b5563;">${safe.fullName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Organization</td><td style="padding: 8px 0; color: #4b5563;">${safe.organization}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Role</td><td style="padding: 8px 0; color: #4b5563;">${safe.role}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email</td><td style="padding: 8px 0; color: #4b5563;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone</td><td style="padding: 8px 0; color: #4b5563;">${safe.phone}</td></tr>
            </table>
            <h3 style="color: #1f2937; margin: 16px 0 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Partnership Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Type</td><td style="padding: 8px 0; color: #4b5563;">${safe.partnershipType}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Support Areas</td><td style="padding: 8px 0; color: #4b5563;">${supportAreas}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Budget</td><td style="padding: 8px 0; color: #4b5563;">${safe.budget}</td></tr>
            </table>
            <h3 style="color: #1f2937; margin: 16px 0 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Message</h3>
            <p style="color: #4b5563; white-space: pre-wrap;">${safe.message}</p>
          </div>
        </div>
      `,
      }),
      appendToSheet([
        new Date().toLocaleString('en-GB', { timeZone: 'Africa/Accra' }),
        fullName,
        body.organization || '',
        body.role || '',
        email,
        phone,
        partnershipLabels[partnershipType] || partnershipType,
        Array.isArray(body.supportAreas) ? body.supportAreas.join(', ') : '',
        body.budget || '',
      ]),
    ]);

    return NextResponse.json({ message: 'Interest submitted successfully!' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit. Please try again later.' },
      { status: 500 }
    );
  }
}
