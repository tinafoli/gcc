'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Delius } from 'next/font/google';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface JoinTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinTeamModal({ isOpen, onClose }: JoinTeamModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    motivation: '',
    resume: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);

  // Check if user has scrolled to bottom
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        // Show buttons if scrolled within 50px of the bottom
        if (scrollHeight - scrollTop <= clientHeight + 50) {
          setShowButtons(true);
        } else {
          setShowButtons(false);
        }
      }
    };

    const currentRef = scrollContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
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
      console.log('📤 Submitting application...', formData);
      
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch('/api/team-application', {
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
        console.log('✅ Success! Application submitted:', data);
        
        // Scroll to top to show success message
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }

        setSubmitStatus({
          type: 'success',
          message: data.message || 'Application submitted successfully! We will get back to you soon.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: '',
          experience: '',
          motivation: '',
          resume: '',
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
          message: data.error || 'Failed to submit application. Please try again.',
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </motion.div>
                  <h2 className={`text-2xl font-bold text-white mb-2 ${delius.className}`}>
                    Join Our Team
                  </h2>
                  <p className="text-white/90 text-sm">
                    Help us empower Ghana's youth through coding education
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
                  id="team-application-form"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
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
                        placeholder="+233 XX XXX XXXX"
                      />
                    </div>

                    {/* Role */}
                    <div>
                      <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                        Role/Position <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      >
                        <option value="">Select a role</option>
                        <option value="Instructor/Trainer">Instructor/Trainer</option>
                        <option value="Mentor">Mentor</option>
                        <option value="Program Coordinator">Program Coordinator</option>
                        <option value="Developer">Developer</option>
                        <option value="Content Creator">Content Creator</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                      Experience/Background <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Tell us about your experience, skills, and background..."
                    />
                  </div>

                  {/* Motivation */}
                  <div>
                    <label htmlFor="motivation" className="block text-sm font-semibold text-gray-700 mb-2">
                      Why do you want to join our team? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Share your motivation and what you hope to contribute..."
                    />
                  </div>

                  {/* Resume Link */}
                  <div>
                    <label htmlFor="resume" className="block text-sm font-semibold text-gray-700 mb-2">
                      Resume/CV Link (Optional)
                    </label>
                    <input
                      type="url"
                      id="resume"
                      name="resume"
                      value={formData.resume}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="https://linkedin.com/in/yourprofile or Google Drive link"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      You can share a LinkedIn profile, portfolio, or Google Drive link to your resume
                    </p>
                  </div>
                </motion.form>
              </div>

              {/* Fixed Bottom Section - Buttons */}
              <div className="border-t border-gray-200 bg-white p-6 flex-shrink-0">
                <AnimatePresence>
                  {showButtons && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4"
                    >
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors shadow-md"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        form="team-application-form"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
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
                          'Submit Application'
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Decorative Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-red-500"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
