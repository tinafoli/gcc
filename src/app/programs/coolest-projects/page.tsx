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
  title: "Coolest Projects Ghana",
  description: "Showcasing innovative tech projects from Ghana's young creators",
  longDescription: `Coolest Projects Ghana is an annual showcase event that celebrates the creativity and innovation of young tech enthusiasts across Ghana. This program provides a platform for students to display their coding projects, receive recognition for their work, and connect with like-minded peers and industry professionals.

The event brings together young creators aged 7-17 who have developed innovative solutions using technology. Projects can range from games and animations to hardware inventions and social impact applications. Participants receive valuable feedback from industry experts and have the opportunity to win exciting prizes.`,
  features: [
    'Annual project showcase event',
    'Multiple project categories',
    'Expert judging panel',
    'Networking opportunities',
    'Workshops and demonstrations',
    'Prizes and recognition',
    'Industry connections',
    'Media coverage'
  ],
  targetAudience: 'Students aged 7-17',
  duration: 'Annual event',
  schedule: 'One-day showcase event',
  image: '/images/coolest-projects.jpg',
  categories: [
    {
      name: 'Games',
      description: 'Interactive games and animations created using various programming languages and platforms'
    },
    {
      name: 'Hardware',
      description: 'Physical computing projects using microcontrollers, sensors, and other electronic components'
    },
    {
      name: 'Web',
      description: 'Web applications and websites that solve real-world problems or showcase creativity'
    },
    {
      name: 'Mobile Apps',
      description: 'Mobile applications developed for various platforms and purposes'
    },
    {
      name: 'AI & Machine Learning',
      description: 'Projects utilizing artificial intelligence and machine learning technologies'
    }
  ],
  outcomes: [
    'Project development experience',
    'Public speaking skills',
    'Technical feedback',
    'Industry exposure',
    'Networking opportunities',
    'Recognition and awards',
    'Portfolio development',
    'Community engagement'
  ],
  testimonials: [
    {
      name: 'Elijah Tetteh',
      role: 'Student',
      quote: 'Coolest Projects Ghana gave me the confidence to showcase my work. The feedback from judges helped me improve my project, and I made valuable connections with other young creators.'
    },
    {
      name: 'Abena Osei',
      role: 'Parent',
      quote: 'Seeing my daughter present her project at Coolest Projects was incredibly rewarding. The event not only recognized her hard work but also inspired her to continue innovating.'
    },
    {
      name: 'Ernestina Appiah',
      role: 'Industry Judge',
      quote: 'The creativity and technical skills displayed by these young creators is impressive. Coolest Projects Ghana is doing an excellent job in nurturing the next generation of tech innovators.'
    }
  ]
};

export default function CoolestProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={programDetails.image}
            alt="Coolest Projects Ghana"
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
                href="https://www.coolestprojectsghana.org/enter/submit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Register Your Project
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
                <h2 className={`text-3xl font-bold mb-6 ${delius.className}`}>Project Categories</h2>
                <div className="space-y-6">
                  {programDetails.categories.map((category, index) => (
                    <div key={index} className="bg-red-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-gray-600">{category.description}</p>
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
                <h3 className={`text-2xl font-bold mb-6 ${delius.className}`}>Ready to Participate?</h3>
                <p className="text-gray-600 mb-6">
                  Register your project for the next Coolest Projects Ghana showcase. Don't miss this opportunity to showcase your creativity and innovation.
                </p>
                <a
                  href="https://www.coolestprojectsghana.org/enter/submit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-red-500 text-white text-center px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition-colors"
                >
                  Register Now
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
            <h2 className={`text-3xl font-bold mb-4 ${delius.className}`}>What Participants Say</h2>
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
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${delius.className}`}>Showcase Your Innovation</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join the next Coolest Projects Ghana showcase and let your creativity shine. Register your project today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://www.coolestprojectsghana.org/enter/submit"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-red-500 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Register Your Project
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