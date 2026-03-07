import { Metadata } from 'next';
import ClientPartnerForm from './client-partner-form';

export const metadata: Metadata = {
  title: 'Partner & Sponsor Interest | Workbook Launch | Ghana Code Club',
  description: 'Express your interest in partnering with or sponsoring the Ghana Code Club Unplugged Coding & AI Workbook Launch.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PartnerInterestPage() {
  return <ClientPartnerForm />;
}
