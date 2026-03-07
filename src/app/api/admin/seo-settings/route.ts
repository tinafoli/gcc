import { NextRequest, NextResponse } from 'next/server';
import { canManageContent, getSessionFromCookie } from '@/lib/admin-auth';
import { appendAuditLog } from '@/lib/admin-audit';
import { appendRevision } from '@/lib/admin-revisions';
import { isValidHttpUrl } from '@/lib/admin-validation';
import { getSeoSettingsByPage, getSeoSettingsFromSheet, upsertSeoSettings } from '@/lib/site-content';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

function parsePageKey(value: unknown): 'home' | 'donate' | 'reports' | null {
  const key = String(value || '').trim() as 'home' | 'donate' | 'reports';
  if (key === 'home' || key === 'donate' || key === 'reports') return key;
  return null;
}

export async function GET(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session) return forbidden();
  const { searchParams } = new URL(request.url);
  const key = parsePageKey(searchParams.get('pageKey'));
  if (key) {
    const settings = await getSeoSettingsByPage(key);
    return NextResponse.json({ settings });
  }
  const settings = await getSeoSettingsFromSheet();
  return NextResponse.json({ settings });
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !canManageContent(session.role)) return forbidden();
  const body = await request.json().catch(() => ({}));
  const pageKey = parsePageKey(body.pageKey);
  if (!pageKey) return NextResponse.json({ error: 'Valid pageKey is required.' }, { status: 400 });

  const canonical = String(body.canonical || '').trim();
  const ogImage = String(body.ogImage || '').trim();
  const twitterImage = String(body.twitterImage || '').trim();
  if (canonical && !isValidHttpUrl(canonical)) {
    return NextResponse.json({ error: 'Canonical URL must be a valid http(s) URL.' }, { status: 400 });
  }
  if (ogImage && !isValidHttpUrl(ogImage)) {
    return NextResponse.json({ error: 'Open Graph image must be a valid http(s) URL.' }, { status: 400 });
  }
  if (twitterImage && !isValidHttpUrl(twitterImage)) {
    return NextResponse.json({ error: 'Twitter image must be a valid http(s) URL.' }, { status: 400 });
  }

  const current = await getSeoSettingsByPage(pageKey);
  await appendRevision({
    actorEmail: session.email,
    actorRole: session.role,
    entityType: 'seo_settings',
    entityId: pageKey,
    action: 'before_update',
    snapshot: JSON.stringify(current),
  });

  await upsertSeoSettings({
    pageKey,
    title: String(body.title || '').trim(),
    description: String(body.description || '').trim(),
    keywords: String(body.keywords || '').trim(),
    canonical,
    ogTitle: String(body.ogTitle || '').trim(),
    ogDescription: String(body.ogDescription || '').trim(),
    ogImage,
    twitterTitle: String(body.twitterTitle || '').trim(),
    twitterDescription: String(body.twitterDescription || '').trim(),
    twitterImage,
    updatedAt: new Date().toISOString(),
  });

  await appendAuditLog({
    actorEmail: session.email,
    actorRole: session.role,
    action: 'update',
    targetType: 'seo_settings',
    targetId: pageKey,
    details: `Updated SEO settings for ${pageKey}.`,
  });
  return NextResponse.json({ message: 'SEO settings updated.' });
}
