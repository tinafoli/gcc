import { google } from 'googleapis';

const AUDIT_TAB = 'AuditLog';
const AUDIT_HEADERS = [
  'id',
  'timestamp',
  'actorEmail',
  'actorRole',
  'action',
  'targetType',
  'targetId',
  'details',
];

export type AuditEntry = {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
};

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

async function ensureAuditHeaderRow(sheets: ReturnType<typeof google.sheets>, sheetId: string) {
  let response;
  try {
    response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${AUDIT_TAB}!A1:H1`,
    });
  } catch {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: AUDIT_TAB } } }] },
    });
    response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${AUDIT_TAB}!A1:H1`,
    });
  }

  if (!response.data.values || response.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${AUDIT_TAB}!A1:H1`,
      valueInputOption: 'RAW',
      requestBody: { values: [AUDIT_HEADERS] },
    });
  }
}

export async function appendAuditLog(entry: Omit<AuditEntry, 'id' | 'timestamp'>): Promise<void> {
  const conf = buildAuth();
  if (!conf) return;
  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureAuditHeaderRow(sheets, conf.sheetId);
    await sheets.spreadsheets.values.append({
      spreadsheetId: conf.sheetId,
      range: `${AUDIT_TAB}!A:H`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
          new Date().toISOString(),
          entry.actorEmail,
          entry.actorRole,
          entry.action,
          entry.targetType,
          entry.targetId,
          entry.details,
        ]],
      },
    });
  } catch {
    // Do not break user actions if audit logging fails.
  }
}

export async function getAuditLogs(limit = 200): Promise<AuditEntry[]> {
  const conf = buildAuth();
  if (!conf) return [];

  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureAuditHeaderRow(sheets, conf.sheetId);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: conf.sheetId,
      range: `${AUDIT_TAB}!A2:H`,
    });
    const rows = response.data.values || [];
    const parsed = rows
      .filter((r) => (r[0] || '').trim())
      .map((r) => ({
        id: r[0] || '',
        timestamp: r[1] || '',
        actorEmail: r[2] || '',
        actorRole: r[3] || '',
        action: r[4] || '',
        targetType: r[5] || '',
        targetId: r[6] || '',
        details: r[7] || '',
      }));
    parsed.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    return parsed.slice(0, Math.max(1, limit));
  } catch {
    return [];
  }
}
