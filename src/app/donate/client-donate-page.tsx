'use client';

import { motion, AnimatePresence } from 'framer-motion';
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


export default function ClientDonatePage() {
  const [showPdfViewer, setShowPdfViewer] = useState<'2022' | '2023' | null>(null);
  const [showRedirectNotification, setShowRedirectNotification] = useState(false);

  // Structured data for SEO - Impact Reports
  const impactReportsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ghana Code Club Impact Reports',
    description: 'Annual impact reports showcasing Ghana Code Club\'s achievements in providing tech education to Ghanaian youth.',
    url: 'https://ghanacodeclub.org/donate#impact-reports',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Report',
          name: '2023 Annual Impact Report',
          description: 'Ghana Code Club\'s 2023 annual impact report detailing our achievements in training students, teachers, and expanding our reach across Ghana.',
          datePublished: '2023-12-31',
          url: 'https://ghanacodeclub.org/reports/gcc-annual-impact-report-2023.pdf',
          publisher: {
            '@type': 'Organization',
            name: 'Ghana Code Club'
          }
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Report',
          name: '2022 Annual Impact Report',
          description: 'Ghana Code Club\'s 2022 annual impact report showcasing our progress in providing coding education across Ghana.',
          datePublished: '2022-12-31',
          url: 'https://ghanacodeclub.org/reports/gcc-annual-impact-report-2022.pdf',
          publisher: {
            '@type': 'Organization',
            name: 'Ghana Code Club'
          }
        }
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(impactReportsJsonLd) }}
      />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden bg-gradient-to-r from-red-600 to-red-700">
          {/* Background Image and Overlay */}
          <div className="absolute inset-0">
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
              {[...Array(20)].map((_, i) => {
                // Use fixed positions based on index to ensure consistency between server and client
                const left = `${(i * 5) % 100}%`;
                const top = `${(i * 7) % 100}%`;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full"
                    style={{
                      left,
                      top,
                    }}
                    animate={{
                      y: [0, -100],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + (i % 2),
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                );
              })}
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
                  EQUIP YOUNG MINDS
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
                Help us provide essential learning kits to young learners across Ghana, empowering them with the tools they need to succeed in technology education.
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
                    Join our fundraiser to help equip young learners with essential kits!
                  </h2>
                  <motion.button
                    onClick={() => setShowRedirectNotification(true)}
                    className="group inline-flex items-center bg-white hover:bg-gray-50 text-red-600 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center mr-3">$</span>
                        <span>Click Here to Support Ghana Code Club</span>
                      </span>
                      <svg 
                        className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300 ml-3" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-red-100 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.button>
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
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.h2 
                className={`text-3xl font-bold text-gray-900 mb-4 ${delius.className}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Our Impact
              </motion.h2>
              <motion.p 
                className="text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Support us to be there for the less fortunate especially the deprived girl child every time. Donate a gift today to ensure that girls and boys continue to have access to our educational experiences and STEM activities.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
              {[
                { number: '131,000+', label: 'Kids Trained' },
                { number: '7,000+', label: 'Teachers Trained' },
                { number: '324+', label: 'Mentors Volunteered' },
                { number: '22+', label: 'Digital Learning Centers' },
                { number: '30,000+', label: 'Girls Trained (100 Girls in STEM)' },
                { number: '100+', label: 'Women / Adults Trained' },
                { number: '8+', label: 'Regions Covered' },
                { number: '10+', label: 'Years of Impact' },
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="text-4xl font-bold text-red-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Report Section */}
        <section id="impact-reports" className="py-16" itemScope itemType="https://schema.org/ItemList">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center mb-12"
              key="report-heading"
            >
              <motion.h2 
                className={`text-3xl font-bold text-gray-900 mb-4 ${delius.className}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Our Impact Reports
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 max-w-3xl mx-auto mb-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Explore our annual impact reports to see how your support has helped us make a difference in the lives of Ghanaian youth.
              </motion.p>
              <Link 
                href="/reports"
                className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold transition-colors"
              >
                View All Reports
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 2022 Report */}
              <article
                itemScope
                itemType="https://schema.org/Report"
                className="bg-red-50 rounded-xl p-8 text-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <h3 itemProp="name" className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>
                    2022 Impact Report
                  </h3>
                  <meta itemProp="datePublished" content="2022-12-31" />
                  <meta itemProp="description" content="Ghana Code Club's 2022 annual impact report showcasing our progress in providing coding education across Ghana." />
                  <div className="flex flex-col gap-3">
                    <a
                      href="/reports/gcc-annual-impact-report-2022.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      itemProp="url"
                      className="inline-flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                      aria-label="Download 2022 Annual Impact Report PDF"
                    >
                      <FiDownload className="mr-2" />
                      Download 2022 Report
                    </a>
                    <button 
                      onClick={() => setShowPdfViewer('2022')} 
                      className="inline-flex items-center justify-center bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
                      aria-label="View 2022 Annual Impact Report"
                    >
                      <FiFile className="mr-2" />
                      View 2022 Report
                    </button>
                  </div>
                </motion.div>
              </article>

              {/* 2023 Report */}
              <article
                itemScope
                itemType="https://schema.org/Report"
                className="bg-red-50 rounded-xl p-8 text-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <h3 itemProp="name" className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>
                    2023 Impact Report
                  </h3>
                  <meta itemProp="datePublished" content="2023-12-31" />
                  <meta itemProp="description" content="Ghana Code Club's 2023 annual impact report detailing our achievements in training students, teachers, and expanding our reach across Ghana." />
                  <div className="flex flex-col gap-3">
                    <a
                      href="/reports/gcc-annual-impact-report-2023.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      itemProp="url"
                      className="inline-flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                      aria-label="Download 2023 Annual Impact Report PDF"
                    >
                      <FiDownload className="mr-2" />
                      Download 2023 Report
                    </a>
                    <button 
                      onClick={() => setShowPdfViewer('2023')} 
                      className="inline-flex items-center justify-center bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
                      aria-label="View 2023 Annual Impact Report"
                    >
                      <FiFile className="mr-2" />
                      View 2023 Report
                    </button>
                  </div>
                </motion.div>
              </article>
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

        {/* Redirect Notification Modal */}
        <AnimatePresence>
          {showRedirectNotification && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowRedirectNotification(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-50 rounded-full -ml-12 -mb-12 opacity-50"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-2xl font-bold text-gray-900 mb-4 text-center ${delius.className}`}>
                  Secure Payment Redirect
                </h3>

                {/* Message */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  You are being redirected to <strong className="text-red-600">Stripe</strong>, our secure payment partner, to complete your donation.
                </p>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-700 font-semibold mb-1">Your payment is secure</p>
                      <p className="text-xs text-gray-600">
                        Stripe is a trusted, PCI-compliant payment processor used by millions of organizations worldwide.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowRedirectNotification(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      window.open('https://donate.stripe.com/5kAfZf1WLgXqdR6144', '_blank', 'noopener,noreferrer');
                      setShowRedirectNotification(false);
                    }}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <span>Continue to Stripe</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              key="cta-content"
            >
              <motion.h2 
                className={`text-3xl font-bold text-white mb-6 ${delius.className}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Make a Difference Today
              </motion.h2>
              <motion.p 
                className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Your donation helps us provide quality computer science education to children across Ghana.
              </motion.p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="mailto:tinaappiah@ghanacodeclub.org" 
                    className="block bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Contact Us
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.65 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/about" 
                    className="block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
} 