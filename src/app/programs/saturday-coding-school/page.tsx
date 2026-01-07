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
  title: "Saturday Coding School",
  description: "Weekend coding education for all ages",
  longDescription: `The Saturday Coding School is a weekly program that provides structured coding education for children aged 5-17. Students learn programming fundamentals, including artificial intelligence (AI), through interactive activities, games, and hands-on projects in a fun, supportive environment.

Our curriculum is designed to be engaging and age-appropriate, with a focus on building problem-solving skills and computational thinking. Each session is led by experienced instructors who provide personalized attention to ensure every student's success. AI is a core part of our curriculum, ensuring all students are introduced to the concepts and applications of artificial intelligence from an early age.`,
  features: [
    'Artificial Intelligence (AI) for all ages',
    'Age-appropriate curriculum for different skill levels',
    'Small group sessions with personalized attention',
    'Progress tracking and regular feedback',
    'Parent-teacher conferences to discuss development',
    'Certificate upon completion',
    'Fun, project-based learning approach',
    'Introduction to multiple programming languages',
    'Focus on creativity and problem-solving'
  ],
  targetAudience: 'Children aged 5-17',
  duration: 'Ongoing program with flexible enrollment',
  schedule: 'Weekly sessions (Saturdays, 11:00 AM - 4:00 PM)',
  image: '/images/saturday-school.jpg',
  outcomes: [
    'Basic programming skills',
    'Problem-solving abilities',
    'Digital literacy',
    'Confidence in technology',
    'Creativity and innovation',
    'Team collaboration skills',
    'Logical thinking'
  ],
  testimonials: [
    {
      name: 'Mary Addai',
      role: 'Parent',
      quote: 'My son has been attending the Saturday Coding School for six months now, and the progress he\'s made is incredible. He\'s not just learning to code; he\'s developing critical thinking skills that will benefit him in all areas of life.'
    },
    {
      name: 'Monalisa Akanpaaba',
      role: 'Student',
      quote: 'I love coming to Saturday Coding School! The teachers are so helpful, and I\'ve learned how to create my own games. It\'s fun and challenging at the same time.'
    }
  ]
};

export default function SaturdayCodingSchoolPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={programDetails.image}
            alt="Saturday Coding School"
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
            <div className="flex flex-wrap gap-4">
              <a href="#program-details" className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition-colors">
                Learn More
              </a>
              <a 
                href="https://forms.gle/S3ZbxZsaEoPJN6tMA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </a>
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
                <h2 className={`text-3xl font-bold mb-6 ${delius.className}`}>About the Program</h2>
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
                <a
                  href="https://forms.gle/S3ZbxZsaEoPJN6tMA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-red-500 text-white text-center px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition-colors"
                >
                  Apply Now
                </a>
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
              Join the Saturday Coding School and take the first step towards a future in technology. Our team is here to help you succeed.
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