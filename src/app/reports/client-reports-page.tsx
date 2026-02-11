'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiDownload, FiFile, FiArrowLeft } from 'react-icons/fi';
import { Delius } from 'next/font/google';
import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';

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
      'Reached milestone of 1.5M+ students trained',
      'Expanded teacher training programs',
      'Increased community engagement',
      'Enhanced program offerings'
    ]
  }
];

function PdfPreview({ pdfUrl, year }: { pdfUrl: string; year: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pdfLib, setPdfLib] = useState<{ Document: React.ComponentType<any>; Page: React.ComponentType<any> } | null>(null);

  useEffect(() => {
    // Dynamically import react-pdf only on client side
    import('react-pdf').then((mod) => {
      mod.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
      setPdfLib({ Document: mod.Document, Page: mod.Page });
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
  }, []);

  const onDocumentLoadSuccess = useCallback(() => {
    setLoading(false);
  }, []);

  const onDocumentLoadError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  return (
    <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-t-xl overflow-hidden">
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-3 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Loading preview...</p>
          </div>
        </div>
      )}
      {error || !pdfLib ? (
        !pdfLib && !error ? null : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
            <div className="text-center p-4">
              <FiFile className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <p className="text-lg font-bold text-gray-800">{year} Report</p>
              <p className="text-sm text-gray-500 mt-1">Click to view</p>
            </div>
          </div>
        )
      ) : (
        <pdfLib.Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
        >
          <pdfLib.Page
            pageNumber={1}
            width={400}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </pdfLib.Document>
      )}
    </div>
  );
}

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
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Link 
              href="/donate"
              className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Donate
            </Link>
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${delius.className}`}>
              Our Impact Reports
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Explore our annual impact reports to see how your support has helped us make a difference in the lives of Ghanaian youth across Ghana.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-16" itemScope itemType="https://schema.org/ItemList">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {impactReports.map((report, index) => (
              <article
                key={report.year}
                itemScope
                itemType="https://schema.org/Report"
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* PDF Preview */}
                  <a
                    href={report.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative cursor-pointer"
                  >
                    <PdfPreview pdfUrl={report.pdfUrl} year={report.year} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                        <FiFile className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                        {report.year}
                      </span>
                    </div>
                  </a>

                  {/* Content */}
                  <div className="p-6">
                    <h2 itemProp="name" className={`text-xl font-bold text-gray-900 mb-2 ${delius.className}`}>
                      {report.title}
                    </h2>
                    <meta itemProp="datePublished" content={report.datePublished} />
                    <p itemProp="description" className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {report.description}
                    </p>

                    <div className="mb-4">
                      <ul className="space-y-1">
                        {report.highlights.slice(0, 3).map((highlight, i) => (
                          <li key={i} className="flex items-start text-xs text-gray-600">
                            <span className="text-red-600 mr-1.5 mt-0.5">&#x2022;</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={report.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        itemProp="url"
                        className="flex-1 inline-flex items-center justify-center bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm"
                        aria-label={`Download ${report.title} PDF`}
                      >
                        <FiDownload className="mr-1.5 w-4 h-4" />
                        Download
                      </a>
                      <button 
                        onClick={() => setShowPdfViewer(report.year)} 
                        className="flex-1 inline-flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm"
                        aria-label={`View ${report.title}`}
                      >
                        <FiFile className="mr-1.5 w-4 h-4" />
                        View
                      </button>
                    </div>
                  </div>
                </motion.div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {showPdfViewer && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" 
          onClick={() => setShowPdfViewer(null)}
        >
          <div 
            className="bg-white rounded-lg w-full max-w-md p-8 text-center" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Annual Report {showPdfViewer}</h3>
              <button 
                onClick={() => setShowPdfViewer(null)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
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

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${delius.className}`}>
              Support Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Your support helps us continue making a difference. Consider donating to help us reach more students across Ghana.
            </p>
            <Link 
              href="/donate"
              className="inline-flex items-center bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Donate Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
