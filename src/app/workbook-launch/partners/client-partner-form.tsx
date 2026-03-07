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
  organization: string;
  role: string;
  email: string;
  phone: string;
  partnershipType: string;
  supportAreas: string[];
  budget: string;
  message: string;
}

const supportOptions = [
  'Financial Sponsorship',
  'Equipment / Devices',
  'Mentorship / Volunteering',
  'Venue / Space',
  'Workbook Distribution',
  'Media / Publicity',
  'Technical Expertise',
  'Other',
];

export default function ClientPartnerForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    organization: '',
    role: '',
    email: '',
    phone: '',
    partnershipType: '',
    supportAreas: [],
    budget: '',
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

  const handleCheckbox = (area: string) => {
    setFormData(prev => ({
      ...prev,
      supportAreas: prev.supportAreas.includes(area)
        ? prev.supportAreas.filter(a => a !== area)
        : [...prev.supportAreas, area],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToast(null);

    try {
      const res = await fetch('/api/event/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ type: 'success', message: 'Thank you for your interest! Our partnerships team will reach out to you soon.' });
        setFormData({ fullName: '', organization: '', role: '', email: '', phone: '', partnershipType: '', supportAreas: [], budget: '', message: '' });
      } else {
        setToast({ type: 'error', message: data.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setToast({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-gray-900 placeholder-gray-400 bg-white";
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
            <div className={`${toast.type === 'success' ? 'bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500' : 'bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500'} p-4 rounded-lg shadow-lg max-w-md backdrop-blur-sm`}>
              <div className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                  className="flex-shrink-0"
                >
                  <div className={`w-10 h-10 ${toast.type === 'success' ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center`}>
                    {toast.type === 'success' ? (
                      <svg className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
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
                    className={`text-sm font-medium ${toast.type === 'success' ? 'text-green-800' : 'text-red-800'}`}
                  >
                    {toast.message}
                  </motion.p>
                </div>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className={`mt-2 h-1 ${toast.type === 'success' ? 'bg-green-200' : 'bg-red-200'} rounded-full overflow-hidden`}
              >
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ delay: 0.8, duration: 4, ease: "linear" }}
                  className={`h-full ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-green-700 overflow-hidden">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4 ${delius.className}`}>Partner & Sponsor Interest</h1>
            <p className="text-white/90 text-lg">Express your interest in partnering with Ghana Code Club</p>
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
                {/* Personal / Organization Info */}
                <div className="pb-4 border-b border-gray-100">
                  <h3 className={`text-lg font-bold text-gray-900 ${delius.className}`}>Your Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className={labelClass}>Full Name *</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required className={inputClass} placeholder="e.g. Kofi Boateng" />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone Number *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} placeholder="e.g. 0244 123 456" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>Email Address *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="e.g. kofi@company.com" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="organization" className={labelClass}>Organization / Company</label>
                    <input type="text" id="organization" name="organization" value={formData.organization} onChange={handleChange} className={inputClass} placeholder="e.g. Tech Solutions Ltd" />
                  </div>
                  <div>
                    <label htmlFor="role" className={labelClass}>Your Role / Title</label>
                    <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} className={inputClass} placeholder="e.g. CSR Manager" />
                  </div>
                </div>

                {/* Partnership Details */}
                <div className="pb-4 pt-4 border-b border-gray-100">
                  <h3 className={`text-lg font-bold text-gray-900 ${delius.className}`}>Partnership Details</h3>
                </div>

                <div>
                  <label htmlFor="partnershipType" className={labelClass}>Type of Partnership *</label>
                  <select id="partnershipType" name="partnershipType" value={formData.partnershipType} onChange={handleChange} required className={inputClass}>
                    <option value="">Select partnership type...</option>
                    <option value="sponsor">Event Sponsor</option>
                    <option value="partner">Strategic Partner</option>
                    <option value="donor">Donor</option>
                    <option value="corporate">Corporate Partner</option>
                    <option value="ngo">NGO / Foundation Partner</option>
                    <option value="individual">Individual Supporter</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>How Would You Like to Support? (Select all that apply)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                    {supportOptions.map(area => (
                      <label key={area} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-green-50 hover:border-green-300 transition-colors has-[:checked]:bg-green-50 has-[:checked]:border-green-400">
                        <input
                          type="checkbox"
                          checked={formData.supportAreas.includes(area)}
                          onChange={() => handleCheckbox(area)}
                          className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className={labelClass}>Estimated Support Budget (Optional)</label>
                  <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className={inputClass}>
                    <option value="">Prefer not to say</option>
                    <option value="under-5000">Under GHS 5,000</option>
                    <option value="5000-20000">GHS 5,000 – 20,000</option>
                    <option value="20000-50000">GHS 20,000 – 50,000</option>
                    <option value="50000+">GHS 50,000+</option>
                    <option value="in-kind">In-Kind Support Only</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Tell Us More About Your Interest</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className={inputClass} placeholder="Share how you'd like to support Ghana Code Club and what excites you about this initiative..." />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3.5 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Interest'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
