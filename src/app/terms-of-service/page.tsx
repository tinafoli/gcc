import { Metadata } from 'next';
import { Delius } from 'next/font/google';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Terms of Service | Ghana Code Club',
  description: 'Learn about the terms and conditions for using Ghana Code Club\'s services and programs.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold text-gray-900 mb-8 ${delius.className}`}>Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Introduction</h2>
            <p className="text-gray-600 mb-4">
              Welcome to Ghana Code Club. By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully before using our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Program Registration</h2>
            <p className="text-gray-600 mb-4">
              When registering for our programs:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>You must provide accurate and complete information</li>
              <li>Parental consent is required for participants under 18</li>
              <li>Registration does not guarantee program placement</li>
              <li>Program fees are non-refundable unless otherwise stated</li>
              <li>We reserve the right to modify or cancel programs</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content, materials, and resources provided by Ghana Code Club are protected by intellectual property rights. You may not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Copy, modify, or distribute our materials without permission</li>
              <li>Use our content for commercial purposes</li>
              <li>Remove or alter any copyright notices</li>
              <li>Create derivative works without authorization</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>User Responsibilities</h2>
            <p className="text-gray-600 mb-4">
              As a user of our services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Follow our Code of Conduct</li>
              <li>Respect the rights of other participants</li>
              <li>Use our services only for lawful purposes</li>
              <li>Maintain the confidentiality of your account</li>
              <li>Report any security concerns immediately</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              Ghana Code Club is not liable for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Any indirect, incidental, or consequential damages</li>
              <li>Loss of data or profits</li>
              <li>Interruptions in service</li>
              <li>Actions of third parties</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Governing Law</h2>
            <p className="text-gray-600 mb-4">
              These terms shall be governed by and construed in accordance with the laws of Ghana. Any disputes shall be subject to the exclusive jurisdiction of the courts of Ghana.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <p className="text-gray-600">
              Email: tinaappiah@ghanacodeclub.org<br />
              Phone: +233 265 270 825
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 