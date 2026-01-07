import { Metadata } from 'next';
import ClientDonatePage from './client-donate-page';

export const metadata: Metadata = {
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

export default function DonatePage() {
  return <ClientDonatePage />;
} 