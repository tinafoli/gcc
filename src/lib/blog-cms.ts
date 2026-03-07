import { google } from 'googleapis';
import { blogPosts as staticBlogPosts } from '@/app/blog/data';
import type { BlogPost } from '@/app/blog/types';

const BLOG_TAB = 'BlogPosts';
const BLOG_HEADERS = [
  'id',
  'title',
  'slug',
  'excerpt',
  'category',
  'authorName',
  'authorRole',
  'authorAvatar',
  'date',
  'readTime',
  'image',
  'image2',
  'image3',
  'content',
  'published',
  'updatedAt',
];

function toBool(value: string | undefined): boolean {
  const v = (value || '').trim().toLowerCase();
  if (!v) return true;
  return v === 'true' || v === '1' || v === 'yes' || v === 'published';
}

function fallbackReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 220));
  return `${mins} min read`;
}

function buildAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !rawKey || !sheetId) return null;
  const key = rawKey.includes('\\n') ? rawKey.replace(/\\n/g, '\n') : rawKey;

  return {
    sheetId,
    auth: new google.auth.JWT({
      email: clientEmail,
      key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    }),
  };
}

async function ensureHeaderRow(sheets: ReturnType<typeof google.sheets>, sheetId: string) {
  let response;
  try {
    response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${BLOG_TAB}!A1:P1`,
    });
  } catch {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: BLOG_TAB } } }],
      },
    });

    response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${BLOG_TAB}!A1:P1`,
    });
  }

  if (!response.data.values || response.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${BLOG_TAB}!A1:P1`,
      valueInputOption: 'RAW',
      requestBody: { values: [BLOG_HEADERS] },
    });
  }
}

export type ManagedBlogPost = BlogPost & {
  published: boolean;
  updatedAt?: string;
};

export async function getSheetBlogPosts(): Promise<ManagedBlogPost[]> {
  const conf = buildAuth();
  if (!conf) return [];

  try {
    const sheets = google.sheets({ version: 'v4', auth: conf.auth });
    await ensureHeaderRow(sheets, conf.sheetId);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: conf.sheetId,
      range: `${BLOG_TAB}!A2:P`,
    });

    const rows = response.data.values || [];
    return rows
      .filter((r) => (r[0] || '').trim() && (r[1] || '').trim())
      .map((r) => {
        const content = r[13] || '';
        return {
          id: r[0],
          title: r[1] || 'Untitled',
          slug: r[2] || '',
          excerpt: r[3] || '',
          category: r[4] || 'news',
          author: {
            name: r[5] || 'Ghana Code Club Team',
            role: r[6] || 'Editorial Team',
            avatar: r[7] || '/images/team/mentor1.jpg',
          },
          date: r[8] || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          readTime: r[9] || fallbackReadTime(content),
          image: r[10] || '/images/blog/ai-workbooks.jpeg',
          image2: r[11] || r[10] || '/images/blog/ai-workbooks-2.jpeg',
          image3: r[12] || r[10] || '/images/blog/ai-workbooks-3.jpeg',
          content,
          published: toBool(r[14]),
          updatedAt: r[15] || '',
        };
      });
  } catch {
    return [];
  }
}

export async function getSheetBlogPostById(id: string): Promise<ManagedBlogPost | null> {
  const posts = await getSheetBlogPosts();
  return posts.find((p) => p.id === id) || null;
}

function parseDate(date: string): number {
  const t = Date.parse(date);
  return Number.isNaN(t) ? 0 : t;
}

export async function getMergedBlogPosts(): Promise<ManagedBlogPost[]> {
  const sheetPosts = await getSheetBlogPosts();
  const staticPosts: ManagedBlogPost[] = staticBlogPosts.map((p) => ({
    ...p,
    content: (p as BlogPost & { content?: string }).content || '',
    published: true,
  }));

  const bySlug = new Map<string, ManagedBlogPost>();
  for (const p of staticPosts) {
    if (p.slug) bySlug.set(p.slug, p);
  }
  for (const p of sheetPosts) {
    if (p.slug) bySlug.set(p.slug, p);
  }

  const merged = [...bySlug.values()];
  merged.sort((a, b) => parseDate(b.date) - parseDate(a.date));
  return merged;
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const merged = await getMergedBlogPosts();
  return merged.filter((p) => p.published);
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPublishedBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function appendSheetBlogPost(post: ManagedBlogPost): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');

  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  await ensureHeaderRow(sheets, conf.sheetId);

  await sheets.spreadsheets.values.append({
    spreadsheetId: conf.sheetId,
    range: `${BLOG_TAB}!A:P`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        post.id,
        post.title,
        post.slug || '',
        post.excerpt,
        post.category,
        post.author.name,
        post.author.role,
        post.author.avatar,
        post.date,
        post.readTime,
        post.image,
        post.image2,
        post.image3,
        post.content || '',
        String(post.published),
        post.updatedAt || new Date().toISOString(),
      ]],
    },
  });
}

export async function updateSheetBlogPost(post: ManagedBlogPost): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');

  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: conf.sheetId,
    range: `${BLOG_TAB}!A2:P`,
  });

  const rows = response.data.values || [];
  const idx = rows.findIndex((r) => r[0] === post.id);
  if (idx < 0) throw new Error('Post not found.');

  const rowNumber = idx + 2;
  await sheets.spreadsheets.values.update({
    spreadsheetId: conf.sheetId,
    range: `${BLOG_TAB}!A${rowNumber}:P${rowNumber}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        post.id,
        post.title,
        post.slug || '',
        post.excerpt,
        post.category,
        post.author.name,
        post.author.role,
        post.author.avatar,
        post.date,
        post.readTime,
        post.image,
        post.image2,
        post.image3,
        post.content || '',
        String(post.published),
        post.updatedAt || new Date().toISOString(),
      ]],
    },
  });
}

export async function deleteSheetBlogPost(id: string): Promise<void> {
  const conf = buildAuth();
  if (!conf) throw new Error('Google Sheets is not configured.');

  const sheets = google.sheets({ version: 'v4', auth: conf.auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: conf.sheetId,
    range: `${BLOG_TAB}!A2:A`,
  });
  const rows = response.data.values || [];
  const idx = rows.findIndex((r) => r[0] === id);
  if (idx < 0) throw new Error('Post not found.');

  const rowZeroBased = idx + 1;
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: conf.sheetId,
    fields: 'sheets(properties(sheetId,title))',
  });
  const tab = (meta.data.sheets || []).find((s) => s.properties?.title === BLOG_TAB);
  if (!tab?.properties?.sheetId && tab?.properties?.sheetId !== 0) {
    throw new Error('BlogPosts tab not found.');
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: conf.sheetId,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: tab.properties.sheetId,
              dimension: 'ROWS',
              startIndex: rowZeroBased,
              endIndex: rowZeroBased + 1,
            },
          },
        },
      ],
    },
  });
}
