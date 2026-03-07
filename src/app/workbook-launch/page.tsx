import { Metadata } from 'next';
import ClientLandingPage from './client-landing-page';

export const metadata: Metadata = {
  title: 'Workbook Launch Registration | Ghana Code Club',
  description: 'Register for the Ghana Code Club Unplugged Coding & AI Workbook Launch event. Teachers, schools, and partners welcome.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function WorkbookLaunchPage() {
  return <ClientLandingPage />;
}
