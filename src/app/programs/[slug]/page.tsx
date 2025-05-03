'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProgramImage from '@/components/ProgramImage';

// Program data - in a real application, this would come from a database or API
const programs = {
  '100-girls-in-tech': {
    title: '100 Girls in Tech',
    description: 'Empowering young girls with coding skills and technology knowledge.',
    longDescription: `The 100 Girls in Tech program is a transformative initiative designed to bridge the gender gap in technology. Through this program, we aim to inspire and equip young girls with the skills, confidence, and support they need to pursue careers in technology.

    Our comprehensive curriculum covers fundamental programming concepts, web development, and digital literacy skills. Participants also receive mentorship from successful women in tech and opportunities to work on real-world projects.`,
    features: [
      'Hands-on coding workshops',
      'Mentorship from women in tech',
      'Project-based learning',
      'Career guidance and support',
      'Networking opportunities'
    ],
    targetAudience: 'Girls aged 12-18',
    duration: '6 months',
    schedule: 'Weekly sessions (Saturdays)',
    image: '/images/programs/placeholder.svg',
    outcomes: [
      'Basic programming skills',
      'Problem-solving abilities',
      'Digital literacy',
      'Confidence in technology',
      'Career awareness'
    ]
  },
  // Add more programs here...
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function ProgramPage() {
  const params = useParams();
  const slug = params.slug as string;
  const program = programs[slug as keyof typeof programs];

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Program Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The program you're looking for doesn't exist.</p>
          <Link href="/programs" className="text-red-500 hover:text-red-600 font-medium">
            ← Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-blue-600/30 z-10"></div>
          <div className="absolute inset-0 bg-gray-900"></div>
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Link href="/programs" className="text-gray-300 hover:text-white mb-8 inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Programs
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Delius']">{program.title}</h1>
            <p className="text-xl text-gray-200 mb-8">{program.description}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#program-details" className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition-colors">
                Learn More
              </a>
              <a href="/contact" className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                Apply Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Details */}
      <section id="program-details" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-12"
              >
                <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Program</h2>
                  <div className="prose prose-lg max-w-none">
                    {program.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-600 mb-4">{paragraph.trim()}</p>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Features</h2>
                  <ul className="space-y-4">
                    {program.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-6 h-6 text-red-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Expected Outcomes</h2>
                  <ul className="space-y-4">
                    {program.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <ProgramImage
                      src={program.image}
                      alt={program.title}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Program Information</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">Target Audience</h4>
                        <p className="text-gray-900">{program.targetAudience}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">Duration</h4>
                        <p className="text-gray-900">{program.duration}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">Schedule</h4>
                        <p className="text-gray-900">{program.schedule}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-red-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Join?</h3>
                  <p className="text-gray-600 mb-6">
                    Take the first step towards your tech journey. Apply now to join this program.
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full bg-red-500 text-white text-center px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition-colors"
                  >
                    Apply Now
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Delius']">Start Your Journey Today</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join {program.title} and take the first step towards a future in technology. Our team is here to help you succeed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-white text-red-500 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                Contact Us
              </Link>
              <Link href="/signup" className="bg-gray-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors">
                Sign Up Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 