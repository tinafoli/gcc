import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Holiday Bootcamp | Ghana Code Club',
  description: 'Intensive 2-week coding bootcamp during school breaks. Students aged 12-18 work on real-world projects, learn from industry experts, and develop practical tech skills.',
};

export default function HolidayBootcampLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 