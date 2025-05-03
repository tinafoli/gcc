import { Metadata } from 'next';

const metadata: Metadata = {
  title: {
    default: "Ghana Code Club",
    template: "%s | Ghana Code Club"
  },
  description: "Empowering Ghana's youth through coding education. We provide interactive computer science training for students aged 5-17, teacher training, and community tech initiatives.",
  keywords: ["Ghana Code Club", "coding education", "computer science", "Ghana tech education", "coding for kids", "STEM education", "digital skills", "tech training"],
  metadataBase: new URL('https://ghanacodeclub.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Ghana Code Club",
    description: "Empowering Ghana's youth through coding education. We provide interactive computer science training for students aged 5-17, teacher training, and community tech initiatives.",
    url: 'https://ghanacodeclub.org',
    siteName: 'Ghana Code Club',
    images: [
      {
        url: '/images/gcc-logo.png',
        width: 800,
        height: 600,
        alt: 'Ghana Code Club Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ghana Code Club",
    description: "Empowering Ghana's youth through coding education. We provide interactive computer science training for students aged 5-17, teacher training, and community tech initiatives.",
    images: ['/images/gcc-logo.png'],
    creator: '@ghanacodeclub',
  },
};

export default metadata; 