import { NextRequest, NextResponse } from 'next/server';
import { canManageContent, getSessionFromCookie } from '@/lib/admin-auth';
import { deleteTeamMember, getTeamMemberById, getTeamMembersFromSheet, upsertTeamMember } from '@/lib/site-content';
import { appendAuditLog } from '@/lib/admin-audit';
import { appendRecycleBinEntry } from '@/lib/recycle-bin';
import { appendRevision } from '@/lib/admin-revisions';
import { isLikelyImagePathOrUrl, isValidHttpUrl } from '@/lib/admin-validation';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

function parseSortOrder(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 9999;
}

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session) return forbidden();
  const members = await getTeamMembersFromSheet();
  return NextResponse.json({ members });
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageContent(session.role)) return forbidden();
  const body = await request.json().catch(() => ({}));
  const name = String(body.name || '').trim();
  if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  const image = String(body.image || '').trim();
  const linkedin = String(body.linkedin || '').trim();
  const website = String(body.website || '').trim();
  if (!isLikelyImagePathOrUrl(image)) return NextResponse.json({ error: 'Invalid image URL/path.' }, { status: 400 });
  if (linkedin && !isValidHttpUrl(linkedin)) return NextResponse.json({ error: 'Invalid LinkedIn URL.' }, { status: 400 });
  if (website && !isValidHttpUrl(website)) return NextResponse.json({ error: 'Invalid website URL.' }, { status: 400 });

  const id = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  await upsertTeamMember({
    id,
    name,
    title: String(body.title || '').trim(),
    image,
    linkedin,
    website,
    active: Boolean(body.active ?? true),
    sortOrder: parseSortOrder(body.sortOrder),
    updatedAt: new Date().toISOString(),
  });
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'create',
    targetType: 'team_member',
    targetId: id,
    details: `Added team member "${name}".`,
  });

  return NextResponse.json({ message: 'Team member added.' }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageContent(session.role)) return forbidden();
  const body = await request.json().catch(() => ({}));
  const id = String(body.id || '').trim();
  if (!id) return NextResponse.json({ error: 'id is required.' }, { status: 400 });
  const existing = await getTeamMemberById(id);
  if (!existing) return NextResponse.json({ error: 'Team member not found.' }, { status: 404 });
  const image = String(body.image || '').trim();
  const linkedin = String(body.linkedin || '').trim();
  const website = String(body.website || '').trim();
  if (!isLikelyImagePathOrUrl(image)) return NextResponse.json({ error: 'Invalid image URL/path.' }, { status: 400 });
  if (linkedin && !isValidHttpUrl(linkedin)) return NextResponse.json({ error: 'Invalid LinkedIn URL.' }, { status: 400 });
  if (website && !isValidHttpUrl(website)) return NextResponse.json({ error: 'Invalid website URL.' }, { status: 400 });

  await appendRevision({
    actorEmail: session.email,
    actorRole: session.role,
    entityType: 'team_member',
    entityId: id,
    action: 'before_update',
    snapshot: JSON.stringify(existing),
  });
  await upsertTeamMember({
    id,
    name: String(body.name || '').trim(),
    title: String(body.title || '').trim(),
    image,
    linkedin,
    website,
    active: Boolean(body.active ?? true),
    sortOrder: parseSortOrder(body.sortOrder),
    updatedAt: new Date().toISOString(),
  });
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'update',
    targetType: 'team_member',
    targetId: id,
    details: `Updated team member "${String(body.name || '').trim()}".`,
  });
  return NextResponse.json({ message: 'Team member updated.' });
}

export async function DELETE(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageContent(session.role)) return forbidden();
  const { searchParams } = new URL(request.url);
  const id = String(searchParams.get('id') || '').trim();
  if (!id) return NextResponse.json({ error: 'id is required.' }, { status: 400 });
  const existing = await getTeamMemberById(id);
  if (!existing) return NextResponse.json({ error: 'Team member not found.' }, { status: 404 });
  await appendRecycleBinEntry({
    entityType: 'team_member',
    entityId: id,
    deletedBy: session.email,
    payload: JSON.stringify(existing),
  });
  await deleteTeamMember(id);
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'delete',
    targetType: 'team_member',
    targetId: id,
    details: 'Deleted team member.',
  });
  return NextResponse.json({ message: 'Team member deleted.' });
}
