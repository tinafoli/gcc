import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Village Program | Ghana Code Club',
  description: 'Community-based initiative bringing coding education to underserved areas through mobile labs and community centers. Making technology education accessible to all children.',
};

export default function DigitalVillageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 