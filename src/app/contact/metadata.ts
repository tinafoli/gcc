import { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Ghana Code Club. Whether you\'re interested in our programs, partnerships, or volunteering opportunities, we\'re here to help with your inquiries.',
  openGraph: {
    title: 'Contact Ghana Code Club',
    description: 'Get in touch with Ghana Code Club. Whether you\'re interested in our programs, partnerships, or volunteering opportunities, we\'re here to help with your inquiries.',
    images: [
      {
        url: '/images/contact-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Ghana Code Club',
      },
    ],
  },
  alternates: {
    canonical: '/contact',
  },
};

export default metadata; 