import { createHash, timingSafeEqual } from 'crypto';
import { google } from 'googleapis';
import type { AdminRole } from '@/lib/admin-users';

const INVITES_TAB = 'AdminInvites';
const INVITE_HEADERS = [
  'id',
  'email',
  'role',
  'tokenHash',
  'status',
  'expiresAt',
  'createdAt',
  'createdBy',
  'usedAt',
];

export type AdminInvite = {
  id: string;
  email: string;
  role: AdminRole;
  tokenHash: string;
  status: 'pending' | 'used' | 'expired' | 'revoked';
  expiresAt: string;
  createdAt: string;
  createdBy: string;
  usedAt?: string;
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

function normalizeRole(value: string): AdminRole {
  const v = value.trim().toLowerCase();
  if (v === 'super_admin' || v === 'editor' || v === 'viewer') return v;
  return 'viewer';
}

function hashInviteToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

async function ensureInviteHeaderRow(sheets: ReturnType<typeof google.sheets>, sheetId: string) {
  let response;
  try {
    response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${INVITES_TAB}!A1:I1`,
    });
  } catch {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: INVITES_TAB } } }] },
    });
    response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${INVITES_TAB}!A1:I1`,
    });
  }
  if (!response.data.values || response.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${INVITES_TAB}!A1:I1`,
      valueInputOption: 'RAW',
      requestBody: { values: [INVITE_HEADERS] },
    });
  }
}

export async function getAdminInvites(limit = 200): Promise<AdminInvite[]> {
  const conf = buildAuth();
  if (!conf) return [];
  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureInviteHeaderRow(sheets, conf.sheetId);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: conf.sheetId,
      range: `${INVITES_TAB}!A2:I`,
    });
    const rows = response.data.values || [];
    const invites = rows
      .filter((r) => (r[0] || '').trim())
      .map((r) => ({
        id: r[0] || '',
        email: (r[1] || '').trim().toLowerCase(),
        role: normalizeRole(r[2] || 'viewer'),
        tokenHash: r[3] || '',
        status: (r[4] || 'pending') as AdminInvite['status'],
        expiresAt: r[5] || '',
        createdAt: r[6] || '',
        createdBy: r[7] || '',
        usedAt: r[8] || '',
      }));
    invites.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return invites.slice(0, Math.max(1, limit));
  } catch {
    return [];
  }
}

export async function appendAdminInvite(invite: AdminInvite): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureInviteHeaderRow(sheets, conf.sheetId);
  await sheets.spreadsheets.values.append({
    spreadsheetId: conf.sheetId,
    range: `${INVITES_TAB}!A:I`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        invite.id,
        invite.email,
        invite.role,
        invite.tokenHash,
        invite.status,
        invite.expiresAt,
        invite.createdAt,
        invite.createdBy,
        invite.usedAt || '',
      ]],
    },
  });
}

export async function updateAdminInvite(invite: AdminInvite): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');
  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureInviteHeaderRow(sheets, conf.sheetId);
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: conf.sheetId,
    range: `${INVITES_TAB}!A2:I`,
  });
  const rows = response.data.values || [];
  const idx = rows.findIndex((r) => r[0] === invite.id);
  if (idx < 0) throw new Error('Invite not found.');
  const rowNumber = idx + 2;
  await sheets.spreadsheets.values.update({
    spreadsheetId: conf.sheetId,
    range: `${INVITES_TAB}!A${rowNumber}:I${rowNumber}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        invite.id,
        invite.email,
        invite.role,
        invite.tokenHash,
        invite.status,
        invite.expiresAt,
        invite.createdAt,
        invite.createdBy,
        invite.usedAt || '',
      ]],
    },
  });
}

export async function createAdminInvite(
  email: string,
  role: AdminRole,
  createdBy: string,
  expiresDays: number,
): Promise<{ invite: AdminInvite; token: string }> {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + Math.max(1, expiresDays) * 24 * 60 * 60 * 1000);
  const token = `${Date.now().toString(36)}.${Math.random().toString(36).slice(2)}.${Math.random().toString(36).slice(2)}`;
  const invite: AdminInvite = {
    id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    email: email.toLowerCase().trim(),
    role,
    tokenHash: hashInviteToken(token),
    status: 'pending',
    expiresAt: expiresAt.toISOString(),
    createdAt: now.toISOString(),
    createdBy,
    usedAt: '',
  };
  await appendAdminInvite(invite);
  return { invite, token };
}

export async function findInviteByToken(token: string): Promise<AdminInvite | null> {
  const invites = await getAdminInvites(2000);
  const hash = hashInviteToken(token);
  for (const invite of invites) {
    if (!invite.tokenHash) continue;
    const a = Buffer.from(invite.tokenHash);
    const b = Buffer.from(hash);
    if (a.length === b.length && timingSafeEqual(a, b)) {
      return invite;
    }
  }
  return null;
}
