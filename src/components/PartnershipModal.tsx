'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Delius } from 'next/font/google';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnershipModal({ isOpen, onClose }: PartnershipModalProps) {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    partnershipType: '',
    interests: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
  const [showButtons, setShowButtons] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check if user has scrolled to bottom
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        // Show buttons when scrolled near the bottom (within 50px)
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
        setShowButtons(isNearBottom);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Check initial state
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      console.log('📤 Submitting partnership inquiry...', formData);
      
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch('/api/partnership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Check if response is ok before parsing JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }
      
      const data = await response.json();

      if (response.ok) {
        console.log('✅ Success! Partnership inquiry submitted:', data);
        
        // Scroll to top to show success message
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }

        setSubmitStatus({
          type: 'success',
          message: data.message || 'Partnership inquiry submitted successfully! We will get back to you soon.',
        });
        setFormData({
          organizationName: '',
          contactName: '',
          email: '',
          phone: '',
          website: '',
          partnershipType: '',
          interests: '',
          message: '',
        });
        
        // Increase timeout to 6 seconds so user can see the message
        setTimeout(() => {
          onClose();
          setSubmitStatus({ type: null, message: '' });
        }, 6000);
      } else {
        // Scroll to top to show error message
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to submit partnership inquiry. Please try again.',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      
      // Scroll to top to show error message
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (error instanceof Error && error.name === 'AbortError') {
        setSubmitStatus({
          type: 'error',
          message: 'Request timed out. Please check your connection and try again.',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: error instanceof Error 
            ? `Network error: ${error.message}. Please check your connection and try again.`
            : 'An error occurred. Please try again later.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          {/* Animated Background Elements - More Modern Design */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Geometric Shapes */}
            {[...Array(20)].map((_, i) => {
              const shapes = ['●', '◆', '▲', '■', '★'];
              return (
                <motion.div
                  key={i}
                  className="absolute text-red-300/10 text-6xl font-mono"
                  initial={{ opacity: 0 }}
                  animate={{
                    y: [0, -150, 0],
                    x: [0, (Math.random() - 0.5) * 100, 0],
                    opacity: [0, 0.2, 0],
                    rotate: [0, 360],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 5,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeInOut',
                  }}
                  style={{
                    left: `${(i * 5) % 100}%`,
                    top: `${(i * 4) % 100}%`,
                  }}
                >
                  {shapes[i % shapes.length]}
                </motion.div>
              );
            })}

            {/* Animated Gradient Orbs */}
            <motion.div
              className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 100, 0],
                y: [0, -100, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/20 via-cyan-500/20 to-red-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.4, 1],
                x: [0, -80, 0],
                y: [0, 80, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Floating Connection Lines */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute h-px bg-gradient-to-r from-transparent via-red-400/20 to-transparent"
                style={{
                  width: `${100 + i * 20}px`,
                  left: `${(i * 8) % 90}%`,
                  top: `${(i * 7) % 90}%`,
                  transform: `rotate(${i * 30}deg)`,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl relative my-8 h-[70vh] overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* Modern Header with Gradient */}
            <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-purple-600 p-6 pb-8 flex-shrink-0">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
              </div>
              
              {/* Floating Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${(i * 12) % 100}%`,
                    top: `${(i * 15) % 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}

              <div className="relative z-10">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Header Content */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mx-auto mb-4 shadow-xl"
                  >
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </motion.div>
                  <h2 className={`text-2xl font-bold text-white mb-2 ${delius.className}`}>
                    Become a Partner
                  </h2>
                  <p className="text-white/90 text-sm">
                    Let's create lasting impact together
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Content Container with Scroll - Form Fields Only */}
            <div className="relative z-10 flex flex-col flex-1 min-h-0">
              <div 
                ref={scrollContainerRef}
                className="p-6 overflow-y-auto flex-1"
              >
                {/* Status Message - Enhanced with better visibility - Always at top */}
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`mb-6 p-5 rounded-xl border-l-4 shadow-xl sticky top-0 z-20 ${
                      submitStatus.type === 'success'
                        ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-500'
                        : 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-500'
                    }`}
                  >
                    <div className="flex items-start">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                          submitStatus.type === 'success' ? 'bg-green-100' : 'bg-red-100'
                        }`}
                      >
                        {submitStatus.type === 'success' ? (
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </motion.div>
                      <div className="flex-1">
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="font-semibold text-base leading-relaxed"
                        >
                          {submitStatus.message}
                        </motion.p>
                        {submitStatus.type === 'success' && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-sm mt-2 text-green-700"
                          >
                            You will also receive a confirmation email shortly.
                          </motion.p>
                        )}
                      </div>
                    </div>
                    {submitStatus.type === 'success' && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-4 h-1 bg-green-200 rounded-full overflow-hidden"
                      >
                        <motion.div
                          initial={{ width: "100%" }}
                          animate={{ width: "0%" }}
                          transition={{ delay: 0.9, duration: 2.5, ease: "linear" }}
                          className="h-full bg-green-500"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Form */}
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  id="partnership-form"
                >
                {/* Organization Name */}
                <div>
                  <label htmlFor="organizationName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your organization name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Contact Name */}
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                {/* Partnership Type */}
                <div>
                  <label htmlFor="partnershipType" className="block text-sm font-semibold text-gray-700 mb-2">
                    Partnership Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  >
                    <option value="">Select partnership type</option>
                    <option value="Corporate Sponsor">Corporate Sponsor</option>
                    <option value="Technology Partner">Technology Partner</option>
                    <option value="Educational Partner">Educational Partner</option>
                    <option value="Community Partner">Community Partner</option>
                    <option value="Strategic Partner">Strategic Partner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Areas of Interest */}
                <div>
                  <label htmlFor="interests" className="block text-sm font-semibold text-gray-700 mb-2">
                    Areas of Interest
                  </label>
                  <input
                    type="text"
                    id="interests"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="e.g., STEM education, youth development, technology infrastructure"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tell us about your partnership vision <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                    placeholder="Share your vision for partnership and how we can collaborate..."
                  />
                </div>

                </motion.form>
              </div>

              {/* Fixed Submit Buttons at Bottom - Only show when scrolled to bottom */}
              <AnimatePresence>
                {showButtons && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-200 bg-white p-5 flex gap-4 flex-shrink-0"
                  >
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="partnership-form"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Partnership Inquiry
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Decorative Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

