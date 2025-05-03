import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coolest Projects Ghana | Ghana Code Club',
  description: 'Showcase program where young innovators can demonstrate their creativity through technology projects. Inspiring the next generation of tech leaders in Ghana.',
};

export default function CoolestProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 