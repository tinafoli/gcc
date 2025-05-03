import { Metadata } from 'next';
import ClientPartnersPage from './client-partners-page';

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Meet the organizations and companies partnering with Ghana Code Club to empower Ghanaian youth through technology education. Together, we\'re building a brighter future for digital literacy in Ghana.',
  openGraph: {
    title: 'Partners | Ghana Code Club',
    description: 'Meet the organizations and companies partnering with Ghana Code Club to empower Ghanaian youth through technology education.',
    images: [
      {
        url: '/images/partners-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Ghana Code Club Partners',
      },
    ],
  },
  alternates: {
    canonical: '/partners',
  },
};

export default function PartnersPage() {
  return <ClientPartnersPage />;
} 