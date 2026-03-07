import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, authenticateAdmin, signSessionToken } from '@/lib/admin-auth';
import { appendAuditLog } from '@/lib/admin-audit';

type AttemptState = { count: number; resetAt: number; lockUntil?: number };
const attempts = new Map<string, AttemptState>();
const LIMIT_WINDOW_MS = 15 * 60 * 1000;
const LIMIT_MAX = 8;
const LOCKOUT_MS = 30 * 60 * 1000;

function getIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

function isLimited(key: string): boolean {
  const now = Date.now();
  const cur = attempts.get(key);
  if (cur?.lockUntil && cur.lockUntil > now) return true;
  if (!cur || cur.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + LIMIT_WINDOW_MS });
    return false;
  }
  cur.count += 1;
  if (cur.count > LIMIT_MAX) {
    cur.lockUntil = now + LOCKOUT_MS;
  }
  attempts.set(key, cur);
  return cur.count > LIMIT_MAX || Boolean(cur.lockUntil && cur.lockUntil > now);
}

function clearAttempt(key: string) {
  attempts.delete(key);
}

export async function POST(request: NextRequest) {
  try {
    const ip = getIp(request);
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }
    const attemptKey = `${ip}:${email}`;
    if (isLimited(attemptKey) || isLimited(ip)) {
      return NextResponse.json({ error: 'Too many login attempts. Try again later.' }, { status: 429 });
    }

    const sessionUser = await authenticateAdmin(email, password);
    if (!sessionUser) {
      await appendAuditLog({
        actorEmail: email || 'unknown',
        actorRole: 'unknown',
        action: 'login_failed',
        targetType: 'auth_security',
        targetId: ip,
        details: 'Invalid admin credentials submitted.',
      });
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const token = signSessionToken({
      id: sessionUser.id,
      email: sessionUser.email,
      role: sessionUser.role,
    });
    clearAttempt(attemptKey);
    clearAttempt(ip);
    await appendAuditLog({
      actorEmail: sessionUser.email,
      actorRole: sessionUser.role,
      action: 'login',
      targetType: 'auth_session',
      targetId: sessionUser.id,
      details: `Admin login from IP ${ip}`,
    });
    const response = NextResponse.json({
      user: {
        id: sessionUser.id,
        email: sessionUser.email,
        role: sessionUser.role,
      },
    });
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 12,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Login failed due to server configuration.' },
      { status: 500 },
    );
  }
}
