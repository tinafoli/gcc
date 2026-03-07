import { Metadata } from 'next';
import ClientDonatePage from './client-donate-page';
import { getImpactStatsFromSheet, getReportsFromSheet, getSeoSettingsByPage } from '@/lib/site-content';

const DEFAULT_METADATA: Metadata = {
  title: 'Donate',
  description: 'Support Ghana Code Club\'s mission to provide tech education to Ghanaian youth. Your donation helps us train students, equip schools, and empower the next generation of tech leaders. View our annual impact reports to see the difference your support makes.',
  keywords: ['donate', 'Ghana Code Club', 'impact report', 'annual report', 'tech education Ghana', 'coding education', 'charity Ghana', 'nonprofit Ghana'],
  openGraph: {
    title: 'Support Our Mission | Ghana Code Club',
    description: 'Support Ghana Code Club\'s mission to provide tech education to Ghanaian youth. Your donation helps us train students, equip schools, and empower the next generation of tech leaders. View our annual impact reports.',
    images: [
      {
        url: '/images/donate-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Support Ghana Code Club',
      },
    ],
  },
  alternates: {
    canonical: '/donate',
  },
};

function splitKeywords(raw: string): string[] {
  return raw.split(',').map((item) => item.trim()).filter(Boolean);
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettingsByPage('donate');
  return {
    ...DEFAULT_METADATA,
    title: seo.title || DEFAULT_METADATA.title,
    description: seo.description || DEFAULT_METADATA.description,
    keywords: seo.keywords ? splitKeywords(seo.keywords) : DEFAULT_METADATA.keywords,
    alternates: {
      canonical: seo.canonical || 'https://ghanacode.club/donate',
    },
    openGraph: {
      ...DEFAULT_METADATA.openGraph,
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      url: seo.canonical || 'https://ghanacode.club/donate',
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630, alt: 'Support Ghana Code Club' }] : DEFAULT_METADATA.openGraph?.images,
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

export default async function DonatePage() {
  const [impactStats, reports] = await Promise.all([
    getImpactStatsFromSheet(),
    getReportsFromSheet(),
  ]);
  return (
    <ClientDonatePage
      impactStats={impactStats.filter((item) => item.active)}
      reports={reports.filter((item) => item.active)}
    />
  );
} 