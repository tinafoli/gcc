import { Metadata } from 'next';
import ClientBlogAdminPage from './client-blog-admin-page';

export const metadata: Metadata = {
  title: 'Blog Admin',
  description: 'Internal dashboard for managing blog posts.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BlogAdminPage() {
  return <ClientBlogAdminPage />;
}
