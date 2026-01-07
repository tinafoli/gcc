import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import StatisticItem from "@/components/StatisticItem";
import ClientPromoModal from "@/components/ClientPromoModal";
import ProgramCards from "@/components/ProgramCards";
import FAQ from "@/components/FAQ";
import SocialMediaFeeds from "@/components/SocialMediaFeeds";
import TechnologyStack from '@/components/TechnologyStack';
import Testimonials from '@/components/Testimonials';
import BlogPreview from '@/components/BlogPreview';
import { Metadata } from 'next';
import Script from 'next/script';
import ClientHomePage from './client-home-page';
import { blogPosts } from './blog/data';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://ghanacode.club'),
  title: 'Ghana Code Club | Empowering the next generation of Ghanaian leaders through coding education, AI and digital skills training',
  description: 'Ghana Code Club has trained over 131,000 kids, 7,000 teachers, and 324 mentors across 22 digital learning centers. Join our mission to empower children aged 5-17 with coding skills through interactive after-school programs.',
  keywords: 'Ghana Code Club, kids coding, learn programming Ghana, STEM education Ghana, coding for children, tech education Africa, programming classes Ghana',
  openGraph: {
    title: 'Ghana Code Club - Empowering Young Minds Through Code',
    description: 'Join Ghana Code Club\'s mission to teach coding to children aged 5-17. With over 131,000 kids trained, 7,000 teachers equipped, and 22 digital learning centers established, we\'re transforming digital literacy across Ghana.',
    url: 'https://ghanacode.club',
    siteName: 'Ghana Code Club',
    images: [{
      url: 'https://ghanacode.club/images/home-hero.jpg',
      width: 1200,
      height: 630,
      alt: 'Ghana Code Club Students Learning to Code'
    }],
    locale: 'en_GH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghana Code Club - Teaching Kids to Code in Ghana',
    description: 'Over 131,000 kids trained in coding across 22 digital learning centers in Ghana. Join our mission to empower the next generation of tech innovators.',
    images: ['https://ghanacode.club/images/home-hero.jpg'],
    creator: '@GhanaCodeClub',
    site: '@GhanaCodeClub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
  alternates: {
    canonical: 'https://ghanacode.club',
  },
};

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <ClientHomePage blogPosts={blogPosts} />
    </Suspense>
  );
}
