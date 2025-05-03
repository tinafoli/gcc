import { Metadata } from 'next';
import ClientAboutPage from './client-about-page';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Ghana Code Club\'s mission to empower Ghanaian youth through coding education. Meet our dedicated team of instructors and board members who are committed to teaching computer programming skills to children aged 5-17.',
  keywords: 'Ghana Code Club, coding education, programming for kids, tech education Ghana, learn to code Ghana, children coding, STEM education Ghana',
  openGraph: {
    title: 'About Ghana Code Club - Empowering Youth Through Code',
    description: 'Ghana Code Club teaches computer programming to children aged 5-17, fostering innovation and digital literacy across Ghana through after-school programs.',
    images: [
      {
        url: '/images/about-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Ghana Code Club Team'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Ghana Code Club - Empowering Youth Through Code',
    description: 'Ghana Code Club teaches computer programming to children aged 5-17, fostering innovation and digital literacy across Ghana.',
    images: ['/images/about-hero.jpg'],
  }
};

export default function AboutPage() {
  return <ClientAboutPage />;
} 