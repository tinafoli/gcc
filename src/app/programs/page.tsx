import { Metadata } from 'next';
import ClientProgramsPage from './client-programs-page';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { delius } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Programs',
  description: 'Explore Ghana Code Club\'s tech education programs for students aged 5-17. From coding basics to advanced app development, our curriculum empowers Ghana\'s youth with digital skills.',
  openGraph: {
    title: 'Programs | Ghana Code Club',
    description: 'Explore Ghana Code Club\'s tech education programs for students aged 5-17. From coding basics to advanced app development, our curriculum empowers Ghana\'s youth with digital skills.',
    images: [
      {
        url: '/images/programs-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Ghana Code Club Programs',
      },
    ],
  },
  alternates: {
    canonical: '/programs',
  },
};

export default function ProgramsPage() {
  return <ClientProgramsPage />;
}

{/* Currently Running Programs Section */}
<section className="py-16 bg-gradient-to-br from-red-50 to-white">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <div className="inline-block">
        <span className="inline-block bg-red-100 text-red-600 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          🔥 Happening Now
        </span>
      </div>
      <h2 className={`text-4xl font-bold text-gray-900 mb-4 ${delius.className}`}>
        Programs in Action
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Join our active programs and start your tech journey today!
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Summer Code Camp Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-red-500 opacity-10"></div>
          <Image
            src="/images/summer-camp.jpg"
            alt="Summer Code Camp"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Enrolling Now
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Summer Code Camp</h3>
          <p className="text-gray-600 mb-4">
            8 weeks of coding, robotics, and fun! Perfect for kids aged 10-16.
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Starting July 2024
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mon-Fri, 9AM - 3PM
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Multiple Locations
            </div>
          </div>
          <div className="mt-6">
            <Link 
              href="/programs/summer-code-camp"
              className="inline-flex items-center justify-center w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors group"
            >
              Learn More
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Holiday Bootcamp Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-blue-500 opacity-10"></div>
          <Image
            src="/images/holiday-bootcamp.jpg"
            alt="Holiday Bootcamp"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Coming Soon
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Holiday Bootcamp</h3>
          <p className="text-gray-600 mb-4">
            Intensive coding bootcamp during school holidays. Build amazing projects!
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              December 2024
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mon-Fri, 9AM - 2PM
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Accra & Kumasi
            </div>
          </div>
          <div className="mt-6">
            <Link 
              href="/programs/holiday-bootcamp"
              className="inline-flex items-center justify-center w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors group"
            >
              Learn More
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Adults in Tech Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-purple-500 opacity-10"></div>
          <Image
            src="/images/adults-tech.jpg"
            alt="Adults in Tech"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Enrolling Now
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className={`text-xl font-bold text-gray-900 mb-2 ${delius.className}`}>Adults in Tech</h3>
          <p className="text-gray-600 mb-4">
            Evening classes for adults looking to transition into tech careers. Learn coding, web development, and more!
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Evening Classes
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Online & In-Person
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Career Support
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link 
              href="/programs/adults-tech"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors group"
            >
              Learn More
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSfMzT8Mxu9iX0oFyMweLIZqPcY3EJ-1yaG6YoZvzGz9UYdt_g/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-white text-red-600 border-2 border-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors group"
            >
              Enrol Now
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Saturday Coding School Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-blue-500 opacity-10"></div>
          <Image
            src="/images/saturday-school.jpg"
            alt="Saturday Coding School"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Enrolling Now
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className={`text-xl font-bold text-gray-900 mb-2 ${delius.className}`}>Saturday Coding School</h3>
          <p className="text-gray-600 mb-4">
            Weekend coding classes for kids and teens. Learn programming, robotics, and digital skills!
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Saturdays, 9AM - 1PM
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Multiple Locations
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Ages 8-16
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link 
              href="/programs/saturday-coding-school"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors group"
            >
              Learn More
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSftXm5Upf3eI2-LLv9n33fJDQLeYhfVlcEZl64UdGMz6XQJ8Q/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-white text-red-600 border-2 border-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors group"
            >
              Apply Now
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section> 