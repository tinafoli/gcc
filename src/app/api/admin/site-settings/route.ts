import { NextRequest, NextResponse } from 'next/server';
import { canManageContent, getSessionFromCookie } from '@/lib/admin-auth';
import { getSiteSettings, updateSiteSettings } from '@/lib/site-content';
import { appendAuditLog } from '@/lib/admin-audit';
import { appendRevision } from '@/lib/admin-revisions';
import { isValidHttpUrl } from '@/lib/admin-validation';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

function isLinkedInUrl(value: string): boolean {
  const raw = (value || '').trim();
  if (!raw) return false;
  const decoded = (() => {
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  })();
  const source = `${raw} ${decoded}`;
  return /https?:\/\/([a-z0-9-]+\.)?linkedin\.com\//i.test(source);
}

function hasLinkedInPostReference(value: string): boolean {
  const raw = (value || '').trim();
  if (!raw) return false;
  const decoded = (() => {
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  })();
  const source = `${raw} ${decoded}`;
  return (
    /urn:li:(activity|share|ugcPost):\d+/i.test(source) ||
    /activity-\d+/i.test(source) ||
    /share-\d+/i.test(source) ||
    /ugcpost-\d+/i.test(source)
  );
}

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session) return forbidden();
  const settings = await getSiteSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageContent(session.role)) return forbidden();
  const body = await request.json().catch(() => ({}));

  const linkedinPostUrl = String(body.linkedinPostUrl || body.linkedinProfileUrl || '').trim();
  if (!linkedinPostUrl) {
    return NextResponse.json({ error: 'LinkedIn post URL is required.' }, { status: 400 });
  }
  if (!isValidHttpUrl(linkedinPostUrl)) {
    return NextResponse.json({ error: 'LinkedIn post URL must be a valid http(s) URL.' }, { status: 400 });
  }
  if (!isLinkedInUrl(linkedinPostUrl)) {
    return NextResponse.json({ error: 'Please paste a LinkedIn URL.' }, { status: 400 });
  }
  if (!hasLinkedInPostReference(linkedinPostUrl)) {
    return NextResponse.json(
      { error: 'Please paste a direct LinkedIn post link (open the post first, then copy link).' },
      { status: 400 },
    );
  }

  const current = await getSiteSettings();
  await appendRevision({
    actorEmail: session.email,
    actorRole: session.role,
    entityType: 'site_settings',
    entityId: 'linkedin',
    action: 'before_update',
    snapshot: JSON.stringify(current),
  });
  await updateSiteSettings({
    linkedinPostUrl,
    linkedinProfileUrl: linkedinPostUrl,
    linkedinEmbedUrl: '',
  });
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'update',
    targetType: 'site_settings',
    targetId: 'linkedin',
    details: 'Updated LinkedIn post URL.',
  });
  return NextResponse.json({ message: 'Site settings updated.' });
}
