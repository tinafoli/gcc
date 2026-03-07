import { google } from 'googleapis';

const SESSION_STATE_TAB = 'AdminSessionState';
const HEADERS = ['key', 'value', 'updatedAt'];
const INVALID_BEFORE_KEY = 'globalInvalidBefore';

function buildAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!clientEmail || !rawKey || !sheetId) return null;
  const key = rawKey.includes('\\n') ? rawKey.replace(/\\n/g, '\n') : rawKey;
  return {
    sheetId,
    auth: new google.auth.JWT({
      email: clientEmail,
      key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    }),
  };
}

async function ensureTab(sheets: ReturnType<typeof google.sheets>, sheetId: string) {
  let response;
  try {
    response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${SESSION_STATE_TAB}!A1:C1`,
    });
  } catch {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: SESSION_STATE_TAB } } }] },
    });
    response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${SESSION_STATE_TAB}!A1:C1`,
    });
  }
  if (!response.data.values || response.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${SESSION_STATE_TAB}!A1:C1`,
      valueInputOption: 'RAW',
      requestBody: { values: [HEADERS] },
    });
  }
}

export async function getGlobalSessionInvalidBefore(): Promise<number> {
  const conf = buildAuth();
  if (!conf) return 0;
  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureTab(sheets, conf.sheetId);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: conf.sheetId,
      range: `${SESSION_STATE_TAB}!A2:C`,
    });
    const rows = response.data.values || [];
    const row = rows.find((r) => (r[0] || '').trim() === INVALID_BEFORE_KEY);
    const raw = row?.[1] || '';
    const ts = Date.parse(raw);
    return Number.isNaN(ts) ? 0 : Math.floor(ts / 1000);
  } catch {
    return 0;
  }
}

export async function setGlobalSessionInvalidBefore(iso: string): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureTab(sheets, conf.sheetId);
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: conf.sheetId,
    range: `${SESSION_STATE_TAB}!A2:C`,
  });
  const rows = response.data.values || [];
  const idx = rows.findIndex((r) => (r[0] || '').trim() === INVALID_BEFORE_KEY);
  const now = new Date().toISOString();
  if (idx >= 0) {
    const row = idx + 2;
    await sheets.spreadsheets.values.update({
      spreadsheetId: conf.sheetId,
      range: `${SESSION_STATE_TAB}!A${row}:C${row}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[INVALID_BEFORE_KEY, iso, now]] },
    });
    return;
  }
  await sheets.spreadsheets.values.append({
    spreadsheetId: conf.sheetId,
    range: `${SESSION_STATE_TAB}!A:C`,
    valueInputOption: 'RAW',
    requestBody: { values: [[INVALID_BEFORE_KEY, iso, now]] },
  });
}
