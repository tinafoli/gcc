import { NextRequest, NextResponse } from 'next/server';
import { canManageUsers, getSessionFromCookie } from '@/lib/admin-auth';
import { createAdminInvite, getAdminInvites, updateAdminInvite } from '@/lib/admin-invites';
import { appendAuditLog } from '@/lib/admin-audit';
import { isValidEmail } from '@/lib/admin-validation';

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

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();
  const invites = await getAdminInvites(500);
  return NextResponse.json({ invites });
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || '').trim().toLowerCase();
  const roleRaw = String(body.role || 'viewer').trim();
  const expiresDaysRaw = Number(body.expiresDays || 7);
  const role = roleRaw === 'super_admin' || roleRaw === 'editor' || roleRaw === 'viewer' ? roleRaw : 'viewer';
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }
  const expiresDays = Number.isFinite(expiresDaysRaw) ? Math.min(Math.max(expiresDaysRaw, 1), 30) : 7;
  const { invite, token } = await createAdminInvite(email, role, session.email, expiresDays);
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'create',
    targetType: 'admin_invite',
    targetId: invite.id,
    details: `Created invite for ${email} as ${role}, expires in ${expiresDays} day(s).`,
  });
  return NextResponse.json({
    message: 'Invite created.',
    invite,
    inviteLink: `${normalizeAdminPortalPath(process.env.ADMIN_PORTAL_PATH || '/secure-admin-gcc')}/invite?token=${encodeURIComponent(token)}`,
    token,
  }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();
  const { searchParams } = new URL(request.url);
  const id = String(searchParams.get('id') || '').trim();
  if (!id) return NextResponse.json({ error: 'Invite id is required.' }, { status: 400 });
  const invites = await getAdminInvites(2000);
  const invite = invites.find((i) => i.id === id);
  if (!invite) return NextResponse.json({ error: 'Invite not found.' }, { status: 404 });
  await updateAdminInvite({ ...invite, status: 'revoked' });
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'update',
    targetType: 'admin_invite',
    targetId: id,
    details: 'Revoked admin invite.',
  });
  return NextResponse.json({ message: 'Invite revoked.' });
}
