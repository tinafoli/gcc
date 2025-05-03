import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adults in Tech Program | Ghana Code Club',
  description: 'Digital skills training for adult learners. Join our comprehensive program designed to help adults transition into technology through coding, web development, and digital literacy training.',
};

export default function AdultsTechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 