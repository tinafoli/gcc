'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Delius } from 'next/font/google';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const programDetails = {
  title: "100 Girls in STEM",
  description: "Empowering girls in STEM and girls in tech with coding skills and technology knowledge. A program dedicated to empowering girls to excel in technology careers.",
  longDescription: `The 100 Girls in STEM program is a transformative initiative designed to bridge the gender gap in technology. This program is focused on empowering girls in STEM and empowering girls in tech by providing comprehensive technology education and mentorship.

Through this program, we aim to inspire and equip young girls in tech with the skills, confidence, and support they need to pursue careers in technology. Our mission is empowering girls with the knowledge and tools necessary to succeed in STEM fields. Our program is specifically designed for tech girls who want to excel in technology careers.

Our comprehensive curriculum covers fundamental programming concepts, web development, digital literacy skills, and artificial intelligence (AI). Participants also receive mentorship from successful women in tech and opportunities to work on real-world projects. AI is a core part of the program, ensuring every girl in tech is introduced to the concepts and applications of artificial intelligence for the future of STEM.

Whether you're interested in empowering girls in STEM, empowering girls in tech, girls in STEM, girls in tech, or tech girls programs, this initiative provides the foundation for a successful career in technology. We are committed to empowering girls and creating opportunities for them to thrive in the tech industry.`,
  features: [
    'Empowering girls with Artificial Intelligence (AI) for girls in STEM',
    'Weekly coding sessions with female mentors',
    'Project-based learning with real-world applications',
    'Tech industry exposure and networking opportunities',
    'Leadership development workshops',
    'Annual showcase of projects',
    'Dedicated to empowering girls in technology'
  ],
  targetAudience: 'Girls aged 9-21',
  duration: '6 months',
  schedule: 'Weekly sessions (Saturdays)',
  image: '/images/girls-in-tech.jpg',
  outcomes: [
    'Basic programming skills',
    'Problem-solving abilities',
    'Digital literacy',
    'Confidence in technology',
    'Career awareness'
  ],
  testimonials: [
    {
      name: 'Sarah Addo',
      role: 'Program Graduate',
      quote: 'The 100 Girls in STEM program changed my life. I learned not just coding, but also gained confidence in my abilities and found a supportive community of like-minded girls.'
    },
    {
      name: 'Grace Mensah',
      role: 'Parent',
      quote: 'My daughter has grown so much since joining this program. She\'s not just learning to code; she\'s developing important life skills and finding her passion.'
    }
  ]
};

export default function GirlsInSTEMPage() {
  // Structured data for SEO - Girls in STEM/Tech Program
  const programStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalProgram',
    name: '100 Girls in STEM',
    alternateName: ['Girls in STEM Program', 'Girls in Tech Program', 'Tech Girls Program', 'Empowering Girls in STEM', 'Empowering Girls in Tech'],
    description: 'Empowering girls in STEM and empowering girls in tech through coding education. A comprehensive program dedicated to empowering girls with technology skills. Tech girls learn coding, AI, and technology skills.',
    provider: {
      '@type': 'Organization',
      name: 'Ghana Code Club',
      url: 'https://ghanacodeclub.org'
    },
    educationalCredentialAwarded: 'Certificate',
    programType: 'Educational Program',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: 'Girls in STEM, Girls in Tech, Tech Girls aged 9-21'
    },
    timeRequired: 'P6M',
    coursePrerequisites: 'None',
    teaches: [
      'Coding and Programming',
      'Web Development',
      'Artificial Intelligence',
      'Digital Literacy',
      'STEM Skills for Girls',
      'Technology for Girls in Tech'
    ],
    keywords: 'empowering girls, empowering girls in STEM, empowering girls in tech, girls in stem, girls in tech, tech girls, girls coding, women in tech, STEM for girls, empowering girls with technology',
    url: 'https://ghanacodeclub.org/programs/100-girls-in-stem'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programStructuredData) }}
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={programDetails.image}
            alt="100 Girls in STEM"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/70 to-blue-600/70"></div>
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
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${delius.className}`}>{programDetails.title}</h1>
            <p className="text-xl text-gray-200 mb-8">{programDetails.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Empowering Girls</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Girls in STEM</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Girls in Tech</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Tech Girls</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Women in Tech</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#program-details" className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition-colors">
                Learn More
              </a>
              <Link href="/contact" className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                Apply Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Details */}
      <section id="program-details" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
              >
                <h2 className={`text-3xl font-bold mb-6 ${delius.className}`}>About the Girls in STEM & Girls in Tech Program</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 whitespace-pre-line">{programDetails.longDescription}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
              >
                <h2 className={`text-3xl font-bold mb-6 ${delius.className}`}>Program Features</h2>
                <ul className="space-y-4">
                  {programDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className={`text-3xl font-bold mb-6 ${delius.className}`}>Program Outcomes</h2>
                <ul className="space-y-4">
                  {programDetails.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h3 className={`text-2xl font-bold mb-6 ${delius.className}`}>Program Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Target Audience</h4>
                    <p className="text-gray-600">{programDetails.targetAudience}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Duration</h4>
                    <p className="text-gray-600">{programDetails.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Schedule</h4>
                    <p className="text-gray-600">{programDetails.schedule}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-red-50 rounded-xl p-8"
              >
                <h3 className={`text-2xl font-bold mb-6 ${delius.className}`}>Ready to Join?</h3>
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
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${delius.className}`}>What Our Participants Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programDetails.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-red-500 text-xl font-bold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
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
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${delius.className}`}>Start Your Journey Today</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join the 100 Girls in STEM program and take the first step towards a future in technology. We are committed to empowering girls and helping them succeed in tech careers. Our team is here to support you every step of the way.
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