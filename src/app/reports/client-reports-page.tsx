'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiDownload, FiFile, FiArrowLeft } from 'react-icons/fi';
import { Delius } from 'next/font/google';
import { useState } from 'react';

const delius = Delius({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const impactReports = [
  {
    year: '2025',
    title: '2025 Annual Impact Report',
    description: 'Ghana Code Club\'s 2025 annual impact report highlighting our continued growth, expanded digital learning centers, and deepened impact across Ghana.',
    datePublished: '2025-12-31',
    pdfUrl: '/reports/gcc-annual-impact-report-2025.pdf',
    highlights: [
      '131,000+ kids trained in coding and digital skills',
      '7,000+ teachers trained across Ghana',
      '22+ digital learning centers established',
      '30,000+ girls trained through 100 Girls in STEM'
    ]
  },
  {
    year: '2023',
    title: '2023 Annual Impact Report',
    description: 'Ghana Code Club\'s 2023 annual impact report detailing our achievements in training students, teachers, and expanding our reach across Ghana.',
    datePublished: '2023-12-31',
    pdfUrl: '/reports/gcc-annual-impact-report-2023.pdf',
    highlights: [
      'Expanded reach to new regions',
      'Trained thousands of students and teachers',
      'Launched new community programs',
      'Strengthened partnerships'
    ]
  },
  {
    year: '2022',
    title: '2022 Annual Impact Report',
    description: 'Ghana Code Club\'s 2022 annual impact report showcasing our progress in providing coding education across Ghana.',
    datePublished: '2022-12-31',
    pdfUrl: '/reports/gcc-annual-impact-report-2022.pdf',
    highlights: [
      'Reached milestone in students trained',
      'Expanded teacher training programs',
      'Increased community engagement',
      'Enhanced program offerings'
    ]
  }
];

export default function ClientReportsPage() {
  const [showPdfViewer, setShowPdfViewer] = useState<string | null>(null);

  // Structured data for SEO
  const impactReportsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ghana Code Club Impact Reports',
    description: 'Annual impact reports showcasing Ghana Code Club\'s achievements in providing tech education to Ghanaian youth.',
    url: 'https://ghanacodeclub.org/reports',
    itemListElement: impactReports.map((report, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Report',
        name: report.title,
        description: report.description,
        datePublished: report.datePublished,
        url: `https://ghanacodeclub.org${report.pdfUrl}`,
        publisher: {
          '@type': 'Organization',
          name: 'Ghana Code Club',
          url: 'https://ghanacodeclub.org'
        }
      }
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(impactReportsJsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], y: [0, 10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link 
                href="/donate"
                className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Back to Donate
              </Link>
            </motion.div>
            <motion.h1 
              className={`text-4xl md:text-5xl font-bold mb-4 ${delius.className}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Our Impact Reports
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Explore our annual impact reports to see how your support has helped us make a difference in the lives of Ghanaian youth across Ghana.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-16" itemScope itemType="https://schema.org/ItemList">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
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
              Annual Reports
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Download and explore our detailed annual impact reports
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {impactReports.map((report, index) => (
              <motion.article
                key={report.year}
                itemScope
                itemType="https://schema.org/Report"
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-8">
                  <div className="mb-6">
                    <motion.span 
                      className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold mb-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.15 }}
                    >
                      {report.year}
                    </motion.span>
                    <h2 itemProp="name" className={`text-2xl font-bold text-gray-900 mb-3 ${delius.className}`}>
                      {report.title}
                    </h2>
                    <meta itemProp="datePublished" content={report.datePublished} />
                    <p itemProp="description" className="text-gray-600 mb-4">
                      {report.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Key Highlights:</h3>
                    <ul className="space-y-2">
                      {report.highlights.map((highlight, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start text-sm text-gray-600"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                        >
                          <span className="text-red-600 mr-2">•</span>
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3">
                    <motion.a
                      href={report.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      itemProp="url"
                      className="inline-flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                      aria-label={`Download ${report.title} PDF`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiDownload className="mr-2" />
                      Download PDF
                    </motion.a>
                    <motion.button 
                      onClick={() => setShowPdfViewer(report.year)} 
                      className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                      aria-label={`View ${report.title}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiFile className="mr-2" />
                      View Online
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {showPdfViewer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" 
            onClick={() => setShowPdfViewer(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl w-full max-w-md p-8 text-center shadow-2xl relative overflow-hidden" 
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-50 rounded-full -ml-12 -mb-12 opacity-50"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-xl font-bold ${delius.className}`}>Annual Report {showPdfViewer}</h3>
                  <button 
                    onClick={() => setShowPdfViewer(null)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <p className="text-lg text-gray-600">Would you like to view our {showPdfViewer} Annual Impact Report?</p>
                  
                  <div className="flex flex-col gap-4">
                    <motion.a
                      href={`/reports/gcc-annual-impact-report-${showPdfViewer}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Open Report
                    </motion.a>
                  </div>
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
          >
            <motion.h2 
              className={`text-3xl font-bold text-white mb-4 ${delius.className}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Support Our Mission
            </motion.h2>
            <motion.p 
              className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Your support helps us continue making a difference. Consider donating to help us reach more students across Ghana.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/donate"
                className="inline-flex items-center bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Donate Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
