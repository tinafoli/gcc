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
  const tabName = 'Schools';

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
        values: [[
          'Date',
          'School Name',
          'Location',
          'Region',
          'Contact Name',
          'Contact Role',
          'Contact Email',
          'Contact Phone',
          'Student Count',
          'ICT Teacher Count',
          'Has ICT Lab',
          'Interests',
        ]],
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
    const { schoolName, location, region, contactName, contactRole, contactEmail, contactPhone } = body;

    if (!schoolName || !location || !region || !contactName || !contactRole || !contactEmail || !contactPhone) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
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

    const interests = Array.isArray(body.interests) ? body.interests.map((i: string) => sanitize(i)).join(', ') : 'None selected';

    const safe = {
      schoolName: sanitize(schoolName),
      location: sanitize(location),
      region: sanitize(region),
      contactName: sanitize(contactName),
      contactRole: sanitize(contactRole),
      contactEmail: sanitize(contactEmail),
      contactPhone: sanitize(contactPhone),
      studentCount: sanitize(body.studentCount || 'Not specified'),
      ictTeacherCount: sanitize(body.ictTeacherCount || 'Not specified'),
      hasICTLab: sanitize(body.hasICTLab || 'Not specified'),
      additionalInfo: sanitize(body.additionalInfo || 'None provided'),
    };

    await Promise.all([
      resend.emails.send({
        from: 'Ghana Code Club <onboarding@resend.dev>',
        to: 'codeclubghana@gmail.com',
        replyTo: contactEmail,
        subject: `🏫 New School Registration: ${safe.schoolName}`,
        text: `School Registration - Workbook Launch\n\nSchool: ${schoolName}\nLocation: ${location}\nRegion: ${region}\nStudents: ${body.studentCount || 'Not specified'}\nICT Teachers: ${body.ictTeacherCount || 'Not specified'}\nICT Lab: ${body.hasICTLab || 'Not specified'}\n\nContact: ${contactName} (${contactRole})\nEmail: ${contactEmail}\nPhone: ${contactPhone}\n\nInterests: ${interests}\nAdditional Info: ${body.additionalInfo || 'None provided'}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0;">🏫 New School Registration</h2>
            <p style="color: rgba(255,255,255,0.9); margin: 4px 0 0;">Workbook Launch Event</p>
          </div>
          <div style="background-color: #f9fafb; padding: 24px; border-radius: 0 0 12px 12px;">
            <h3 style="color: #1f2937; margin: 0 0 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">School Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">School</td><td style="padding: 8px 0; color: #4b5563;">${safe.schoolName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Location</td><td style="padding: 8px 0; color: #4b5563;">${safe.location}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Region</td><td style="padding: 8px 0; color: #4b5563;">${safe.region}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Students</td><td style="padding: 8px 0; color: #4b5563;">${safe.studentCount}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">ICT Teachers</td><td style="padding: 8px 0; color: #4b5563;">${safe.ictTeacherCount}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">ICT Lab</td><td style="padding: 8px 0; color: #4b5563;">${safe.hasICTLab}</td></tr>
            </table>
            <h3 style="color: #1f2937; margin: 16px 0 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Contact Person</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Name</td><td style="padding: 8px 0; color: #4b5563;">${safe.contactName} (${safe.contactRole})</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email</td><td style="padding: 8px 0; color: #4b5563;"><a href="mailto:${safe.contactEmail}">${safe.contactEmail}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone</td><td style="padding: 8px 0; color: #4b5563;">${safe.contactPhone}</td></tr>
            </table>
            <h3 style="color: #1f2937; margin: 16px 0 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Interests</h3>
            <p style="color: #4b5563;">${interests}</p>
            <h3 style="color: #1f2937; margin: 16px 0 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Additional Information</h3>
            <p style="color: #4b5563;">${safe.additionalInfo}</p>
          </div>
        </div>
      `,
      }),
      appendToSheet([
        new Date().toLocaleString('en-GB', { timeZone: 'Africa/Accra' }),
        schoolName,
        location,
        region,
        contactName,
        contactRole,
        contactEmail,
        contactPhone,
        body.studentCount || '',
        body.ictTeacherCount || '',
        body.hasICTLab || '',
        Array.isArray(body.interests) ? body.interests.join(', ') : '',
      ]),
    ]);

    return NextResponse.json({ message: 'School registration successful!' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit registration. Please try again later.' },
      { status: 500 }
    );
  }
}
