'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Delius } from 'next/font/google';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const registrationOptions = [
  {
    title: "I'm a Teacher",
    description: "Register as a teacher attending the Unplugged Coding & AI Workbook Launch. Get access to innovative teaching resources and methodologies.",
    href: '/workbook-launch/teachers',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: 'from-red-500 to-red-600',
    bgLight: 'bg-red-50',
    textColor: 'text-red-600',
    borderColor: 'border-red-200',
    hoverBorder: 'hover:border-red-400',
  },
  {
    title: "I'm a School / Institution",
    description: "Sign up your school or learning centre to access our Unplugged Coding & AI Workbooks and integrate them into your curriculum.",
    href: '/workbook-launch/schools',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'from-blue-500 to-blue-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    hoverBorder: 'hover:border-blue-400',
  },
  {
    title: "I'm a Partner / Sponsor",
    description: "Interested in partnering with or sponsoring Ghana Code Club? Let us know how you'd like to support coding education in Ghana.",
    href: '/workbook-launch/partners',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'from-green-500 to-green-600',
    bgLight: 'bg-green-50',
    textColor: 'text-green-600',
    borderColor: 'border-green-200',
    hoverBorder: 'hover:border-green-400',
  },
  {
    title: "I'm a General Attendee",
    description: "Not a teacher, school, or partner? No problem! Register as a general attendee and be part of the workbook launch event.",
    href: '/workbook-launch/attendee',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    color: 'from-purple-500 to-purple-600',
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    hoverBorder: 'hover:border-purple-400',
  },
];

export default function ClientLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-8 md:py-24 overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-red-50/30">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-[0.03]"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-8 -left-8 w-48 h-48 bg-red-200/30 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.3, 1], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 -right-16 w-56 h-56 bg-blue-200/30 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-8 left-1/4 w-40 h-40 bg-green-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center max-w-7xl mx-auto">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 12 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 200, damping: 20 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 rotate-12 flex items-center justify-center relative"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-2xl border-2 border-blue-400/30"
                />
                <svg className="w-8 h-8 text-white -rotate-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Ghana Code Club Event</p>
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 ${delius.className} leading-tight`}>
                  Workbook Launch
                  <span className="block text-blue-600 mt-2">Registration</span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mb-6 rounded-full" />
                <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                  Welcome to the Ghana Code Club Unplugged Coding & AI Workbook Launch. 
                  Please select how you&apos;d like to register for this event.
                </p>
              </motion.div>
            </motion.div>

            {/* Right - Product Image */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center select-none pointer-events-none"
              onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
              onDragStart={(e: React.DragEvent) => e.preventDefault()}
            >
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-blue-100/60 via-white to-red-100/40 rounded-3xl blur-2xl" />
                <Image
                  src="/images/workbook/hero.png"
                  alt="Ghana Code Club Unplugged Coding & AI Learning Kit"
                  width={600}
                  height={400}
                  className="relative z-10 drop-shadow-xl"
                  priority
                  draggable={false}
                />
              </div>
            </motion.div>
          </div>

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ delay: 1, duration: 11, times: [0, 0.07, 0.92, 1] }}
            className="flex flex-col items-center mt-4 md:mt-10 relative z-20"
          >
            <p className="text-sm text-gray-500 font-medium mb-1">Select your registration type below</p>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Registration Options */}
      <section id="register" className="py-20 -mt-12 relative z-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {registrationOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link href={option.href} className="block h-full">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`bg-white rounded-2xl shadow-lg border-2 ${option.borderColor} ${option.hoverBorder} p-8 h-full flex flex-col transition-shadow hover:shadow-2xl relative overflow-hidden group`}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${option.bgLight} rounded-bl-[80px] -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
                    
                    <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center text-white mb-6 relative z-10 shadow-lg`}>
                      {option.icon}
                    </div>

                    <h3 className={`text-2xl font-bold text-gray-900 mb-3 ${delius.className} relative z-10`}>
                      {option.title}
                    </h3>

                    <p className="text-gray-600 mb-6 flex-grow relative z-10 leading-relaxed">
                      {option.description}
                    </p>

                    <div className={`inline-flex items-center ${option.textColor} font-semibold relative z-10 group-hover:gap-3 gap-2 transition-all`}>
                      <span>Register Now</span>
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
