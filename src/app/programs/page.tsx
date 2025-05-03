import { Metadata } from 'next';
import ClientProgramsPage from './client-programs-page';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { delius } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Programs',
  description: 'Explore Ghana Code Club\'s tech education programs for students aged 5-17. From coding basics to advanced app development, our curriculum empowers Ghana\'s youth with digital skills.',
  openGraph: {
    title: 'Programs | Ghana Code Club',
    description: 'Explore Ghana Code Club\'s tech education programs for students aged 5-17. From coding basics to advanced app development, our curriculum empowers Ghana\'s youth with digital skills.',
    images: [
      {
        url: '/images/programs-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Ghana Code Club Programs',
      },
    ],
  },
  alternates: {
    canonical: '/programs',
  },
};

export default function ProgramsPage() {
  return <ClientProgramsPage />;
}