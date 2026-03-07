import { NextResponse } from 'next/server';
import { canManageUsers, getSessionFromCookie } from '@/lib/admin-auth';
import { getAuditLogs } from '@/lib/admin-audit';
import { getAdminUsers } from '@/lib/admin-users';
import { getAdminInvites } from '@/lib/admin-invites';
import { getRevisions } from '@/lib/admin-revisions';
import { getSheetBlogPosts } from '@/lib/blog-cms';
import { getRecycleBinEntries } from '@/lib/recycle-bin';
import { getGlobalSessionInvalidBefore } from '@/lib/admin-session-state';
import {
  getBoardMembersFromSheet,
  getHomepageAnnouncement,
  getImpactStatsFromSheet,
  getReportsFromSheet,
  getSeoSettingsFromSheet,
  getSiteSettings,
  getTeamMembersFromSheet,
} from '@/lib/site-content';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();

  const [
    blogPosts,
    siteSettings,
    announcement,
    teamMembers,
    boardMembers,
    impactStats,
    reports,
    seoSettings,
    adminUsers,
    auditLogs,
    recycleBin,
    invites,
    revisions,
    globalSessionInvalidBefore,
  ] = await Promise.all([
    getSheetBlogPosts(),
    getSiteSettings(),
    getHomepageAnnouncement(),
    getTeamMembersFromSheet(),
    getBoardMembersFromSheet(),
    getImpactStatsFromSheet(),
    getReportsFromSheet(),
    getSeoSettingsFromSheet(),
    getAdminUsers(),
    getAuditLogs(2000),
    getRecycleBinEntries(2000),
    getAdminInvites(2000),
    getRevisions(2000),
    getGlobalSessionInvalidBefore(),
  ]);

  return NextResponse.json({
    exportedAt: new Date().toISOString(),
    exportedBy: session.email,
    datasets: {
      blogPosts,
      siteSettings,
      announcement,
      teamMembers,
      boardMembers,
      impactStats,
      reports,
      seoSettings,
      adminUsers,
      auditLogs,
      recycleBin,
      invites,
      revisions,
      globalSessionInvalidBefore: globalSessionInvalidBefore
        ? new Date(globalSessionInvalidBefore * 1000).toISOString()
        : '',
    },
  });
}
