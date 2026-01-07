import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getPostBySlug } from '../data';
import ClientBlogPostPage from './client-blog-post-page';

// Generate only the most recent posts at build time for faster builds
// Other posts will be generated on-demand
export async function generateStaticParams() {
  // Only pre-render the 5 most recent posts at build time
  const recentPosts = blogPosts
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
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Ghana Code Club Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
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
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <ClientBlogPostPage post={post} />;
}

