import { Metadata } from 'next';
import ClientSchoolForm from './client-school-form';

export const metadata: Metadata = {
  title: 'School Sign-Up | Workbook Launch | Ghana Code Club',
  description: 'Sign up your school or institution for the Ghana Code Club Unplugged Coding & AI Workbook Launch event.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SchoolSignUpPage() {
  return <ClientSchoolForm />;
}
