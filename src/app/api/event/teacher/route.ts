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
  const tabName = 'Teachers';

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
          'Email',
          'Phone',
          'School',
          'Subjects',
          'Years Teaching',
          'Grade Level',
          'Heard About',
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
    const { fullName, email, phone, school, subjects } = body;

    if (!fullName || !email || !phone || !school || !subjects) {
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

    const safe = {
      fullName: sanitize(fullName),
      email: sanitize(email),
      phone: sanitize(phone),
      school: sanitize(school),
      subjects: sanitize(subjects),
      yearsTeaching: sanitize(body.yearsTeaching || 'Not specified'),
      gradeLevel: sanitize(body.gradeLevel || 'Not specified'),
      heardAbout: sanitize(body.heardAbout || 'Not specified'),
      expectations: sanitize(body.expectations || 'None provided'),
    };

    await Promise.all([
      resend.emails.send({
        from: 'Ghana Code Club <onboarding@resend.dev>',
        to: 'codeclubghana@gmail.com',
        replyTo: email,
        subject: `📚 New Teacher Registration: ${safe.fullName}`,
        text: `Teacher Registration - Workbook Launch\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nSchool: ${school}\nSubjects: ${subjects}\nYears Teaching: ${body.yearsTeaching || 'Not specified'}\nGrade Level: ${body.gradeLevel || 'Not specified'}\nHeard About Event: ${body.heardAbout || 'Not specified'}\nExpectations: ${body.expectations || 'None provided'}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); padding: 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0;">📚 New Teacher Registration</h2>
            <p style="color: rgba(255,255,255,0.9); margin: 4px 0 0;">Workbook Launch Event</p>
          </div>
          <div style="background-color: #f9fafb; padding: 24px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Name</td><td style="padding: 8px 0; color: #4b5563;">${safe.fullName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email</td><td style="padding: 8px 0; color: #4b5563;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone</td><td style="padding: 8px 0; color: #4b5563;">${safe.phone}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">School</td><td style="padding: 8px 0; color: #4b5563;">${safe.school}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Subjects</td><td style="padding: 8px 0; color: #4b5563;">${safe.subjects}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Years Teaching</td><td style="padding: 8px 0; color: #4b5563;">${safe.yearsTeaching}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Grade Level</td><td style="padding: 8px 0; color: #4b5563;">${safe.gradeLevel}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Heard About</td><td style="padding: 8px 0; color: #4b5563;">${safe.heardAbout}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Expectations</td><td style="padding: 8px 0; color: #4b5563;">${safe.expectations}</td></tr>
            </table>
          </div>
        </div>
      `,
      }),
      appendToSheet([
        new Date().toLocaleString('en-GB', { timeZone: 'Africa/Accra' }),
        fullName,
        email,
        phone,
        school,
        subjects,
        body.yearsTeaching || '',
        body.gradeLevel || '',
        body.heardAbout || '',
      ]),
    ]);

    return NextResponse.json({ message: 'Registration successful!' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit registration. Please try again later.' },
      { status: 500 }
    );
  }
}
