import { Metadata } from 'next';
import { Delius } from 'next/font/google';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Privacy Policy | Ghana Code Club',
  description: 'Learn how Ghana Code Club collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold text-gray-900 mb-8 ${delius.className}`}>Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Introduction</h2>
            <p className="text-gray-600 mb-4">
              Ghana Code Club ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Information We Collect</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
              <p className="text-gray-600">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Register for our programs or events</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us through our website</li>
                <li>Make a donation</li>
                <li>Apply for volunteer positions</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Process your registrations and donations</li>
              <li>Send you updates about our programs and events</li>
              <li>Respond to your inquiries and provide support</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Children's Privacy</h2>
            <p className="text-gray-600 mb-4">
              Our services are directed to children under the age of 18. We collect personal information from children only with parental consent. Parents can review, update, or delete their child's information by contacting us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
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