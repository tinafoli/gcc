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
import { getPublishedBlogPosts } from '@/lib/blog-cms';
import { getHomepageAnnouncement, getImpactStatsFromSheet, getSeoSettingsByPage, getSiteSettings } from '@/lib/site-content';
import Link from 'next/link';

const DEFAULT_METADATA: Metadata = {
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

function splitKeywords(raw: string): string[] {
  return raw.split(',').map((item) => item.trim()).filter(Boolean);
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettingsByPage('home');
  return {
    ...DEFAULT_METADATA,
    title: seo.title || DEFAULT_METADATA.title,
    description: seo.description || DEFAULT_METADATA.description,
    keywords: seo.keywords ? splitKeywords(seo.keywords) : DEFAULT_METADATA.keywords,
    alternates: {
      canonical: seo.canonical || 'https://ghanacode.club',
    },
    openGraph: {
      ...DEFAULT_METADATA.openGraph,
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      url: seo.canonical || 'https://ghanacode.club',
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630, alt: 'Ghana Code Club' }] : DEFAULT_METADATA.openGraph?.images,
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

export default async function HomePage() {
  const fallbackSiteSettings = {
    linkedinEmbedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7416748561272528896',
    linkedinProfileUrl: 'https://www.linkedin.com/posts/ghana-code-club_ghanacodeclub-ailiteracy-ecobank-activity-7416748561272528896-Qnvd',
    linkedinPostUrl: 'https://www.linkedin.com/posts/ghana-code-club_ghanacodeclub-ailiteracy-ecobank-activity-7416748561272528896-Qnvd',
  };
  const fallbackAnnouncement = {
    enabled: false,
    badge: 'Upcoming Event',
    title: 'Join Our Exciting Summer Activities',
    eventTitle: '',
    date: '22 JULY 2025',
    time: 'Tuesdays, Wednesdays & Saturdays',
    location: 'Ashongman Estates, Accra, Ghana',
    image: '/images/events/summer-camp.jpg',
    description: 'ACTIVITIES:\n• Coding & Game Design\n• Robotics & AI\n• Circuits & Electronics\n• Digital Arts\n• 3D Model/Print\n• Micro:bits',
    buttonText: 'Register Your Kids',
    buttonUrl: 'https://bit.ly/gccsummerschool',
  };

  const [blogPostsResult, siteSettingsResult, homepageAnnouncementResult, impactStatsResult] = await Promise.allSettled([
    getPublishedBlogPosts(),
    getSiteSettings(),
    getHomepageAnnouncement(),
    getImpactStatsFromSheet(),
  ]);

  const blogPosts = blogPostsResult.status === 'fulfilled' ? blogPostsResult.value : [];
  const siteSettings = siteSettingsResult.status === 'fulfilled' ? siteSettingsResult.value : fallbackSiteSettings;
  const homepageAnnouncement = homepageAnnouncementResult.status === 'fulfilled'
    ? homepageAnnouncementResult.value
    : fallbackAnnouncement;
  const impactStats = impactStatsResult.status === 'fulfilled' ? impactStatsResult.value : [];
  return (
    <ClientHomePage
      blogPosts={blogPosts}
      siteSettings={siteSettings}
      homepageAnnouncement={homepageAnnouncement}
      impactStats={impactStats.filter((item) => item.active)}
    />
  );
}
