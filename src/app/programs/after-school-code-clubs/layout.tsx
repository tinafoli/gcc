import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'After School Code Clubs | Ghana Code Club',
  description: 'Structured after-school program providing students with hands-on coding education in a relaxed, extracurricular setting. From basic programming to advanced projects.',
};

export default function AfterSchoolCodeClubsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 