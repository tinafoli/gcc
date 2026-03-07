import { Metadata } from 'next';
import ClientTeacherForm from './client-teacher-form';

export const metadata: Metadata = {
  title: 'Teacher Registration | Workbook Launch | Ghana Code Club',
  description: 'Register as a teacher for the Ghana Code Club Unplugged Coding & AI Workbook Launch event.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TeacherRegistrationPage() {
  return <ClientTeacherForm />;
}
