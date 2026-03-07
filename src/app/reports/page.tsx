import { Metadata } from 'next';
import ClientReportsPage from './client-reports-page';
import { getReportsFromSheet, getSeoSettingsByPage } from '@/lib/site-content';

const DEFAULT_METADATA: Metadata = {
  title: 'Impact Reports | Ghana Code Club - Annual Reports 2022-2025',
  description: 'Download Ghana Code Club\'s annual impact reports (2022, 2023, 2024, 2025). See how we\'ve trained 131,000+ kids, 7,000+ teachers, and established 22+ digital learning centers across Ghana through coding education and STEM programs.',
  keywords: [
    'Ghana Code Club impact report',
    'annual report 2025',
    'annual report 2024',
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

function splitKeywords(raw: string): string[] {
  return raw.split(',').map((item) => item.trim()).filter(Boolean);
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettingsByPage('reports');
  return {
    ...DEFAULT_METADATA,
    title: seo.title || DEFAULT_METADATA.title,
    description: seo.description || DEFAULT_METADATA.description,
    keywords: seo.keywords ? splitKeywords(seo.keywords) : DEFAULT_METADATA.keywords,
    alternates: {
      canonical: seo.canonical || 'https://ghanacode.club/reports',
    },
    openGraph: {
      ...DEFAULT_METADATA.openGraph,
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      url: seo.canonical || 'https://ghanacode.club/reports',
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630, alt: 'Ghana Code Club Impact Reports' }] : DEFAULT_METADATA.openGraph?.images,
    },
    twitter: {
      ...DEFAULT_METADATA.twitter,
      title: seo.twitterTitle || seo.ogTitle || seo.title,
      description: seo.twitterDescription || seo.ogDescription || seo.description,
      images: seo.twitterImage ? [seo.twitterImage] : DEFAULT_METADATA.twitter?.images,
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function ReportsPage() {
  const reports = await getReportsFromSheet();
  return <ClientReportsPage reports={reports.filter((report) => report.active)} />;
}




