import { google } from 'googleapis';

const RECYCLE_BIN_TAB = 'RecycleBin';
const RECYCLE_BIN_HEADERS = [
  'id',
  'entityType',
  'entityId',
  'deletedBy',
  'deletedAt',
  'payload',
];

export type RecycleBinEntry = {
  id: string;
  entityType: 'blog_post' | 'team_member' | 'board_member' | 'admin_user';
  entityId: string;
  deletedBy: string;
  deletedAt: string;
  payload: string;
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

async function ensureRecycleBinTab(sheets: ReturnType<typeof google.sheets>, sheetId: string) {
  let response;
  try {
    response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${RECYCLE_BIN_TAB}!A1:F1`,
    });
  } catch {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: RECYCLE_BIN_TAB } } }] },
    });
    response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${RECYCLE_BIN_TAB}!A1:F1`,
    });
  }

  if (!response.data.values || response.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${RECYCLE_BIN_TAB}!A1:F1`,
      valueInputOption: 'RAW',
      requestBody: { values: [RECYCLE_BIN_HEADERS] },
    });
  }
}

export async function appendRecycleBinEntry(entry: Omit<RecycleBinEntry, 'id' | 'deletedAt'>): Promise<void> {
  const conf = buildAuth();
  if (!conf) return;
  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureRecycleBinTab(sheets, conf.sheetId);
    await sheets.spreadsheets.values.append({
      spreadsheetId: conf.sheetId,
      range: `${RECYCLE_BIN_TAB}!A:F`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
          entry.entityType,
          entry.entityId,
          entry.deletedBy,
          new Date().toISOString(),
          entry.payload,
        ]],
      },
    });
  } catch {
    // Do not block primary action.
  }
}

export async function getRecycleBinEntries(limit = 300): Promise<RecycleBinEntry[]> {
  const conf = buildAuth();
  if (!conf) return [];
  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureRecycleBinTab(sheets, conf.sheetId);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: conf.sheetId,
      range: `${RECYCLE_BIN_TAB}!A2:F`,
    });
    const rows = response.data.values || [];
    const items = rows
      .filter((r) => (r[0] || '').trim())
      .map((r) => ({
        id: r[0] || '',
        entityType: (r[1] || 'blog_post') as RecycleBinEntry['entityType'],
        entityId: r[2] || '',
        deletedBy: r[3] || '',
        deletedAt: r[4] || '',
        payload: r[5] || '',
      }));
    items.sort((a, b) => b.deletedAt.localeCompare(a.deletedAt));
    return items.slice(0, Math.max(1, limit));
  } catch {
    return [];
  }
}

export async function getRecycleBinEntryById(id: string): Promise<RecycleBinEntry | null> {
  const entries = await getRecycleBinEntries(2000);
  return entries.find((e) => e.id === id) || null;
}

export async function deleteRecycleBinEntryById(id: string): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureRecycleBinTab(sheets, conf.sheetId);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: conf.sheetId,
    range: `${RECYCLE_BIN_TAB}!A2:A`,
  });
  const rows = response.data.values || [];
  const idx = rows.findIndex((r) => r[0] === id);
  if (idx < 0) throw new Error('Recycle bin entry not found.');

  const rowZeroBased = idx + 1;
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: conf.sheetId,
    fields: 'sheets(properties(sheetId,title))',
  });
  const tab = (meta.data.sheets || []).find((s) => s.properties?.title === RECYCLE_BIN_TAB);
  if (!tab?.properties?.sheetId && tab?.properties?.sheetId !== 0) {
    throw new Error('RecycleBin tab not found.');
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: conf.sheetId,
    requestBody: {
      requests: [{
        deleteDimension: {
          range: {
            sheetId: tab.properties.sheetId,
            dimension: 'ROWS',
            startIndex: rowZeroBased,
            endIndex: rowZeroBased + 1,
          },
        },
      }],
    },
  });
}
