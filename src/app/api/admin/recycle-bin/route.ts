import { NextRequest, NextResponse } from 'next/server';
import { canManageUsers, getSessionFromCookie } from '@/lib/admin-auth';
import { appendAuditLog } from '@/lib/admin-audit';
import {
  appendAdminUser,
  getAdminUserById,
  type AdminUser,
} from '@/lib/admin-users';
import {
  appendSheetBlogPost,
  getSheetBlogPostById,
  type ManagedBlogPost,
} from '@/lib/blog-cms';
import {
  getBoardMemberById,
  getTeamMemberById,
  upsertBoardMember,
  upsertTeamMember,
  type Member,
} from '@/lib/site-content';
import {
  deleteRecycleBinEntryById,
  getRecycleBinEntries,
  getRecycleBinEntryById,
} from '@/lib/recycle-bin';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function GET(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();
  const { searchParams } = new URL(request.url);
  const pageRaw = Number(searchParams.get('page') || '1');
  const pageSizeRaw = Number(searchParams.get('pageSize') || searchParams.get('limit') || '20');
  const query = String(searchParams.get('q') || '').trim().toLowerCase();
  const entityType = String(searchParams.get('type') || 'all').trim();
  const from = String(searchParams.get('from') || '').trim();
  const to = String(searchParams.get('to') || '').trim();

  const pageSize = Number.isFinite(pageSizeRaw) ? Math.min(Math.max(pageSizeRaw, 1), 200) : 20;
  const page = Number.isFinite(pageRaw) ? Math.max(1, pageRaw) : 1;

  const fromTs = from ? Date.parse(from) : Number.NEGATIVE_INFINITY;
  const toTs = to ? Date.parse(`${to}T23:59:59.999Z`) : Number.POSITIVE_INFINITY;

  const entries = await getRecycleBinEntries(5000);
  const filtered = entries.filter((entry) => {
    const typeMatch = entityType === 'all' || entry.entityType === entityType;
    const queryMatch = !query ||
      entry.entityType.toLowerCase().includes(query) ||
      entry.entityId.toLowerCase().includes(query) ||
      entry.deletedBy.toLowerCase().includes(query);
    const t = Date.parse(entry.deletedAt || '');
    const dateMatch = Number.isNaN(t) ? true : t >= fromTs && t <= toTs;
    return typeMatch && queryMatch && dateMatch;
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageEntries = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    entries: pageEntries,
    total,
    totalPages,
    page: safePage,
    pageSize,
  });
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();
  const body = await request.json().catch(() => ({}));
  const id = String(body.id || '').trim();
  if (!id) return NextResponse.json({ error: 'Recycle bin id is required.' }, { status: 400 });

  const entry = await getRecycleBinEntryById(id);
  if (!entry) return NextResponse.json({ error: 'Entry not found.' }, { status: 404 });

  try {
    if (entry.entityType === 'blog_post') {
      const payload = JSON.parse(entry.payload) as ManagedBlogPost;
      const exists = await getSheetBlogPostById(payload.id);
      if (exists) return NextResponse.json({ error: 'Blog post id already exists.' }, { status: 409 });
      await appendSheetBlogPost(payload);
    } else if (entry.entityType === 'team_member') {
      const payload = JSON.parse(entry.payload) as Member;
      const exists = await getTeamMemberById(payload.id);
      if (exists) return NextResponse.json({ error: 'Team member id already exists.' }, { status: 409 });
      await upsertTeamMember(payload);
    } else if (entry.entityType === 'board_member') {
      const payload = JSON.parse(entry.payload) as Member;
      const exists = await getBoardMemberById(payload.id);
      if (exists) return NextResponse.json({ error: 'Board member id already exists.' }, { status: 409 });
      await upsertBoardMember(payload);
    } else if (entry.entityType === 'admin_user') {
      const payload = JSON.parse(entry.payload) as AdminUser;
      const exists = await getAdminUserById(payload.id);
      if (exists) return NextResponse.json({ error: 'Admin user id already exists.' }, { status: 409 });
      await appendAdminUser(payload);
    } else {
      return NextResponse.json({ error: 'Unsupported recycle bin type.' }, { status: 400 });
    }

    await deleteRecycleBinEntryById(entry.id);
    await appendAuditLog({
      actorEmail: session.email,
      actorRole: session.role,
      action: 'restore',
      targetType: entry.entityType,
      targetId: entry.entityId,
      details: 'Restored item from recycle bin.',
    });
    return NextResponse.json({ message: 'Item restored.' });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Restore failed.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();
  const { searchParams } = new URL(request.url);
  const id = String(searchParams.get('id') || '').trim();
  if (!id) return NextResponse.json({ error: 'Recycle bin id is required.' }, { status: 400 });

  const entry = await getRecycleBinEntryById(id);
  await deleteRecycleBinEntryById(id);
  if (entry) {
    await appendAuditLog({
      actorEmail: session.email,
      actorRole: session.role,
      action: 'purge',
      targetType: entry.entityType,
      targetId: entry.entityId,
      details: 'Permanently removed item from recycle bin.',
    });
  }
  return NextResponse.json({ message: 'Recycle bin item permanently removed.' });
}
