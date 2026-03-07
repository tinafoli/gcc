import { Metadata } from 'next';
import ClientAttendeeForm from './client-attendee-form';

export const metadata: Metadata = {
  title: 'General Attendee Registration | Workbook Launch | Ghana Code Club',
  description: 'Register as a general attendee for the Ghana Code Club Unplugged Coding & AI Workbook Launch event.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AttendeeRegistrationPage() {
  return <ClientAttendeeForm />;
}
