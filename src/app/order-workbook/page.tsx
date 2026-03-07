import { Metadata } from 'next';
import ClientOrderForm from './client-order-form';

export const metadata: Metadata = {
  title: 'Order Workbook | Ghana Code Club',
  description: 'Order the Ghana Code Club Unplugged Coding & AI Workbook Learning Kit.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrderWorkbookPage() {
  return <ClientOrderForm />;
}
