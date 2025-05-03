import { Metadata } from 'next';
import { Delius } from 'next/font/google';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Code of Conduct | Ghana Code Club',
  description: 'Learn about the expected behavior and standards for all participants in Ghana Code Club programs.',
};

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold text-gray-900 mb-8 ${delius.className}`}>Code of Conduct</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Our Values</h2>
            <p className="text-gray-600 mb-4">
              Ghana Code Club is committed to creating an inclusive, respectful, and supportive environment for all participants. Our code of conduct reflects our core values of:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Respect for all individuals</li>
              <li>Inclusivity and diversity</li>
              <li>Collaboration and teamwork</li>
              <li>Integrity and honesty</li>
              <li>Continuous learning and growth</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Expected Behavior</h2>
            <p className="text-gray-600 mb-4">
              All participants in Ghana Code Club programs are expected to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Treat everyone with respect and dignity</li>
              <li>Be inclusive and welcoming to all</li>
              <li>Use appropriate language and behavior</li>
              <li>Respect others' opinions and perspectives</li>
              <li>Maintain a positive and supportive attitude</li>
              <li>Follow program rules and guidelines</li>
              <li>Respect equipment and facilities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Unacceptable Behavior</h2>
            <p className="text-gray-600 mb-4">
              The following behaviors are not tolerated:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Harassment or bullying of any kind</li>
              <li>Discrimination based on any characteristic</li>
              <li>Inappropriate language or content</li>
              <li>Disruption of program activities</li>
              <li>Damage to equipment or facilities</li>
              <li>Unauthorized sharing of personal information</li>
              <li>Any form of violence or threats</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Reporting Violations</h2>
            <p className="text-gray-600 mb-4">
              If you experience or witness any violations of this code of conduct:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Report the incident to a staff member immediately</li>
              <li>Provide as much detail as possible about the incident</li>
              <li>Confidentiality will be maintained to the extent possible</li>
              <li>Appropriate action will be taken to address the situation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Consequences</h2>
            <p className="text-gray-600 mb-4">
              Violations of this code of conduct may result in:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Warning and education about appropriate behavior</li>
              <li>Temporary suspension from activities</li>
              <li>Permanent removal from programs</li>
              <li>Legal action in cases of serious violations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions or concerns about this code of conduct, please contact us:
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