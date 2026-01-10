import { Metadata } from 'next';
import ClientReportsPage from './client-reports-page';

export const metadata: Metadata = {
  title: 'Impact Reports',
  description: 'Explore Ghana Code Club\'s annual impact reports showcasing our achievements in providing tech education to Ghanaian youth. Download our 2022 and 2023 annual reports.',
  keywords: ['impact report', 'annual report', 'Ghana Code Club', 'tech education Ghana', 'coding education impact', 'nonprofit reports'],
  openGraph: {
    title: 'Impact Reports | Ghana Code Club',
    description: 'Explore Ghana Code Club\'s annual impact reports showcasing our achievements in providing tech education to Ghanaian youth.',
    images: [
      {
        url: '/images/gcc-logo.png',
        width: 1200,
        height: 630,
        alt: 'Ghana Code Club Impact Reports',
      },
    ],
  },
  alternates: {
    canonical: '/reports',
  },
};

export default function ReportsPage() {
  return <ClientReportsPage />;
}




