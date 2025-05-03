import { Metadata } from 'next';
import { Delius } from 'next/font/google';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Child Protection Policy | Ghana Code Club',
  description: 'Learn about Ghana Code Club\'s commitment to protecting children and ensuring their safety in our programs.',
};

export default function ChildProtectionPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold text-gray-900 mb-8 ${delius.className}`}>Child Protection Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Our Commitment</h2>
            <p className="text-gray-600 mb-4">
              Ghana Code Club is committed to creating a safe and nurturing environment for all children participating in our programs. We believe that every child has the right to be protected from harm and to participate in our activities in a safe and supportive environment.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Code of Conduct for Staff and Volunteers</h2>
            <p className="text-gray-600 mb-4">
              All staff and volunteers must:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Treat all children with respect and dignity</li>
              <li>Maintain appropriate physical and emotional boundaries</li>
              <li>Report any concerns about child safety immediately</li>
              <li>Never be alone with a child in a private setting</li>
              <li>Use appropriate language and behavior at all times</li>
              <li>Respect children's privacy and confidentiality</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Safeguarding Measures</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Staff and Volunteer Screening</h3>
              <p className="text-gray-600">
                We implement thorough screening processes for all staff and volunteers, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Background checks</li>
                <li>Reference verification</li>
                <li>Interviews and assessments</li>
                <li>Child protection training</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Reporting Procedures</h2>
            <p className="text-gray-600 mb-4">
              We have clear procedures for reporting concerns about child safety:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Immediate reporting to designated child protection officers</li>
              <li>Confidential handling of all reports</li>
              <li>Appropriate action taken in response to concerns</li>
              <li>Support provided to affected children and families</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Parental Involvement</h2>
            <p className="text-gray-600 mb-4">
              We encourage parental involvement and maintain open communication with parents and guardians about:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Program activities and schedules</li>
              <li>Child protection measures in place</li>
              <li>How to report concerns</li>
              <li>Parental rights and responsibilities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any concerns about child safety or would like more information about our child protection measures, please contact our Child Protection Officer:
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