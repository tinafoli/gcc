import { NextRequest, NextResponse } from 'next/server';
import { canManageContent, getSessionFromCookie } from '@/lib/admin-auth';
import { appendAuditLog } from '@/lib/admin-audit';
import { appendRevision } from '@/lib/admin-revisions';
import { isLikelyImagePathOrUrl } from '@/lib/admin-validation';
import { deleteReport, getReportById, getReportsFromSheet, upsertReport } from '@/lib/site-content';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

function parseHighlights(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((x) => String(x || '').trim()).filter(Boolean);
  return String(value || '')
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);
}

export async function GET(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session) return forbidden();
  const { searchParams } = new URL(request.url);
  const q = String(searchParams.get('q') || '').trim().toLowerCase();
  const pageRaw = Number(searchParams.get('page') || '1');
  const pageSizeRaw = Number(searchParams.get('pageSize') || '10');
  const status = String(searchParams.get('status') || 'all').trim().toLowerCase();
  const pageSize = Number.isFinite(pageSizeRaw) ? Math.min(Math.max(pageSizeRaw, 1), 100) : 10;
  const page = Number.isFinite(pageRaw) ? Math.max(1, pageRaw) : 1;

  const all = await getReportsFromSheet();
  const filtered = all.filter((report) => {
    const statusMatch =
      status === 'all' ||
      (status === 'active' && report.active) ||
      (status === 'inactive' && !report.active);
    const queryMatch =
      !q ||
      report.title.toLowerCase().includes(q) ||
      report.year.toLowerCase().includes(q) ||
      report.description.toLowerCase().includes(q) ||
      report.pdfUrl.toLowerCase().includes(q);
    return statusMatch && queryMatch;
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const reports = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    reports,
    total,
    totalPages,
    page: safePage,
    pageSize,
  });
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageContent(session.role)) return forbidden();
  const body = await request.json().catch(() => ({}));
  const title = String(body.title || '').trim();
  const pdfUrl = String(body.pdfUrl || '').trim();
  if (!title || !pdfUrl) return NextResponse.json({ error: 'Title and PDF URL are required.' }, { status: 400 });
  const thumbnail = String(body.thumbnail || '').trim();
  if (thumbnail && !isLikelyImagePathOrUrl(thumbnail)) {
    return NextResponse.json({ error: 'Thumbnail must be a valid image URL/path.' }, { status: 400 });
  }
  const id = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  await upsertReport({
    id,
    year: String(body.year || '').trim(),
    title,
    description: String(body.description || '').trim(),
    datePublished: String(body.datePublished || '').trim(),
    pdfUrl,
    highlights: parseHighlights(body.highlights),
    thumbnail,
    active: Boolean(body.active ?? true),
    sortOrder: Number(body.sortOrder || 9999),
    updatedAt: new Date().toISOString(),
  });
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'create',
    targetType: 'report',
    targetId: id,
    details: `Added report "${title}".`,
  });
  return NextResponse.json({ message: 'Report created.' }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageContent(session.role)) return forbidden();
  const body = await request.json().catch(() => ({}));
  const id = String(body.id || '').trim();
  if (!id) return NextResponse.json({ error: 'id is required.' }, { status: 400 });
  const existing = await getReportById(id);
  if (!existing) return NextResponse.json({ error: 'Report not found.' }, { status: 404 });
  const thumbnail = String(body.thumbnail || '').trim();
  if (thumbnail && !isLikelyImagePathOrUrl(thumbnail)) {
    return NextResponse.json({ error: 'Thumbnail must be a valid image URL/path.' }, { status: 400 });
  }
  await appendRevision({
    actorEmail: session.email,
    actorRole: session.role,
    entityType: 'report',
    entityId: id,
    action: 'before_update',
    snapshot: JSON.stringify(existing),
  });
  await upsertReport({
    id,
    year: String(body.year || '').trim(),
    title: String(body.title || '').trim(),
    description: String(body.description || '').trim(),
    datePublished: String(body.datePublished || '').trim(),
    pdfUrl: String(body.pdfUrl || '').trim(),
    highlights: parseHighlights(body.highlights),
    thumbnail,
    active: Boolean(body.active ?? true),
    sortOrder: Number(body.sortOrder || 9999),
    updatedAt: new Date().toISOString(),
  });
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'update',
    targetType: 'report',
    targetId: id,
    details: `Updated report "${String(body.title || '').trim()}".`,
  });
  return NextResponse.json({ message: 'Report updated.' });
}

export async function DELETE(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageContent(session.role)) return forbidden();
  const { searchParams } = new URL(request.url);
  const id = String(searchParams.get('id') || '').trim();
  if (!id) return NextResponse.json({ error: 'id is required.' }, { status: 400 });
  await deleteReport(id);
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'delete',
    targetType: 'report',
    targetId: id,
    details: 'Deleted report.',
  });
  return NextResponse.json({ message: 'Report deleted.' });
}
