import { Metadata } from 'next';
import ClientBlogAdminPage from '@/app/blog-admin/client-blog-admin-page';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Secure admin dashboard for Ghana Code Club content management.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <ClientBlogAdminPage />;
}
