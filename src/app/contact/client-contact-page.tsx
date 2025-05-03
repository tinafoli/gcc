'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaLinkedin, FaTwitter, FaYoutube, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { Delius } from 'next/font/google';
import Script from 'next/script';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};

export default function ClientContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Add useEffect for map initialization
  useEffect(() => {
    // Reset map loaded state when component mounts or route changes
    setIsMapLoaded(false);
    
    // Small delay to ensure iframe reloads properly
    const timer = setTimeout(() => {
      const mapIframe = document.querySelector('iframe');
      if (mapIframe) {
        mapIframe.src = mapIframe.src;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once when component mounts

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form with data:', formData);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.status >= 400) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Detailed error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Ghana Code Club Contact Information',
    description: 'Contact information for Ghana Code Club.',
    url: 'https://ghanacodeclub.org/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Ghana Code Club',
      telephone: '+233 244 670 660',
      email: 'tinaappiah@ghanacodeclub.org',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Accra',
        addressCountry: 'GH'
      },
      sameAs: [
        'https://twitter.com/ghanacodeclub',
        'https://facebook.com/ghanacodeclub',
        'https://instagram.com/ghanacodeclub'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Script id="contact-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/contact-hero.jpg"
            alt="Contact Us Background"
            fill
            className="object-cover scale-105 motion-safe:animate-subtle-zoom"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/80 to-gray-900/90"></div>
          
          {/* Animated Pattern Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-blue-500/10"></div>
          </div>

          {/* Animated Particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-2 h-2 bg-red-500 rounded-full animate-float opacity-50"></div>
            <div className="absolute top-20 right-20 w-3 h-3 bg-blue-500 rounded-full animate-float-delayed opacity-30"></div>
            <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-yellow-500 rounded-full animate-float-slow opacity-40"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-500 rounded-full animate-float-delayed opacity-30"></div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-4 -left-4 w-24 h-24 bg-red-500/10 rounded-full blur-2xl"
          ></motion.div>
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
          ></motion.div>
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 3, -3, 0],
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 left-1/3 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl"
          ></motion.div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Decorative Element */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 12 }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 backdrop-blur-sm rounded-2xl mb-8 rotate-12 flex items-center justify-center relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl border-2 border-red-400/30"
              ></motion.div>
              <svg className="w-10 h-10 text-white -rotate-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white font-['Delius'] leading-tight relative inline-block">
                Contact Us
                <div className="absolute -bottom-2 left-0 w-full h-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-500 to-red-500"></div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500 via-white to-red-500"
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
                    <div className="w-2 h-2 bg-red-500 rounded-full transform rotate-45"></div>
                  </div>
                </motion.div>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-200 mb-8 leading-relaxed max-w-3xl"
            >
              Get in touch with us to learn more about our programs or how you can get involved.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-6 items-center"
            >
              <motion.button 
                onClick={() => {
                  const formSection = document.getElementById('contact-form-section');
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative z-10">Send us a Message</span>
                <motion.svg 
                  className="w-5 h-5 ml-2 relative z-10"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </motion.svg>
              </motion.button>
              <motion.a 
                href="#office-location" 
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-300 text-lg font-semibold border border-white/10 hover:border-white/25 shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative z-10">Visit Our Office</span>
                <motion.svg 
                  className="w-5 h-5 ml-2 relative z-10"
                  initial={{ y: 0 }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </motion.svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-0 left-0 w-full h-full border-l-2 border-t-2 border-red-500/20 rounded-tl-3xl"
          ></motion.div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-0 right-0 w-full h-full border-r-2 border-b-2 border-red-500/20 rounded-br-3xl"
          ></motion.div>
        </div>
      </section>

      {/* Find Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Delius']">Find Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Delius']">
              Visit us at our office in Accra
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-[600px] relative w-full">
              <div className={`absolute inset-0 bg-gray-100 flex items-center justify-center z-10 transition-opacity duration-300 ${isMapLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
              </div>
              <iframe
                key={`map-iframe-${Date.now()}`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.1234567890123!2d-0.2309593!3d5.7001187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9f4d6708fa5d%3A0xaa9694dae4587a3!2sGhana%20Code%20Club%20Kwabenya!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsMapLoaded(true)}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form-section" className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${delius.className}`}>Send Us a Message</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions or want to get involved? We'd love to hear from you!
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left side - Contact Info */}
                <div className="bg-gradient-to-br from-red-600 to-red-700 p-8 text-white">
                  <h3 className={`text-2xl font-bold mb-6 ${delius.className}`}>Get in Touch</h3>
                  <p className="mb-8 text-white/90">
                    We're here to help and answer any questions you might have. We look forward to hearing from you!
                  </p>
                  
                  <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-1">Email Us</h4>
                        <a href="mailto:tinaappiah@ghanacodeclub.org" className="text-white/90 hover:text-white">
                        tinaappiah@ghanacodeclub.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-1">Call Us</h4>
                        <a href="tel:+233265270825" className="text-white/90 hover:text-white block">
                        +233 265 270 825
                      </a>
                        <a href="tel:+233244670660" className="text-white/90 hover:text-white">
                        +233 244 670 660
                      </a>
                    </div>
                  </div>

                    <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Working Hours</h4>
                        <div className="space-y-1 text-white/90">
                          <div className="flex justify-between">
                          <span>Monday - Friday:</span>
                          <span>8:00 AM - 5:00 PM</span>
                        </div>
                          <div className="flex justify-between">
                          <span>Saturday:</span>
                          <span>9:00 AM - 2:00 PM</span>
                        </div>
                          <div className="flex justify-between">
                          <span>Sunday:</span>
                          <span>Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                {/* Right side - Contact Form */}
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Enter your name"
                  />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email"
                  />
              </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                      <input
                        type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors text-gray-900 placeholder-gray-500"
                  placeholder="What's this about?"
                />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors text-gray-900 placeholder-gray-500"
                  placeholder="Type your message here..."
                />
                    </div>

                    <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                        className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                    </div>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="fixed top-4 right-4 z-50"
                >
                  <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-4 rounded-lg shadow-lg max-w-md backdrop-blur-sm">
                    <div className="flex items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                        className="flex-shrink-0"
                      >
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </motion.div>
                      <div className="ml-3">
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-sm font-medium text-green-800"
                        >
                          Message sent successfully! We'll get back to you soon.
                        </motion.p>
                      </div>
                    </div>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="mt-2 h-1 bg-green-200 rounded-full overflow-hidden"
                    >
                      <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ delay: 0.8, duration: 4, ease: "linear" }}
                        className="h-full bg-green-500"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="fixed top-4 right-4 z-50"
                >
                  <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-4 rounded-lg shadow-lg max-w-md backdrop-blur-sm">
                    <div className="flex items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                        className="flex-shrink-0"
                      >
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <svg className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </motion.div>
                      <div className="ml-3">
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-sm font-medium text-red-800"
                        >
                          Failed to send message. Please try again later.
                        </motion.p>
                      </div>
                    </div>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="mt-2 h-1 bg-red-200 rounded-full overflow-hidden"
                    >
                      <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ delay: 0.8, duration: 4, ease: "linear" }}
                        className="h-full bg-red-500"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gradient-to-b from-red-500 to-red-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4 font-['Delius']">Connect With Us</h2>
            <p className="text-xl text-white/90 mb-12">
              Follow us on social media to stay updated with our latest news and events.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
              <motion.a
                href="https://www.facebook.com/ghanacodeclub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white/95 backdrop-blur-sm rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1877f2]/10 mb-3 group-hover:bg-[#1877f2]/20">
                  <FaFacebook className="w-6 h-6 text-[#1877f2]" />
                </div>
                <span className="text-sm font-medium text-gray-600">Facebook</span>
              </motion.a>

              <motion.a
                href="https://twitter.com/ghanacodeclub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white/95 backdrop-blur-sm rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/10 mb-3 group-hover:bg-black/20">
                  <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-600">X</span>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/ghanacodeclub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white/95 backdrop-blur-sm rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#e4405f]/10 mb-3 group-hover:bg-[#e4405f]/20">
                  <FaInstagram className="w-6 h-6 text-[#e4405f]" />
                </div>
                <span className="text-sm font-medium text-gray-600">Instagram</span>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/company/ghana-code-club/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white/95 backdrop-blur-sm rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0077b5]/10 mb-3 group-hover:bg-[#0077b5]/20">
                  <FaLinkedin className="w-6 h-6 text-[#0077b5]" />
                </div>
                <span className="text-sm font-medium text-gray-600">LinkedIn</span>
              </motion.a>

              <motion.a
                href="https://www.youtube.com/@Ghanacodeclub/shorts"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white/95 backdrop-blur-sm rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#ff0000]/10 mb-3 group-hover:bg-[#ff0000]/20">
                  <FaYoutube className="w-6 h-6 text-[#ff0000]" />
                </div>
                <span className="text-sm font-medium text-gray-600">YouTube</span>
              </motion.a>

              <motion.a
                href="https://www.tiktok.com/@ghanacodeclub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white/95 backdrop-blur-sm rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/10 mb-3 group-hover:bg-black/20">
                  <FaTiktok className="w-6 h-6 text-black" />
                </div>
                <span className="text-sm font-medium text-gray-600">TikTok</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Delius']">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find quick answers to common questions about our programs and services.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">What age groups do you work with?</h4>
                <p className="text-gray-600">
                  We primarily work with students aged 5-17 years old, offering age-appropriate coding and technology education programs.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">How can schools partner with Ghana Code Club?</h4>
                <p className="text-gray-600">
                  Schools can partner with us by reaching out through our contact form. We offer various partnership models including after-school programs and curriculum integration.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">Do you offer financial assistance or scholarships?</h4>
                <p className="text-gray-600">
                  Yes, we have limited scholarships available for talented students who demonstrate financial need. Please contact us directly to learn about our current scholarship opportunities.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">Can I volunteer as a mentor or teacher?</h4>
                <p className="text-gray-600">
                  Absolutely! We welcome volunteers with technology expertise. Please use our contact form and specify your interest in volunteering, along with your relevant skills and experience.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 transition duration-300 hover:shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">Do you offer virtual programs or only in-person classes?</h4>
                <p className="text-gray-600">
                  We offer both in-person and virtual programs. Our virtual programs allow students to participate from anywhere with a reliable internet connection.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 