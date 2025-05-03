import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '100 Girls in STEM Program | Ghana Code Club',
  description: 'A transformative initiative designed to bridge the gender gap in technology, empowering young girls aged 10-17 with coding skills, mentorship, and opportunities in STEM fields.',
};

export default function GirlsInStemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 