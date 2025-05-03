'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiDownload, FiMail, FiCheck, FiFile } from 'react-icons/fi';
import { Delius, Nunito } from 'next/font/google';
import { useState } from 'react';

const delius = Delius({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

const impactStats = [
  {
    number: '1,500,000',
    label: 'kids across Ghana trained',
    icon: '👨‍👩‍👧‍👦'
  },
  {
    number: '25,000',
    label: 'teachers trained',
    icon: '👩‍🏫'
  },
  {
    number: '750',
    label: 'schools and centers',
    icon: '🏫'
  },
  {
    number: '300',
    label: 'mentors have volunteered',
    icon: '🤝'
  },
  {
    number: '15',
    label: 'regions covered',
    icon: '🗺️'
  },
  {
    number: '50',
    label: 'community centers established',
    icon: '🏛️'
  }
];

const waveSteps = [
  {
    step: 1,
    title: 'Download the Wave app',
    description: 'Download the Wave app for your Apple or Android device.',
    icon: <FiDownload className="w-6 h-6" />
  },
  {
    step: 2,
    title: 'Setup an account',
    description: 'Setup an account through the app—they will need your name, address, contact details, and other details.',
    icon: <FiCheck className="w-6 h-6" />
  },
  {
    step: 3,
    title: 'Send money to Beneficiary',
    description: 'Send money to Beneficiary Name: Ernestina Foli, Phone Number: 0244670660',
    icon: <FiCheck className="w-6 h-6" />
  },
  {
    step: 4,
    title: 'Enter amount and pay',
    description: 'Enter the amount you want to send and pay for the transfer',
    icon: <FiCheck className="w-6 h-6" />
  },
  {
    step: 5,
    title: 'Email for receipt',
    description: 'Email us immediately you make a transfer for a receipt: tinaappiah@ghanacodeclub.org',
    icon: <FiMail className="w-6 h-6" />
  }
];

export default function ClientDonatePage() {
  const [showPdfViewer, setShowPdfViewer] = useState<'2022' | '2023' | null>(null);

  return (
    <div className="min-h-screen">
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden bg-gradient-to-r from-red-600 to-red-700">
          {/* Background Image and Overlay */}
          <div className="absolute inset-0">
            <Image
              src="/images/donate-hero.jpg"
              alt="Donate Background"
              fill
              className="object-cover scale-105 motion-safe:animate-subtle-zoom"
              priority
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 via-red-600/75 to-red-700/85"></div>
            
            {/* Animated Pattern Overlay */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-5"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"
              ></motion.div>
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, -5, 5, 0],
                  y: [0, 10, 0],
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-1/2 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"
              ></motion.div>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 3, -3, 0],
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute bottom-0 left-1/3 w-28 h-28 bg-white/10 rounded-full blur-2xl"
              ></motion.div>
            </div>

            {/* Animated Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
              key="hero-content"
            >
              {/* Decorative Elements */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 12 }}
                  transition={{ 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className="w-24 h-24 bg-gradient-to-br from-white to-white/90 backdrop-blur-sm rounded-2xl mb-8 rotate-12 flex items-center justify-center relative group mx-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-2xl border-2 border-white/30"
                  ></motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <svg className="w-12 h-12 text-red-600 -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                </motion.div>

                {/* Floating Hearts */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8"
                  animate={{ 
                    y: [0, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-full h-full text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.div>
              </div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <h1 className={`text-6xl md:text-7xl font-bold mb-6 text-white ${delius.className} leading-tight relative inline-block`}>
                DONATE GENEROUSLY
                  <div className="absolute -bottom-2 left-0 w-full h-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-white"></div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white via-red-600 to-white"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                  <motion.div
                    className="absolute -right-4 -top-4 w-8 h-8"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="absolute inset-0 animate-ping-slow">
                      <div className="w-2 h-2 bg-white rounded-full transform rotate-45"></div>
                    </div>
                  </motion.div>
              </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed ${nunito.className}`}
              >
                Ghana Code Club's mission is to ensure that every Ghanaian child in elementary school is equipped with digital skills for future development.
              </motion.p>

              {/* Call to Action Box */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <h2 className={`text-2xl font-bold text-white mb-4 relative z-10 ${delius.className}`}>
                  HELP EXPOSE MORE CHILDREN TO COMPUTER SCIENCE!
                </h2>
                  <p className={`text-white/90 relative z-10 ${nunito.className}`}>
                  Thank you for supporting our learners by making a gift to Ghana Code Club
                </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute top-0 left-0 w-full h-full border-l-2 border-t-2 border-white/20 rounded-tl-3xl"
            ></motion.div>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-0 right-0 w-full h-full border-r-2 border-b-2 border-white/20 rounded-br-3xl"
            ></motion.div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="our-impact" className="py-20 bg-white scroll-mt-16">
          <div className="container mx-auto px-4">
            <h2 className={`text-3xl font-bold text-gray-900 mb-4 text-center ${delius.className}`}>
              Our Impact
            </h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16">
              Support us to be there for the less fortunate especially the deprived girl child every time. Donate a gift today to ensure that girls and boys continue to have access to our educational experiences and STEM activities.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">120,000+</div>
                <div className="text-gray-600">Kids Trained</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">3,500+</div>
                <div className="text-gray-600">Teachers Trained</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">324+</div>
                <div className="text-gray-600">Mentors Volunteered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">19+</div>
                <div className="text-gray-600">Centers & Clubs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">7+</div>
                <div className="text-gray-600">Regions Covered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">10+</div>
                <div className="text-gray-600">Years of Impact</div>
              </div>
            </div>
          </div>
        </section>

        {/* Report Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
              key="report-heading"
            >
              <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${delius.className}`}>
                Our Impact Reports
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore our annual impact reports to see how your support has helped us make a difference in the lives of Ghanaian youth.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 2022 Report */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="bg-red-50 rounded-xl p-8 text-center"
              >
                <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>
                  2022 Impact Report
                </h3>
              <button 
                  onClick={() => setShowPdfViewer('2022')} 
                className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                <FiFile className="mr-2" />
                  View 2022 Report
                </button>
              </motion.div>

              {/* 2023 Report */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="bg-red-50 rounded-xl p-8 text-center"
              >
                <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>
                  2023 Impact Report
                </h3>
                <button 
                  onClick={() => setShowPdfViewer('2023')} 
                  className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <FiFile className="mr-2" />
                  View 2023 Report
              </button>
              </motion.div>
            </div>
              
              {showPdfViewer && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowPdfViewer(null)}>
                  <div className="bg-white rounded-lg w-full max-w-sm p-8 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold">Annual Report {showPdfViewer}</h3>
                      <button 
                        onClick={() => setShowPdfViewer(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      <p className="text-lg">Would you like to view our {showPdfViewer} Annual Impact Report?</p>
                      
                      <div className="flex flex-col gap-4">
                        <a
                          href={`/reports/gcc-annual-impact-report-${showPdfViewer}.pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Open Report
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </section>

        {/* Wave App Instructions */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
              key="wave-heading"
            >
              <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${delius.className}`}>
                WAYS TO SEND FUNDS FROM USA/UK/CANADA
              </h2>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                HOW THE WAVE APP WORKS
              </h3>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {waveSteps.map((step, index) => (
                <motion.div
                  key={`step-${step.step}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start mb-8 bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-4">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold text-gray-900 mb-2 ${delius.className}`}>
                      Step {step.step}: {step.title}
                    </h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              key="cta-content"
            >
              <h2 className={`text-3xl font-bold text-white mb-6 ${delius.className}`}>
                Make a Difference Today
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Your donation helps us provide quality computer science education to children across Ghana.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="mailto:tinaappiah@ghanacodeclub.org" 
                  className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </Link>
                <Link 
                  href="/about" 
                  className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
} 