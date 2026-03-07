import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { type AdminRole, getAdminUserByEmail, updateAdminLastLogin } from '@/lib/admin-users';
import { getGlobalSessionInvalidBefore } from '@/lib/admin-session-state';

export const ADMIN_COOKIE_NAME = 'gcc_admin_session';

export type AdminSessionUser = {
  id: string;
  email: string;
  role: AdminRole;
};

type SessionPayload = AdminSessionUser & {
  exp: number;
  iat: number;
};

function b64url(input: string): string {
  return Buffer.from(input).toString('base64url');
}

function parseB64url(input: string): string {
  return Buffer.from(input, 'base64url').toString();
}

function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || '';
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  if (!stored.startsWith('scrypt:')) return false;
  const parts = stored.split(':');
  if (parts.length !== 3) return false;
  const salt = parts[1];
  const hashHex = parts[2];
  const compareHash = scryptSync(password, salt, 64).toString('hex');
  const a = Buffer.from(hashHex, 'hex');
  const b = Buffer.from(compareHash, 'hex');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function signSessionToken(user: AdminSessionUser): string {
  const secret = getSessionSecret();
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured.');

  const payload: SessionPayload = {
    ...user,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12, // 12h
  };

  const payloadPart = b64url(JSON.stringify(payload));
  const sig = createHmac('sha256', secret).update(payloadPart).digest('base64url');
  return `${payloadPart}.${sig}`;
}

function verifySessionToken(token: string): SessionPayload | null {
  const secret = getSessionSecret();
  if (!secret) return null;
  const [payloadPart, sig] = token.split('.');
  if (!payloadPart || !sig) return null;

  const expectedSig = createHmac('sha256', secret).update(payloadPart).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const parsed = JSON.parse(parseB64url(payloadPart)) as SessionPayload;
    if (!parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) return null;
    if (!parsed.id || !parsed.email || !parsed.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function authenticateAdmin(email: string, password: string): Promise<AdminSessionUser | null> {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await getAdminUserByEmail(normalizedEmail);
  if (user && user.status === 'active' && verifyPassword(password, user.passwordHash)) {
    const now = new Date().toISOString();
    await updateAdminLastLogin(user.id, now);
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  // Bootstrap fallback account from env.
  const bootEmail = (process.env.ADMIN_BOOTSTRAP_EMAIL || '').toLowerCase().trim();
  const bootPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD || '';
  if (normalizedEmail === bootEmail && password === bootPassword && bootEmail && bootPassword) {
    return {
      id: 'bootstrap-admin',
      email: bootEmail,
      role: 'super_admin',
    };
  }

  return null;
}

export async function getSessionFromCookie(): Promise<AdminSessionUser | null> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  const session = verifySessionToken(token);
  if (!session) return null;
  const invalidBefore = await getGlobalSessionInvalidBefore();
  if (invalidBefore && session.iat < invalidBefore) return null;
  return { id: session.id, email: session.email, role: session.role };
}

export function canManageBlog(role: AdminRole): boolean {
  return role === 'super_admin' || role === 'editor';
}

export function canManageContent(role: AdminRole): boolean {
  return role === 'super_admin' || role === 'editor';
}

export function canManageUsers(role: AdminRole): boolean {
  return role === 'super_admin';
}
