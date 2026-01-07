import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '100 Girls in STEM Program | Empowering Girls in Tech | Ghana Code Club',
  description: 'Empowering girls in STEM and girls in tech through coding education. Our program is dedicated to empowering girls with technology skills. Join our 100 Girls in STEM program designed for tech girls aged 9-21. Learn coding, AI, and technology skills with mentorship from women in tech.',
  keywords: 'empowering girls, empowering girls in STEM, empowering girls in tech, girls in stem, girls in tech, tech girls, girls coding, women in tech, STEM for girls, coding for girls, girls technology program, Ghana girls in STEM, girls in tech Ghana, tech girls program, STEM education for girls, empowering girls with technology',
  openGraph: {
    title: '100 Girls in STEM - Girls in Tech Program | Ghana Code Club',
    description: 'Empowering girls in STEM and girls in tech through coding education. Join our program for tech girls to learn coding, AI, and technology skills.',
    images: [
      {
        url: '/images/girls-in-tech.jpg',
        width: 1200,
        height: 630,
        alt: 'Girls in STEM and Girls in Tech Program',
      },
    ],
  },
  alternates: {
    canonical: '/programs/100-girls-in-stem',
  },
};

export default function GirlsInStemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 