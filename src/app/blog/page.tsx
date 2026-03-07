import { Metadata } from 'next';
import ClientBlogPage from './client-blog-page';
import { getPublishedBlogPosts } from '@/lib/blog-cms';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest news, articles, and insights from Ghana Code Club. Learn about our programs, success stories, and the impact of coding education in Ghana.',
  openGraph: {
    title: 'Ghana Code Club Blog',
    description: 'Read the latest news, articles, and insights from Ghana Code Club. Learn about our programs, success stories, and the impact of coding education in Ghana.',
    images: [
      {
        url: '/images/blog-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Ghana Code Club Blog',
      },
    ],
  },
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  return <ClientBlogPage posts={posts} />;
}