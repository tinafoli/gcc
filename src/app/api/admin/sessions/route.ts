import { NextRequest, NextResponse } from 'next/server';
import { canManageUsers, getSessionFromCookie } from '@/lib/admin-auth';
import { appendAuditLog, getAuditLogs } from '@/lib/admin-audit';
import { getGlobalSessionInvalidBefore, setGlobalSessionInvalidBefore } from '@/lib/admin-session-state';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();
  const [logs, invalidBefore] = await Promise.all([
    getAuditLogs(1000),
    getGlobalSessionInvalidBefore(),
  ]);
  const authLogs = logs
    .filter((l) => l.targetType === 'auth_session' || l.targetType === 'auth_security')
    .slice(0, 200);
  return NextResponse.json({
    current: session,
    globalInvalidBefore: invalidBefore ? new Date(invalidBefore * 1000).toISOString() : '',
    authLogs,
  });
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();
  const body = await request.json().catch(() => ({}));
  const action = String(body.action || '').trim();
  if (action !== 'revoke_all') {
    return NextResponse.json({ error: 'Unsupported action.' }, { status: 400 });
  }
  const now = new Date().toISOString();
  await setGlobalSessionInvalidBefore(now);
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'revoke',
    targetType: 'auth_session',
    targetId: 'all',
    details: 'Revoked all active admin sessions.',
  });
  return NextResponse.json({ message: 'All sessions revoked. Users must log in again.' });
}
