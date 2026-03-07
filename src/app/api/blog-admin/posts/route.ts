import { NextResponse } from 'next/server';
import {
  appendSheetBlogPost,
  deleteSheetBlogPost,
  getSheetBlogPostById,
  getSheetBlogPosts,
  updateSheetBlogPost,
  type ManagedBlogPost,
} from '@/lib/blog-cms';
import { canManageBlog, getSessionFromCookie } from '@/lib/admin-auth';
import { appendAuditLog } from '@/lib/admin-audit';
import { appendRecycleBinEntry } from '@/lib/recycle-bin';
import { appendRevision } from '@/lib/admin-revisions';
import { isLikelyImagePathOrUrl } from '@/lib/admin-validation';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session) return forbidden();
  const posts = await getSheetBlogPosts();
  posts.sort((a, b) => (a.updatedAt || '').localeCompare(b.updatedAt || '') * -1);
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const session = await getSessionFromCookie();
  if (!session || !canManageBlog(session.role)) return forbidden();

  try {
    const body = await request.json();
    const title = String(body.title || '').trim();
    const content = String(body.content || '').trim();
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
    }

    const post: ManagedBlogPost = {
      id: String(Date.now()),
      title,
      slug: String(body.slug || '').trim() || slugify(title),
      excerpt: String(body.excerpt || '').trim() || content.slice(0, 220),
      category: String(body.category || 'news').trim(),
      author: {
        name: String(body.authorName || 'Ghana Code Club Team').trim(),
        role: String(body.authorRole || 'Editorial Team').trim(),
        avatar: String(body.authorAvatar || '/images/team/mentor1.jpg').trim(),
      },
      date: String(body.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })).trim(),
      readTime: String(body.readTime || '').trim() || `${Math.max(1, Math.round(content.split(/\s+/).length / 220))} min read`,
      image: String(body.image || '/images/blog/ai-workbooks.jpeg').trim(),
      image2: String(body.image2 || body.image || '/images/blog/ai-workbooks-2.jpeg').trim(),
      image3: String(body.image3 || body.image || '/images/blog/ai-workbooks-3.jpeg').trim(),
      content,
      published: Boolean(body.published ?? true),
      updatedAt: new Date().toISOString(),
    };
    if (!isLikelyImagePathOrUrl(post.image) || !isLikelyImagePathOrUrl(post.image2) || !isLikelyImagePathOrUrl(post.image3)) {
      return NextResponse.json({ error: 'Image fields must be valid image URLs or local paths.' }, { status: 400 });
    }

    await appendSheetBlogPost(post);
    await appendAuditLog({
      actorEmail: session.email,
      actorRole: session.role,
      action: 'create',
      targetType: 'blog_post',
      targetId: post.id,
      details: `Created blog post "${post.title}" (slug: ${post.slug || 'n/a'}).`,
    });
    return NextResponse.json({ message: 'Post created.', post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create post.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSessionFromCookie();
  if (!session || !canManageBlog(session.role)) return forbidden();

  try {
    const body = await request.json();
    const id = String(body.id || '').trim();
    const title = String(body.title || '').trim();
    const content = String(body.content || '').trim();
    if (!id || !title || !content) {
      return NextResponse.json({ error: 'id, title and content are required.' }, { status: 400 });
    }

    const post: ManagedBlogPost = {
      id,
      title,
      slug: String(body.slug || '').trim() || slugify(title),
      excerpt: String(body.excerpt || '').trim() || content.slice(0, 220),
      category: String(body.category || 'news').trim(),
      author: {
        name: String(body.authorName || 'Ghana Code Club Team').trim(),
        role: String(body.authorRole || 'Editorial Team').trim(),
        avatar: String(body.authorAvatar || '/images/team/mentor1.jpg').trim(),
      },
      date: String(body.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })).trim(),
      readTime: String(body.readTime || '').trim() || `${Math.max(1, Math.round(content.split(/\s+/).length / 220))} min read`,
      image: String(body.image || '/images/blog/ai-workbooks.jpeg').trim(),
      image2: String(body.image2 || body.image || '/images/blog/ai-workbooks-2.jpeg').trim(),
      image3: String(body.image3 || body.image || '/images/blog/ai-workbooks-3.jpeg').trim(),
      content,
      published: Boolean(body.published ?? true),
      updatedAt: new Date().toISOString(),
    };
    if (!isLikelyImagePathOrUrl(post.image) || !isLikelyImagePathOrUrl(post.image2) || !isLikelyImagePathOrUrl(post.image3)) {
      return NextResponse.json({ error: 'Image fields must be valid image URLs or local paths.' }, { status: 400 });
    }

    const existing = await getSheetBlogPostById(post.id);
    if (!existing) return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    await appendRevision({
      actorEmail: session.email,
      actorRole: session.role,
      entityType: 'blog_post',
      entityId: post.id,
      action: 'before_update',
      snapshot: JSON.stringify(existing),
    });
    await updateSheetBlogPost(post);
    await appendAuditLog({
      actorEmail: session.email,
      actorRole: session.role,
      action: 'update',
      targetType: 'blog_post',
      targetId: post.id,
      details: `Updated blog post "${post.title}" (slug: ${post.slug || 'n/a'}).`,
    });
    return NextResponse.json({ message: 'Post updated.', post });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to update post.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSessionFromCookie();
  if (!session || !canManageBlog(session.role)) return forbidden();
  try {
    const { searchParams } = new URL(request.url);
    const id = String(searchParams.get('id') || '').trim();
    if (!id) {
      return NextResponse.json({ error: 'id is required.' }, { status: 400 });
    }
    const existing = await getSheetBlogPostById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }
    await appendRecycleBinEntry({
      entityType: 'blog_post',
      entityId: id,
      deletedBy: session.email,
      payload: JSON.stringify(existing),
    });
    await deleteSheetBlogPost(id);
    await appendAuditLog({
      actorEmail: session.email,
      actorRole: session.role,
      action: 'delete',
      targetType: 'blog_post',
      targetId: id,
      details: 'Deleted blog post.',
    });
    return NextResponse.json({ message: 'Post deleted.' });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to delete post.' }, { status: 500 });
  }
}
