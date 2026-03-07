import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientBlogPostPage from './client-blog-post-page';
import { getPublishedBlogPostBySlug, getPublishedBlogPosts } from '@/lib/blog-cms';

// Generate only the most recent posts at build time for faster builds
// Other posts will be generated on-demand
export async function generateStaticParams() {
  // Only pre-render the 5 most recent posts at build time
  const allPosts = await getPublishedBlogPosts();
  const recentPosts = allPosts
    .filter(post => post.slug)
    .slice(0, 5)
    .map((post) => ({
      slug: post.slug!,
    }));
  
  return recentPosts;
}

// Enable ISR - pages will be regenerated on-demand and cached
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const seoTitle = post.seoTitle || `${post.title} | Ghana Code Club Blog`;
  const seoDescription = post.seoDescription || post.excerpt;
  const seoKeywords = post.seoKeywords || [
    'Ghana Code Club',
    'coding education Ghana',
    'AI literacy',
    post.category,
    post.title,
  ];

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublishedBlogPosts();
  const otherPosts = allPosts
    .filter((p) => p.id !== post.id && p.slug)
    .slice(0, 10);

  return <ClientBlogPostPage post={post} otherPosts={otherPosts} />;
}

