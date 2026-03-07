import { NextRequest, NextResponse } from 'next/server';
import { canManageContent, getSessionFromCookie } from '@/lib/admin-auth';
import { getHomepageAnnouncement, upsertHomepageAnnouncement } from '@/lib/site-content';
import { appendAuditLog } from '@/lib/admin-audit';
import { appendRevision } from '@/lib/admin-revisions';
import { isLikelyImagePathOrUrl, isValidHttpUrl } from '@/lib/admin-validation';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session) return forbidden();
  const announcement = await getHomepageAnnouncement();
  return NextResponse.json({ announcement });
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageContent(session.role)) return forbidden();
  const body = await request.json().catch(() => ({}));
  const buttonUrl = String(body.buttonUrl || '#');
  const image = String(body.image || '');
  if (buttonUrl !== '#' && !isValidHttpUrl(buttonUrl)) {
    return NextResponse.json({ error: 'Button URL must be a valid http(s) URL.' }, { status: 400 });
  }
  if (!isLikelyImagePathOrUrl(image)) {
    return NextResponse.json({ error: 'Announcement image must be a valid URL or local path.' }, { status: 400 });
  }

  const current = await getHomepageAnnouncement();
  await appendRevision({
    actorEmail: session.email,
    actorRole: session.role,
    entityType: 'homepage_announcement',
    entityId: current.id || 'home-announcement',
    action: 'before_update',
    snapshot: JSON.stringify(current),
  });

  await upsertHomepageAnnouncement({
    id: String(body.id || 'home-announcement'),
    enabled: Boolean(body.enabled),
    badge: String(body.badge || 'Upcoming Event'),
    title: String(body.title || ''),
    eventTitle: String(body.eventTitle || ''),
    date: String(body.date || ''),
    time: String(body.time || ''),
    location: String(body.location || ''),
    image,
    description: String(body.description || ''),
    buttonText: String(body.buttonText || 'Learn More'),
    buttonUrl,
    updatedAt: new Date().toISOString(),
  });
  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'update',
    targetType: 'homepage_announcement',
    targetId: String(body.id || 'home-announcement'),
    details: `Updated homepage announcement. enabled=${Boolean(body.enabled)}`,
  });

  return NextResponse.json({ message: 'Announcement updated.' });
}
