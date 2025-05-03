import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teacher Training Program | Ghana Code Club',
  description: 'Professional development program equipping educators with the knowledge and skills to effectively teach coding and technology in their classrooms.',
};

export default function TeacherTrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 