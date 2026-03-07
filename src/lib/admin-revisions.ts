import { google } from 'googleapis';

const TAB = 'AdminRevisions';
const HEADERS = ['id', 'timestamp', 'actorEmail', 'actorRole', 'entityType', 'entityId', 'action', 'snapshot'];

export type RevisionEntry = {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: string;
  entityType: string;
  entityId: string;
  action: string;
  snapshot: string;
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

async function ensureTab(sheets: ReturnType<typeof google.sheets>, sheetId: string) {
  let response;
  try {
    response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${TAB}!A1:H1`,
    });
  } catch {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: TAB } } }] },
    });
    response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${TAB}!A1:H1`,
    });
  }
  if (!response.data.values || response.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${TAB}!A1:H1`,
      valueInputOption: 'RAW',
      requestBody: { values: [HEADERS] },
    });
  }
}

export async function appendRevision(input: Omit<RevisionEntry, 'id' | 'timestamp'>): Promise<void> {
  const conf = buildAuth();
  if (!conf) return;
  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureTab(sheets, conf.sheetId);
    await sheets.spreadsheets.values.append({
      spreadsheetId: conf.sheetId,
      range: `${TAB}!A:H`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
          new Date().toISOString(),
          input.actorEmail,
          input.actorRole,
          input.entityType,
          input.entityId,
          input.action,
          input.snapshot,
        ]],
      },
    });
  } catch {
    // Non-blocking.
  }
}

export async function getRevisions(limit = 300): Promise<RevisionEntry[]> {
  const conf = buildAuth();
  if (!conf) return [];
  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureTab(sheets, conf.sheetId);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: conf.sheetId,
      range: `${TAB}!A2:H`,
    });
    const rows = response.data.values || [];
    const items = rows
      .filter((r) => (r[0] || '').trim())
      .map((r) => ({
        id: r[0] || '',
        timestamp: r[1] || '',
        actorEmail: r[2] || '',
        actorRole: r[3] || '',
        entityType: r[4] || '',
        entityId: r[5] || '',
        action: r[6] || '',
        snapshot: r[7] || '',
      }));
    items.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    return items.slice(0, Math.max(1, limit));
  } catch {
    return [];
  }
}

export async function getRevisionById(id: string): Promise<RevisionEntry | null> {
  const rows = await getRevisions(5000);
  return rows.find((r) => r.id === id) || null;
}
