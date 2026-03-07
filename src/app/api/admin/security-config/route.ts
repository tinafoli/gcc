import { NextRequest, NextResponse } from 'next/server';
import { canManageUsers, getSessionFromCookie } from '@/lib/admin-auth';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

function normalizeAdminPortalPath(input: string): string {
  let value = input.trim();
  if (!value) value = '/secure-admin-gcc';
  if (!value.startsWith('/')) value = `/${value}`;
  if (value.length > 1 && value.endsWith('/')) value = value.slice(0, -1);
  const lowered = value.toLowerCase();
  if (lowered === '/admin' || lowered === '/blog-admin' || lowered.startsWith('/api/')) {
    return '/secure-admin-gcc';
  }
  return lowered;
}

function getRequestIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') || '';
}

export async function GET(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();

  const portalPath = normalizeAdminPortalPath(process.env.ADMIN_PORTAL_PATH || '/secure-admin-gcc');
  const rawAllowlist = process.env.ADMIN_ALLOWED_IPS || '';
  const allowlist = rawAllowlist
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
  const allowlistEnabled = allowlist.length > 0;
  const currentIp = getRequestIp(request);
  const currentIpAllowed = !allowlistEnabled || (currentIp ? allowlist.includes(currentIp) : false);

  return NextResponse.json({
    portalPath,
    allowlistEnabled,
    allowlistCount: allowlist.length,
    currentIp: currentIp || 'unknown',
    currentIpAllowed,
  });
}
