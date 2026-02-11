import { Metadata } from 'next';
import ClientReportsPage from './client-reports-page';

export const metadata: Metadata = {
  title: 'Impact Reports | Ghana Code Club - Annual Reports 2022-2025',
  description: 'Download Ghana Code Club\'s annual impact reports (2022, 2023, 2025). See how we\'ve trained 131,000+ kids, 7,000+ teachers, and established 22+ digital learning centers across Ghana through coding education and STEM programs.',
  keywords: [
    'Ghana Code Club impact report',
    'annual report 2025',
    'annual report 2023',
    'annual report 2022',
    'Ghana tech education report',
    'coding education impact',
    'STEM education Ghana',
    'nonprofit annual report',
    'digital literacy Ghana',
    '100 girls in STEM',
    'kids coding Ghana',
    'teacher training Ghana'
  ],
  openGraph: {
    title: 'Impact Reports | Ghana Code Club',
    description: 'Download Ghana Code Club\'s annual impact reports. 131,000+ kids trained, 7,000+ teachers equipped, 22+ digital learning centers across Ghana.',
    url: 'https://ghanacodeclub.org/reports',
    siteName: 'Ghana Code Club',
    images: [
      {
        url: '/images/gcc-logo.png',
        width: 1200,
        height: 630,
        alt: 'Ghana Code Club Impact Reports',
      },
    ],
    locale: 'en_GH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impact Reports | Ghana Code Club',
    description: 'Download Ghana Code Club\'s annual impact reports. 131,000+ kids trained, 7,000+ teachers equipped, 22+ digital learning centers across Ghana.',
    images: ['/images/gcc-logo.png'],
    creator: '@ghanacodeclub',
  },
  alternates: {
    canonical: '/reports',
  },
};

export default function ReportsPage() {
  return <ClientReportsPage />;
}




