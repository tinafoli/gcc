import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saturday Coding School | Ghana Code Club',
  description: 'Weekly coding education program for children aged 7-15. Learn programming fundamentals through interactive activities, games, and hands-on projects in a fun, supportive environment.',
};

export default function SaturdayCodingSchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 