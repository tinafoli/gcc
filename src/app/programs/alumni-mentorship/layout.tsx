import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alumni Mentorship Program | Ghana Code Club',
  description: 'One-on-one mentoring program pairing participants with experienced tech professionals. Receive personalized guidance, career advice, and technical support.',
};

export default function AlumniMentorshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 