import { NextRequest, NextResponse } from 'next/server';
import {
  canManageUsers,
  getSessionFromCookie,
  hashPassword,
} from '@/lib/admin-auth';
import {
  appendAdminUser,
  deleteAdminUserById,
  getAdminUserById,
  getAdminUsers,
  updateAdminUser,
  type AdminRole,
} from '@/lib/admin-users';
import { appendAuditLog } from '@/lib/admin-audit';
import { appendRecycleBinEntry } from '@/lib/recycle-bin';
import { appendRevision } from '@/lib/admin-revisions';
import { isStrongPassword, isValidEmail } from '@/lib/admin-validation';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

function normalizeRole(value: string): AdminRole {
  const v = value.toLowerCase().trim();
  if (v === 'super_admin' || v === 'editor' || v === 'viewer') return v;
  return 'viewer';
}

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();
  const users = await getAdminUsers();
  const safe = users.map(({ passwordHash, twoFactorSecret, ...rest }) => rest);
  return NextResponse.json({ users: safe });
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();

  const body = await request.json().catch(() => ({}));
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');
  const role = normalizeRole(String(body.role || 'viewer'));
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }
  if (!isStrongPassword(password)) {
    return NextResponse.json({
      error: 'Password must be at least 12 chars with upper, lower, number, and symbol.',
    }, { status: 400 });
  }

  const users = await getAdminUsers();
  if (users.some((u) => u.email === email)) {
    return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
  }

  const now = new Date().toISOString();
  await appendAdminUser({
    id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    email,
    passwordHash: hashPassword(password),
    role,
    status: 'active',
    createdAt: now,
    updatedAt: now,
    lastLoginAt: '',
  });
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'create',
    targetType: 'admin_user',
    targetId: email,
    details: `Created admin user with role ${role}.`,
  });

  return NextResponse.json({ message: 'User created.' }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();

  const body = await request.json().catch(() => ({}));
  const id = String(body.id || '').trim();
  if (!id) {
    return NextResponse.json({ error: 'User id is required.' }, { status: 400 });
  }

  const users = await getAdminUsers();
  const existing = users.find((u) => u.id === id);
  if (!existing) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  }

  const role = body.role ? normalizeRole(String(body.role)) : existing.role;
  const status = body.status === 'disabled' ? 'disabled' : 'active';
  const email = body.email ? String(body.email).trim().toLowerCase() : existing.email;
  const password = String(body.password || '');
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }
  if (password && !isStrongPassword(password)) {
    return NextResponse.json({
      error: 'New password must be at least 12 chars with upper, lower, number, and symbol.',
    }, { status: 400 });
  }
  const passwordHash = password ? hashPassword(password) : existing.passwordHash;

  await appendRevision({
    actorEmail: session.email,
    actorRole: session.role,
    entityType: 'admin_user',
    entityId: existing.id,
    action: 'before_update',
    snapshot: JSON.stringify(existing),
  });
  await updateAdminUser({
    ...existing,
    email,
    role,
    status,
    passwordHash,
    updatedAt: new Date().toISOString(),
  });
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'update',
    targetType: 'admin_user',
    targetId: existing.email,
    details: `Updated user. role=${role}, status=${status}${password ? ', password_reset=true' : ''}`,
  });

  return NextResponse.json({ message: 'User updated.' });
}

export async function DELETE(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();

  const { searchParams } = new URL(request.url);
  const id = String(searchParams.get('id') || '').trim();
  if (!id) {
    return NextResponse.json({ error: 'User id is required.' }, { status: 400 });
  }

  if (id === session.id) {
    return NextResponse.json({ error: 'You cannot delete your own account.' }, { status: 400 });
  }

  const existing = await getAdminUserById(id);
  if (!existing) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  }
  await appendRecycleBinEntry({
    entityType: 'admin_user',
    entityId: id,
    deletedBy: session.email,
    payload: JSON.stringify(existing),
  });
  await deleteAdminUserById(id);
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'delete',
    targetType: 'admin_user',
    targetId: id,
    details: 'Deleted admin user.',
  });
  return NextResponse.json({ message: 'User deleted.' });
}
