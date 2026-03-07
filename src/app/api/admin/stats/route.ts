import { NextResponse } from 'next/server';
import { canManageUsers, getSessionFromCookie } from '@/lib/admin-auth';
import { getAuditLogs } from '@/lib/admin-audit';
import { getAdminUsers } from '@/lib/admin-users';
import { getSheetBlogPosts } from '@/lib/blog-cms';
import { getRecycleBinEntries } from '@/lib/recycle-bin';
import { getBoardMembersFromSheet, getTeamMembersFromSheet } from '@/lib/site-content';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();
  const [blogPosts, team, board, admins, recycle, logs] = await Promise.all([
    getSheetBlogPosts(),
    getTeamMembersFromSheet(),
    getBoardMembersFromSheet(),
    getAdminUsers(),
    getRecycleBinEntries(2000),
    getAuditLogs(2000),
  ]);
  const since = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const failedLogins7d = logs.filter((l) => l.action === 'login_failed' && Date.parse(l.timestamp || '') >= since).length;
  const updates7d = logs.filter((l) => {
    const t = Date.parse(l.timestamp || '');
    return t >= since && (l.action === 'create' || l.action === 'update' || l.action === 'delete' || l.action === 'restore');
  }).length;
  return NextResponse.json({
    cards: {
      posts: blogPosts.length,
      team: team.length,
      board: board.length,
      admins: admins.length,
      recycle: recycle.length,
      failedLogins7d,
      updates7d,
    },
  });
}
