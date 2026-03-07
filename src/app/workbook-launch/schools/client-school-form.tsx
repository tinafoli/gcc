'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
];

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface FormData {
  schoolName: string;
  location: string;
  region: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  studentCount: string;
  ictTeacherCount: string;
  hasICTLab: string;
  interests: string[];
  additionalInfo: string;
}

const interestOptions = [
  'Unplugged Coding Workbooks',
  'AI Education Workbooks',
  'After-School Code Clubs',
  'Teacher Training',
  'School Integration Program',
  'Equipment/Device Support',
];

export default function ClientSchoolForm() {
  const [formData, setFormData] = useState<FormData>({
    schoolName: '',
    location: '',
    region: '',
    contactName: '',
    contactRole: '',
    contactEmail: '',
    contactPhone: '',
    studentCount: '',
    ictTeacherCount: '',
    hasICTLab: '',
    interests: [],
    additionalInfo: '',
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

  const handleCheckbox = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToast(null);

    try {
      const res = await fetch('/api/event/school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ type: 'success', message: 'School registration successful! We will be in touch with more details.' });
        setFormData({ schoolName: '', location: '', region: '', contactName: '', contactRole: '', contactEmail: '', contactPhone: '', studentCount: '', ictTeacherCount: '', hasICTLab: '', interests: [], additionalInfo: '' });
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
            <div className={`${toast.type === 'success' ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500' : 'bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500'} p-4 rounded-lg shadow-lg max-w-md backdrop-blur-sm`}>
              <div className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                  className="flex-shrink-0"
                >
                  <div className={`w-10 h-10 ${toast.type === 'success' ? 'bg-blue-100' : 'bg-red-100'} rounded-full flex items-center justify-center`}>
                    {toast.type === 'success' ? (
                      <svg className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
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
                  className={`h-full ${toast.type === 'success' ? 'bg-blue-500' : 'bg-red-500'}`}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-blue-700 overflow-hidden">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4 ${delius.className}`}>School / Institution Sign-Up</h1>
            <p className="text-white/90 text-lg">Register your school to access our Unplugged Coding & AI Workbooks</p>
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
                {/* School Information */}
                <div className="pb-4 border-b border-gray-100">
                  <h3 className={`text-lg font-bold text-gray-900 ${delius.className}`}>School Information</h3>
                </div>

                <div>
                  <label htmlFor="schoolName" className={labelClass}>School / Institution Name *</label>
                  <input type="text" id="schoolName" name="schoolName" value={formData.schoolName} onChange={handleChange} required className={inputClass} placeholder="e.g. Kwabenya M/A Basic School" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="location" className={labelClass}>Location / Town *</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required className={inputClass} placeholder="e.g. Kwabenya, Accra" />
                  </div>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="studentCount" className={labelClass}>Number of Students</label>
                    <select id="studentCount" name="studentCount" value={formData.studentCount} onChange={handleChange} className={inputClass}>
                      <option value="">Select...</option>
                      <option value="1-100">1 – 100</option>
                      <option value="101-300">101 – 300</option>
                      <option value="301-500">301 – 500</option>
                      <option value="501-1000">501 – 1,000</option>
                      <option value="1000+">1,000+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="ictTeacherCount" className={labelClass}>ICT Teachers</label>
                    <input type="number" id="ictTeacherCount" name="ictTeacherCount" value={formData.ictTeacherCount} onChange={handleChange} className={inputClass} placeholder="e.g. 2" min="0" />
                  </div>
                  <div>
                    <label htmlFor="hasICTLab" className={labelClass}>ICT Lab Available?</label>
                    <select id="hasICTLab" name="hasICTLab" value={formData.hasICTLab} onChange={handleChange} className={inputClass}>
                      <option value="">Select...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="partial">Partially Equipped</option>
                    </select>
                  </div>
                </div>

                {/* Contact Person */}
                <div className="pb-4 pt-4 border-b border-gray-100">
                  <h3 className={`text-lg font-bold text-gray-900 ${delius.className}`}>Contact Person</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contactName" className={labelClass}>Contact Person Name *</label>
                    <input type="text" id="contactName" name="contactName" value={formData.contactName} onChange={handleChange} required className={inputClass} placeholder="e.g. Kwame Asante" />
                  </div>
                  <div>
                    <label htmlFor="contactRole" className={labelClass}>Role / Position *</label>
                    <input type="text" id="contactRole" name="contactRole" value={formData.contactRole} onChange={handleChange} required className={inputClass} placeholder="e.g. Head Teacher" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contactEmail" className={labelClass}>Email Address *</label>
                    <input type="email" id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required className={inputClass} placeholder="e.g. kwame@school.edu.gh" />
                  </div>
                  <div>
                    <label htmlFor="contactPhone" className={labelClass}>Phone Number *</label>
                    <input type="tel" id="contactPhone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} required className={inputClass} placeholder="e.g. 0244 123 456" />
                  </div>
                </div>

                {/* Interests */}
                <div className="pb-4 pt-4 border-b border-gray-100">
                  <h3 className={`text-lg font-bold text-gray-900 ${delius.className}`}>What Are You Interested In?</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {interestOptions.map(interest => (
                    <label key={interest} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors has-[:checked]:bg-blue-50 has-[:checked]:border-blue-400">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleCheckbox(interest)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label htmlFor="additionalInfo" className={labelClass}>Additional Information</label>
                  <textarea id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows={3} className={inputClass} placeholder="Anything else you'd like us to know about your school..." />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3.5 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Register School'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
