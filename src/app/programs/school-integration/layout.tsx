import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Integration Program | Ghana Code Club',
  description: 'Comprehensive coding education integrated into school curriculum. Working with schools to seamlessly integrate technology education into existing academic programs.',
};

export default function SchoolIntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 