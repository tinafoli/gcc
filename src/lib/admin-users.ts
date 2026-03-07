import { google } from 'googleapis';

const ADMIN_TAB = 'AdminUsers';
const ADMIN_HEADERS = [
  'id',
  'email',
  'passwordHash',
  'role',
  'status',
  'createdAt',
  'updatedAt',
  'lastLoginAt',
  'twoFactorEnabled',
  'twoFactorSecret',
];

export type AdminRole = 'super_admin' | 'editor' | 'viewer';
export type AdminStatus = 'active' | 'disabled';

export type AdminUser = {
  id: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  status: AdminStatus;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
};

function normalizeRole(value: string): AdminRole {
  const v = value.trim().toLowerCase();
  if (v === 'super_admin' || v === 'editor' || v === 'viewer') return v;
  return 'viewer';
}

function normalizeStatus(value: string): AdminStatus {
  const v = value.trim().toLowerCase();
  if (v === 'disabled') return 'disabled';
  return 'active';
}

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

async function ensureAdminHeaderRow(sheets: ReturnType<typeof google.sheets>, sheetId: string) {
  let response;
  try {
    response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${ADMIN_TAB}!A1:J1`,
    });
  } catch {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: ADMIN_TAB } } }],
      },
    });
    response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${ADMIN_TAB}!A1:J1`,
    });
  }

  if (!response.data.values || response.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${ADMIN_TAB}!A1:J1`,
      valueInputOption: 'RAW',
      requestBody: { values: [ADMIN_HEADERS] },
    });
  }
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  const conf = buildAuth();
  if (!conf) return [];

  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureAdminHeaderRow(sheets, conf.sheetId);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: conf.sheetId,
      range: `${ADMIN_TAB}!A2:J`,
    });
    const rows = response.data.values || [];
    return rows
      .filter((r) => (r[0] || '').trim() && (r[1] || '').trim())
      .map((r) => ({
        id: r[0],
        email: r[1].toLowerCase().trim(),
        passwordHash: r[2] || '',
        role: normalizeRole(r[3] || 'viewer'),
        status: normalizeStatus(r[4] || 'active'),
        createdAt: r[5] || '',
        updatedAt: r[6] || '',
        lastLoginAt: r[7] || '',
        twoFactorEnabled: (r[8] || '').toLowerCase() === 'true',
        twoFactorSecret: r[9] || '',
      }));
  } catch {
    return [];
  }
}

export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  const users = await getAdminUsers();
  return users.find((u) => u.email === email.toLowerCase().trim()) || null;
}

export async function getAdminUserById(id: string): Promise<AdminUser | null> {
  const users = await getAdminUsers();
  return users.find((u) => u.id === id) || null;
}

export async function appendAdminUser(user: AdminUser): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureAdminHeaderRow(sheets, conf.sheetId);

  await sheets.spreadsheets.values.append({
    spreadsheetId: conf.sheetId,
    range: `${ADMIN_TAB}!A:J`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        user.id,
        user.email.toLowerCase().trim(),
        user.passwordHash,
        user.role,
        user.status,
        user.createdAt,
        user.updatedAt,
        user.lastLoginAt || '',
        String(Boolean(user.twoFactorEnabled)),
        user.twoFactorSecret || '',
      ]],
    },
  });
}

export async function updateAdminUser(user: AdminUser): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: conf.sheetId,
    range: `${ADMIN_TAB}!A2:J`,
  });
  const rows = response.data.values || [];
  const idx = rows.findIndex((r) => r[0] === user.id);
  if (idx < 0) throw new Error('Admin user not found.');

  const rowNumber = idx + 2;
  await sheets.spreadsheets.values.update({
    spreadsheetId: conf.sheetId,
    range: `${ADMIN_TAB}!A${rowNumber}:J${rowNumber}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        user.id,
        user.email.toLowerCase().trim(),
        user.passwordHash,
        user.role,
        user.status,
        user.createdAt,
        user.updatedAt,
        user.lastLoginAt || '',
        String(Boolean(user.twoFactorEnabled)),
        user.twoFactorSecret || '',
      ]],
    },
  });
}

export async function updateAdminLastLogin(id: string, isoDate: string): Promise<void> {
  const conf = buildAuth();
  if (!conf) return;
  const users = await getAdminUsers();
  const user = users.find((u) => u.id === id);
  if (!user) return;
  await updateAdminUser({
    ...user,
    lastLoginAt: isoDate,
    updatedAt: isoDate,
  });
}

export async function deleteAdminUserById(id: string): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');

  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: conf.sheetId,
    range: `${ADMIN_TAB}!A2:A`,
  });
  const rows = response.data.values || [];
  const idx = rows.findIndex((r) => r[0] === id);
  if (idx < 0) throw new Error('Admin user not found.');

  const rowZeroBased = idx + 1;
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: conf.sheetId,
    fields: 'sheets(properties(sheetId,title))',
  });
  const tab = (meta.data.sheets || []).find((s) => s.properties?.title === ADMIN_TAB);
  if (!tab?.properties?.sheetId && tab?.properties?.sheetId !== 0) {
    throw new Error('AdminUsers tab not found.');
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: conf.sheetId,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: tab.properties.sheetId,
              dimension: 'ROWS',
              startIndex: rowZeroBased,
              endIndex: rowZeroBased + 1,
            },
          },
        },
      ],
    },
  });
}
