import { NextRequest, NextResponse } from 'next/server';
import { canManageUsers, getSessionFromCookie } from '@/lib/admin-auth';
import { appendAuditLog } from '@/lib/admin-audit';
import { getAdminUserById, updateAdminUser, type AdminUser } from '@/lib/admin-users';
import { getRevisionById, getRevisions } from '@/lib/admin-revisions';
import { getSheetBlogPostById, updateSheetBlogPost, type ManagedBlogPost } from '@/lib/blog-cms';
import {
  getBoardMemberById,
  getHomepageAnnouncement,
  getImpactStatById,
  getReportById,
  getSeoSettingsByPage,
  getSiteSettings,
  getTeamMemberById,
  type ImpactStat,
  type ManagedReport,
  type SeoSettings,
  updateSiteSettings,
  upsertBoardMember,
  upsertImpactStat,
  upsertHomepageAnnouncement,
  upsertReport,
  upsertSeoSettings,
  upsertTeamMember,
  type HomepageAnnouncement,
  type Member,
  type SiteSettings,
} from '@/lib/site-content';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function GET(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageUsers(session.role)) return forbidden();
  const { searchParams } = new URL(request.url);
  const pageRaw = Number(searchParams.get('page') || '1');
  const pageSizeRaw = Number(searchParams.get('pageSize') || searchParams.get('limit') || '20');
  const q = String(searchParams.get('q') || '').trim().toLowerCase();
  const entityType = String(searchParams.get('entityType') || 'all').trim().toLowerCase();

  const pageSize = Number.isFinite(pageSizeRaw) ? Math.min(Math.max(pageSizeRaw, 1), 200) : 20;
  const page = Number.isFinite(pageRaw) ? Math.max(1, pageRaw) : 1;

  const all = await getRevisions(5000);
  const filtered = all.filter((rev) => {
    const typeMatch = entityType === 'all' || rev.entityType.toLowerCase() === entityType;
    const queryMatch =
      !q ||
      rev.entityType.toLowerCase().includes(q) ||
      rev.entityId.toLowerCase().includes(q) ||
      rev.actorEmail.toLowerCase().includes(q) ||
      rev.action.toLowerCase().includes(q);
    return typeMatch && queryMatch;
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const revisions = filtered.slice(start, start + pageSize);
  return NextResponse.json({
    revisions,
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
  if (!id) return NextResponse.json({ error: 'Revision id is required.' }, { status: 400 });
  const revision = await getRevisionById(id);
  if (!revision) return NextResponse.json({ error: 'Revision not found.' }, { status: 404 });

  try {
    if (revision.entityType === 'blog_post') {
      const snapshot = JSON.parse(revision.snapshot) as ManagedBlogPost;
      const existing = await getSheetBlogPostById(snapshot.id);
      if (!existing) return NextResponse.json({ error: 'Target post no longer exists.' }, { status: 404 });
      await updateSheetBlogPost(snapshot);
    } else if (revision.entityType === 'team_member') {
      const snapshot = JSON.parse(revision.snapshot) as Member;
      const existing = await getTeamMemberById(snapshot.id);
      if (!existing) return NextResponse.json({ error: 'Target team member no longer exists.' }, { status: 404 });
      await upsertTeamMember(snapshot);
    } else if (revision.entityType === 'board_member') {
      const snapshot = JSON.parse(revision.snapshot) as Member;
      const existing = await getBoardMemberById(snapshot.id);
      if (!existing) return NextResponse.json({ error: 'Target board member no longer exists.' }, { status: 404 });
      await upsertBoardMember(snapshot);
    } else if (revision.entityType === 'site_settings') {
      const snapshot = JSON.parse(revision.snapshot) as SiteSettings;
      const existing = await getSiteSettings();
      if (!existing) return NextResponse.json({ error: 'Site settings unavailable.' }, { status: 404 });
      await updateSiteSettings(snapshot);
    } else if (revision.entityType === 'homepage_announcement') {
      const snapshot = JSON.parse(revision.snapshot) as HomepageAnnouncement;
      const existing = await getHomepageAnnouncement();
      if (!existing) return NextResponse.json({ error: 'Announcement unavailable.' }, { status: 404 });
      await upsertHomepageAnnouncement(snapshot);
    } else if (revision.entityType === 'impact_stat') {
      const snapshot = JSON.parse(revision.snapshot) as ImpactStat;
      const existing = await getImpactStatById(snapshot.id);
      if (!existing) return NextResponse.json({ error: 'Target impact stat no longer exists.' }, { status: 404 });
      await upsertImpactStat(snapshot);
    } else if (revision.entityType === 'report') {
      const snapshot = JSON.parse(revision.snapshot) as ManagedReport;
      const existing = await getReportById(snapshot.id);
      if (!existing) return NextResponse.json({ error: 'Target report no longer exists.' }, { status: 404 });
      await upsertReport(snapshot);
    } else if (revision.entityType === 'seo_settings') {
      const snapshot = JSON.parse(revision.snapshot) as SeoSettings;
      const existing = await getSeoSettingsByPage(snapshot.pageKey as 'home' | 'donate' | 'reports');
      if (!existing) return NextResponse.json({ error: 'SEO settings unavailable.' }, { status: 404 });
      await upsertSeoSettings(snapshot);
    } else if (revision.entityType === 'admin_user') {
      const snapshot = JSON.parse(revision.snapshot) as AdminUser;
      const existing = await getAdminUserById(snapshot.id);
      if (!existing) return NextResponse.json({ error: 'Target admin user no longer exists.' }, { status: 404 });
      await updateAdminUser(snapshot);
    } else {
      return NextResponse.json({ error: 'Unsupported entity type for restore.' }, { status: 400 });
    }

    await appendAuditLog({
      actorEmail: session.email,
      actorRole: session.role,
      action: 'restore',
      targetType: revision.entityType,
      targetId: revision.entityId,
      details: `Restored from revision ${revision.id}.`,
    });
    return NextResponse.json({ message: 'Revision restored.' });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to restore revision.' }, { status: 500 });
  }
}
