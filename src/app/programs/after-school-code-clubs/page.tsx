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
  title: "After School Code Clubs",
  description: "Teacher training and student coding clubs for sustainable learning",
  longDescription: `Our After School Code Clubs program is designed to create sustainable coding education within schools. We work closely with teachers to establish and maintain coding clubs that run after regular school hours, providing students with additional opportunities to learn and practice programming skills.

The program combines teacher training with student-focused coding sessions, ensuring that schools can continue to offer quality coding education independently. This approach creates a lasting impact by building local capacity and fostering a culture of technology education within the school community. Artificial intelligence (AI) is a core part of our club curriculum, so all club members are introduced to AI concepts and hands-on projects as part of their learning journey.`,
  features: [
    'Artificial Intelligence (AI) for all club members',
    'Teacher training and professional development',
    'Structured curriculum for different age groups',
    'Regular coding sessions after school hours',
    'Project-based learning activities',
    'Progress tracking and assessment tools',
    'School-wide coding events and competitions',
    'Support for club establishment and management',
    'Access to online learning resources'
  ],
  targetAudience: 'Students aged 7-17 and their teachers',
  duration: 'Ongoing program with flexible scheduling',
  schedule: 'After school hours (3:00 PM - 5:00 PM)',
  image: '/images/code-club.jpg',
  curriculum: [
    {
      level: 'Beginner',
      topics: [
        'Introduction to Programming Concepts',
        'Basic Scratch Programming',
        'Simple Game Development',
        'Digital Storytelling',
        'Basic Web Development'
      ]
    },
    {
      level: 'Intermediate',
      topics: [
        'Python Programming',
        'Web Development with HTML/CSS/JavaScript',
        'Database Basics',
        'App Development Fundamentals',
        'Problem-Solving Techniques'
      ]
    },
    {
      level: 'Advanced',
      topics: [
        'Advanced Python Projects',
        'Full-Stack Web Development',
        'Mobile App Development',
        'Data Science Introduction',
        'Artificial Intelligence Basics'
      ]
    }
  ],
  outcomes: [
    'Enhanced programming skills',
    'Improved problem-solving abilities',
    'Better digital literacy',
    'Increased confidence in technology',
    'Teacher capacity building',
    'Sustainable coding education',
    'School community engagement'
  ],
  testimonials: [
    {
      name: 'Mr. Kwame Mensah',
      role: 'Teacher',
      quote: 'The After School Code Clubs program has transformed how we teach technology in our school. The training provided was comprehensive, and the ongoing support has been invaluable.'
    },
    {
      name: 'Ama Sarpong',
      role: 'Student',
      quote: 'I love our coding club! We get to work on fun projects and learn new things every week. It\'s helped me understand computers better and I\'ve even started creating my own games.'
    },
    {
      name: 'Mrs. Grace Owusu',
      role: 'School Principal',
      quote: 'The program has brought a new energy to our school. Students are more engaged, and we\'ve seen improved performance in related subjects. The teacher training component ensures long-term sustainability.'
    }
  ]
};

export default function AfterSchoolCodeClubsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={programDetails.image}
            alt="After School Code Clubs"
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
              <Link href="/contact" className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                Contact Us
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
                <h2 className={`text-3xl font-bold mb-6 ${delius.className}`}>Curriculum Overview</h2>
                <div className="space-y-8">
                  {programDetails.curriculum.map((level, index) => (
                    <div key={index} className="bg-red-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{level.level} Level</h3>
                      <ul className="space-y-3">
                        {level.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-gray-600">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
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
                <h3 className={`text-2xl font-bold mb-6 ${delius.className}`}>Ready to Start?</h3>
                <p className="text-gray-600 mb-6">
                  Bring coding education to your school. Contact us to learn how to establish an After School Code Club.
                </p>
                <Link
                  href="/contact"
                  className="block w-full bg-red-500 text-white text-center px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition-colors"
                >
                  Contact Us
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
            <h2 className={`text-3xl font-bold mb-4 ${delius.className}`}>What Schools Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${delius.className}`}>Transform Your School's Tech Education</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join the growing network of schools offering quality coding education through our After School Code Clubs program.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-white text-red-500 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                Contact Us
              </Link>
              <Link href="/signup" className="bg-gray-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors">
                Register Your School
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 