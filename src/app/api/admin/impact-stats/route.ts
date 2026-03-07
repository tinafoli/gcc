import { NextRequest, NextResponse } from 'next/server';
import { canManageContent, getSessionFromCookie } from '@/lib/admin-auth';
import {
  deleteImpactStat,
  getImpactStatById,
  getImpactStatsFromSheet,
  upsertImpactStat,
  upsertImpactStatsBulk,
} from '@/lib/site-content';
import { appendAuditLog } from '@/lib/admin-audit';
import { appendRevision } from '@/lib/admin-revisions';

type ImpactStatPayload = {
  id?: unknown;
  label?: unknown;
  value?: unknown;
  suffix?: unknown;
  description?: unknown;
  active?: unknown;
  sortOrder?: unknown;
};

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session) return forbidden();
  const stats = await getImpactStatsFromSheet();
  return NextResponse.json({ stats });
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageContent(session.role)) return forbidden();
  const body = await request.json().catch(() => ({}));
  const label = String(body.label || '').trim();
  if (!label) return NextResponse.json({ error: 'Label is required.' }, { status: 400 });
  const id = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  await upsertImpactStat({
    id,
    label,
    value: Number(body.value || 0),
    suffix: String(body.suffix || '+').trim() || '+',
    description: String(body.description || '').trim(),
    active: Boolean(body.active ?? true),
    sortOrder: Number(body.sortOrder || 9999),
    updatedAt: new Date().toISOString(),
  });
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'create',
    targetType: 'impact_stat',
    targetId: id,
    details: `Added impact stat "${label}".`,
  });
  return NextResponse.json({ message: 'Impact stat created.' }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageContent(session.role)) return forbidden();
  const body = await request.json().catch(() => ({}));
  const statsPayload = Array.isArray(body.stats) ? body.stats : null;
  if (statsPayload) {
    const normalized = statsPayload.map((item: ImpactStatPayload) => ({
      id: String(item?.id || '').trim(),
      label: String(item?.label || '').trim(),
      value: Number(item?.value || 0),
      suffix: String(item?.suffix || '+').trim() || '+',
      description: String(item?.description || '').trim(),
      active: Boolean(item?.active ?? true),
      sortOrder: Number(item?.sortOrder || 9999),
      updatedAt: new Date().toISOString(),
    })).filter((item: { id: string; label: string }) => item.id && item.label);

    if (normalized.length === 0) {
      return NextResponse.json({ error: 'No valid impact stats provided.' }, { status: 400 });
    }

    await upsertImpactStatsBulk(normalized);
    await appendAuditLog({
      actorEmail: session.email,
      actorRole: session.role,
      action: 'update',
      targetType: 'impact_stat',
      targetId: 'bulk',
      details: `Bulk updated ${normalized.length} impact stats.`,
    });
    return NextResponse.json({ message: 'Impact stats updated.' });
  }

  const id = String(body.id || '').trim();
  if (!id) return NextResponse.json({ error: 'id is required.' }, { status: 400 });
  const existing = await getImpactStatById(id);
  if (existing) {
    await appendRevision({
      actorEmail: session.email,
      actorRole: session.role,
      entityType: 'impact_stat',
      entityId: id,
      action: 'before_update',
      snapshot: JSON.stringify(existing),
    });
  }
  await upsertImpactStat({
    id,
    label: String(body.label || '').trim(),
    value: Number(body.value || 0),
    suffix: String(body.suffix || '+').trim() || '+',
    description: String(body.description || '').trim(),
    active: Boolean(body.active ?? true),
    sortOrder: Number(body.sortOrder || 9999),
    updatedAt: new Date().toISOString(),
  });
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'update',
    targetType: 'impact_stat',
    targetId: id,
    details: `Updated impact stat "${String(body.label || '').trim()}".`,
  });
  return NextResponse.json({ message: 'Impact stat updated.' });
}

export async function DELETE(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageContent(session.role)) return forbidden();
  const { searchParams } = new URL(request.url);
  const id = String(searchParams.get('id') || '').trim();
  if (!id) return NextResponse.json({ error: 'id is required.' }, { status: 400 });
  await deleteImpactStat(id);
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'delete',
    targetType: 'impact_stat',
    targetId: id,
    details: 'Deleted impact stat.',
  });
  return NextResponse.json({ message: 'Impact stat deleted.' });
}
