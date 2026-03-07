'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Delius } from 'next/font/google';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  occupation: string;
  organization: string;
  heardAbout: string;
  interest: string;
  message: string;
}

export default function ClientAttendeeForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    occupation: '',
    organization: '',
    heardAbout: '',
    interest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToast(null);

    try {
      const res = await fetch('/api/event/attendee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ type: 'success', message: 'Registration successful! We look forward to seeing you at the event.' });
        setFormData({ fullName: '', email: '', phone: '', occupation: '', organization: '', heardAbout: '', interest: '', message: '' });
      } else {
        setToast({ type: 'error', message: data.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setToast({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors text-gray-900 placeholder-gray-400 bg-white";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-4 right-4 z-50"
          >
            <div className={`${toast.type === 'success' ? 'bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500' : 'bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500'} p-4 rounded-lg shadow-lg max-w-md backdrop-blur-sm`}>
              <div className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                  className="flex-shrink-0"
                >
                  <div className={`w-10 h-10 ${toast.type === 'success' ? 'bg-purple-100' : 'bg-red-100'} rounded-full flex items-center justify-center`}>
                    {toast.type === 'success' ? (
                      <svg className="h-6 w-6 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </motion.div>
                <div className="ml-3">
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`text-sm font-medium ${toast.type === 'success' ? 'text-purple-800' : 'text-red-800'}`}
                  >
                    {toast.message}
                  </motion.p>
                </div>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className={`mt-2 h-1 ${toast.type === 'success' ? 'bg-purple-200' : 'bg-red-200'} rounded-full overflow-hidden`}
              >
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ delay: 0.8, duration: 4, ease: "linear" }}
                  className={`h-full ${toast.type === 'success' ? 'bg-purple-500' : 'bg-red-500'}`}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-5"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Link href="/workbook-launch" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Registration Options
            </Link>
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4 ${delius.className}`}>General Attendee</h1>
            <p className="text-white/90 text-lg">Please fill in your details below to complete your registration.</p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className={labelClass}>Full Name *</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required className={inputClass} placeholder="e.g. Kwesi Adjei" />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone Number *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} placeholder="e.g. 0244 123 456" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>Email Address *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="e.g. kwesi@email.com" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="occupation" className={labelClass}>Occupation / Profession</label>
                    <input type="text" id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} className={inputClass} placeholder="e.g. Software Developer" />
                  </div>
                  <div>
                    <label htmlFor="organization" className={labelClass}>Organization (if any)</label>
                    <input type="text" id="organization" name="organization" value={formData.organization} onChange={handleChange} className={inputClass} placeholder="e.g. Tech Hub Ghana" />
                  </div>
                </div>

                <div>
                  <label htmlFor="heardAbout" className={labelClass}>How Did You Hear About This Event?</label>
                  <select id="heardAbout" name="heardAbout" value={formData.heardAbout} onChange={handleChange} className={inputClass}>
                    <option value="">Select...</option>
                    <option value="social-media">Social Media</option>
                    <option value="friend-family">Friend / Family</option>
                    <option value="website">Ghana Code Club Website</option>
                    <option value="whatsapp">WhatsApp Group</option>
                    <option value="flyer-poster">Flyer / Poster</option>
                    <option value="news">News / Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="interest" className={labelClass}>What Interests You Most About This Event?</label>
                  <select id="interest" name="interest" value={formData.interest} onChange={handleChange} className={inputClass}>
                    <option value="">Select...</option>
                    <option value="workbooks">The Unplugged Coding Workbooks</option>
                    <option value="ai-education">AI Education for Kids</option>
                    <option value="volunteering">Volunteering Opportunities</option>
                    <option value="networking">Networking</option>
                    <option value="general">General Interest in Coding Education</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Anything You&apos;d Like Us to Know?</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={3} className={inputClass} placeholder="Optional message..." />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white py-3.5 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
