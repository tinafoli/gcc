'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Delius } from 'next/font/google';
import SearchableSelect from '@/components/SearchableSelect';

const ghanaRegions = [
  { value: 'Greater Accra Region', label: 'Greater Accra Region' },
  { value: 'Ashanti Region', label: 'Ashanti Region' },
  { value: 'Western Region', label: 'Western Region' },
  { value: 'Western North Region', label: 'Western North Region' },
  { value: 'Central Region', label: 'Central Region' },
  { value: 'Eastern Region', label: 'Eastern Region' },
  { value: 'Volta Region', label: 'Volta Region' },
  { value: 'Oti Region', label: 'Oti Region' },
  { value: 'Northern Region', label: 'Northern Region' },
  { value: 'Savannah Region', label: 'Savannah Region' },
  { value: 'North East Region', label: 'North East Region' },
  { value: 'Upper East Region', label: 'Upper East Region' },
  { value: 'Upper West Region', label: 'Upper West Region' },
  { value: 'Bono Region', label: 'Bono Region' },
  { value: 'Bono East Region', label: 'Bono East Region' },
  { value: 'Ahafo Region', label: 'Ahafo Region' },
  { value: 'International', label: 'International (Outside Ghana)' },
];

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  region: string;
  city: string;
  address: string;
  workbookType: string;
  quantity: string;
  purpose: string;
  message: string;
}

export default function ClientOrderForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    region: '',
    city: '',
    address: '',
    workbookType: '',
    quantity: '1',
    purpose: '',
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
      const res = await fetch('/api/event/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ type: 'success', message: 'Order submitted! Our team will contact you shortly to confirm your order and arrange delivery.' });
        setFormData({ fullName: '', email: '', phone: '', organization: '', region: '', city: '', address: '', workbookType: '', quantity: '1', purpose: '', message: '' });
      } else {
        setToast({ type: 'error', message: data.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setToast({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900 placeholder-gray-400 bg-white";
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
            <div className={`${toast.type === 'success' ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400' : 'bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500'} p-4 rounded-lg shadow-lg max-w-md backdrop-blur-sm`}>
              <div className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                  className="flex-shrink-0"
                >
                  <div className={`w-10 h-10 ${toast.type === 'success' ? 'bg-blue-100' : 'bg-red-100'} rounded-full flex items-center justify-center`}>
                    {toast.type === 'success' ? (
                      <svg className="h-6 w-6 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
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
                    className={`text-sm font-medium ${toast.type === 'success' ? 'text-blue-800' : 'text-red-800'}`}
                  >
                    {toast.message}
                  </motion.p>
                </div>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className={`mt-2 h-1 ${toast.type === 'success' ? 'bg-blue-200' : 'bg-red-200'} rounded-full overflow-hidden`}
              >
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ delay: 0.8, duration: 4, ease: "linear" }}
                  className={`h-full ${toast.type === 'success' ? 'bg-blue-400' : 'bg-red-500'}`}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-red-50/30">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-[0.03]"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-8 -left-8 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 -right-16 w-56 h-56 bg-red-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Ghana Code Club</p>
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 ${delius.className} leading-tight`}>
                Order Your
                <span className="block text-blue-600 mt-1">Workbook Kit</span>
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mb-4 rounded-full" />
              <p className="text-gray-600 leading-relaxed max-w-lg">
                Get the Unplugged Coding & AI Learning Kit for your classroom, school, or personal use. 
                Fill in the form below and our team will get back to you with pricing and delivery details.
              </p>
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
                  width={500}
                  height={340}
                  className="relative z-10 drop-shadow-xl"
                  priority
                  draggable={false}
                />
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ delay: 1, duration: 11, times: [0, 0.07, 0.92, 1] }}
            className="flex flex-col items-center mt-4 md:mt-10 relative z-20"
          >
            <p className="text-sm text-gray-500 font-medium mb-1">Fill in the order form below</p>
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

      {/* Order Form */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/workbook/form-bg.png')" }}
        />
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Personal Info */}
                <div className="pb-4 border-b border-gray-100">
                  <h3 className={`text-lg font-bold text-gray-900 ${delius.className}`}>Your Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className={labelClass}>Full Name *</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required className={inputClass} placeholder="e.g. Ama Mensah" />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone Number *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} placeholder="e.g. 0244 123 456" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className={labelClass}>Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="e.g. ama@email.com" />
                  </div>
                  <div>
                    <label htmlFor="organization" className={labelClass}>School / Organization (if any)</label>
                    <input type="text" id="organization" name="organization" value={formData.organization} onChange={handleChange} className={inputClass} placeholder="e.g. Kwabenya M/A School" />
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="pb-4 pt-4 border-b border-gray-100">
                  <h3 className={`text-lg font-bold text-gray-900 ${delius.className}`}>Delivery Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="region" className={labelClass}>Region *</label>
                    <SearchableSelect
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={(val) => setFormData(prev => ({ ...prev, region: val }))}
                      options={ghanaRegions}
                      placeholder="Type to search region..."
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className={labelClass}>City / Town *</label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className={inputClass} placeholder="e.g. Accra" />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className={labelClass}>Delivery Address</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className={inputClass} placeholder="e.g. Street name, landmark, GPS address" />
                </div>

                {/* Order Details */}
                <div className="pb-4 pt-4 border-b border-gray-100">
                  <h3 className={`text-lg font-bold text-gray-900 ${delius.className}`}>Order Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="workbookType" className={labelClass}>Workbook Type *</label>
                    <select id="workbookType" name="workbookType" value={formData.workbookType} onChange={handleChange} required className={inputClass}>
                      <option value="">Select...</option>
                      <option value="ai-workbook">Coding & AI Workbook</option>
                      <option value="both">Both (Coding Kit + AI Workbook)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="quantity" className={labelClass}>Quantity *</label>
                    <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required min="1" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="purpose" className={labelClass}>Purpose of Order</label>
                  <select id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} className={inputClass}>
                    <option value="">Select...</option>
                    <option value="personal">Personal Use</option>
                    <option value="classroom">Classroom / Teaching</option>
                    <option value="school-bulk">School Bulk Order</option>
                    <option value="organization">Organization / NGO</option>
                    <option value="gift">Gift</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Additional Notes</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={3} className={inputClass} placeholder="Any special requests or questions about your order..." />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3.5 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? 'Submitting Order...' : 'Submit Order'}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Our team will contact you to confirm pricing and delivery arrangements.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
