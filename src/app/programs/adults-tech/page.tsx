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
  title: "Adults in Tech",
  description: "Digital skills training for adult learners",
  longDescription: `The Adults in Tech program is designed to help adults transition into the technology sector or enhance their existing digital skills. This comprehensive program provides practical training in coding, web development, digital literacy, and artificial intelligence (AI), tailored to the needs of adult learners.

We understand the unique challenges adult learners face when returning to education, which is why our program offers flexible scheduling, personalized learning paths, and career support. Whether you're looking to switch careers, advance in your current role, or simply learn new skills, our program provides the tools and guidance you need to succeed. AI is a core part of the curriculum, ensuring all adult learners are introduced to the latest advancements in artificial intelligence and its applications.`,
  features: [
    'Artificial Intelligence (AI) for adult learners',
    'Flexible learning schedules',
    'Personalized learning paths',
    'Industry-relevant curriculum',
    'Career guidance and support',
    'Portfolio development',
    'Networking opportunities',
    'Job placement assistance',
    'Ongoing mentorship'
  ],
  targetAudience: 'Adults aged 18+',
  duration: '6-month program',
  schedule: 'Flexible scheduling with evening and weekend options',
  image: '/images/adults-tech.jpg',
  curriculum: [
    {
      level: 'Foundation',
      topics: [
        'Digital Literacy Fundamentals',
        'Computer Basics',
        'Internet and Web Navigation',
        'Introduction to Coding',
        'Problem-Solving Skills'
      ]
    },
    {
      level: 'Intermediate',
      topics: [
        'Web Development (HTML, CSS, JavaScript)',
        'Database Management',
        'User Interface Design',
        'Version Control',
        'Project Management'
      ]
    },
    {
      level: 'Advanced',
      topics: [
        'Full-Stack Development',
        'Mobile App Development',
        'Cloud Computing',
        'Cybersecurity Basics',
        'Data Analysis and Visualization'
      ]
    }
  ],
  outcomes: [
    'Practical coding skills',
    'Web development expertise',
    'Problem-solving abilities',
    'Portfolio of projects',
    'Industry connections',
    'Career advancement',
    'Digital literacy',
    'Confidence in technology'
  ],
  testimonials: [
    {
      name: 'Stephenie Aseye King',
      role: 'Program Graduate',
      quote: 'The Adults in Tech program gave me the skills and confidence to transition from my administrative role to a web developer position. The flexible schedule allowed me to balance my studies with work and family commitments.'
    },
    {
      name: 'Kwame Addo',
      role: 'Career Changer',
      quote: 'After 10 years in a non-tech field, I was nervous about starting over. The program\'s structured approach and supportive instructors made the transition smooth. I\'m now working as a junior developer and couldn\'t be happier with my career change.'
    },
    {
      name: 'Amanda kpobi',
      role: 'Business Owner',
      quote: 'As a small business owner, I needed to understand technology better to grow my business. The Adults in Tech program taught me practical skills I use every day, from building a website to managing my business data.'
    }
  ]
};

export default function AdultsTechPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={programDetails.image}
            alt="Adults in Tech Program"
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
                href="https://forms.gle/zuz4y1T5Cv6HeXXp6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Enroll Now
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
                <h2 className={`text-3xl font-bold mb-6 ${delius.className}`}>Curriculum</h2>
                <div className="space-y-6">
                  {programDetails.curriculum.map((level, index) => (
                    <div key={index} className="bg-red-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{level.level}</h3>
                      <ul className="space-y-2">
                        {level.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-8"
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
                <h3 className={`text-2xl font-bold mb-6 ${delius.className}`}>Expected Outcomes</h3>
                <ul className="space-y-3">
                  {programDetails.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-red-50 rounded-xl p-8"
              >
                <h3 className={`text-2xl font-bold mb-6 ${delius.className}`}>Ready to Enroll?</h3>
                <p className="text-gray-600 mb-6">
                  Take the first step towards your tech career. Enroll in our Adults in Tech program today.
                </p>
                <a
                  href="https://forms.gle/zuz4y1T5Cv6HeXXp6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-red-500 text-white text-center px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition-colors"
                >
                  Enroll Now
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
            <h2 className={`text-3xl font-bold mb-4 ${delius.className}`}>Success Stories</h2>
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
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${delius.className}`}>Transform Your Career</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join the Adults in Tech program and take the first step towards a rewarding career in technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://forms.gle/zuz4y1T5Cv6HeXXp6"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-red-500 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Enroll Now
              </a>
              <Link href="/programs" className="bg-gray-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors">
                Explore Other Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 