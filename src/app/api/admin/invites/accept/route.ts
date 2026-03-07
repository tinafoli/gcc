import { NextRequest, NextResponse } from 'next/server';
import { appendAuditLog } from '@/lib/admin-audit';
import { findInviteByToken, updateAdminInvite } from '@/lib/admin-invites';
import { appendAdminUser, getAdminUserByEmail } from '@/lib/admin-users';
import { hashPassword } from '@/lib/admin-auth';
import { isStrongPassword } from '@/lib/admin-validation';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const token = String(body.token || '').trim();
  const password = String(body.password || '');
  if (!token || !password) {
    return NextResponse.json({ error: 'Token and password are required.' }, { status: 400 });
  }
  if (!isStrongPassword(password)) {
    return NextResponse.json({
      error: 'Password must be at least 12 chars with upper, lower, number, and symbol.',
    }, { status: 400 });
  }

  const invite = await findInviteByToken(token);
  if (!invite) return NextResponse.json({ error: 'Invite is invalid.' }, { status: 404 });
  if (invite.status !== 'pending') {
    return NextResponse.json({ error: `Invite is ${invite.status}.` }, { status: 400 });
  }
  const expiresAt = Date.parse(invite.expiresAt || '');
  if (!Number.isNaN(expiresAt) && expiresAt < Date.now()) {
    await updateAdminInvite({ ...invite, status: 'expired' });
    return NextResponse.json({ error: 'Invite has expired.' }, { status: 400 });
  }

  const existing = await getAdminUserByEmail(invite.email);
  if (existing) {
    return NextResponse.json({ error: 'An admin user with this email already exists.' }, { status: 409 });
  }

  const now = new Date().toISOString();
  await appendAdminUser({
    id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    email: invite.email,
    passwordHash: hashPassword(password),
    role: invite.role,
    status: 'active',
    createdAt: now,
    updatedAt: now,
    lastLoginAt: '',
  });
  await updateAdminInvite({ ...invite, status: 'used', usedAt: now });
  await appendAuditLog({
    actorEmail: invite.email,
    actorRole: invite.role,
    action: 'accept',
    targetType: 'admin_invite',
    targetId: invite.id,
    details: 'Accepted admin invite and created account.',
  });
  return NextResponse.json({ message: 'Invite accepted. You can now log in.' }, { status: 201 });
}
