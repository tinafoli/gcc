import { Metadata } from 'next';
import ClientResourcesPage from './client-resources-page';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Educational resources and learning materials from Ghana Code Club. Coming soon!',
  openGraph: {
    title: 'Resources | Ghana Code Club',
    description: 'Educational resources and learning materials from Ghana Code Club. Coming soon!',
  },
  alternates: {
    canonical: '/resources',
  },
};

export default function ResourcesPage() {
  return <ClientResourcesPage />;
}
