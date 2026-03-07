import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, getSessionFromCookie } from '@/lib/admin-auth';
import { appendAuditLog } from '@/lib/admin-audit';

export async function POST() {
  const session = await getSessionFromCookie();
  if (session) {
    await appendAuditLog({
      actorEmail: session.email,
      actorRole: session.role,
      action: 'logout',
      targetType: 'auth_session',
      targetId: session.id,
      details: 'Admin logout.',
    });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}
