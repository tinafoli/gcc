'use client';

import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Delius } from 'next/font/google';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Logo and Description */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-3">
              <img src="/images/gcc-logo.png" alt="Ghana Code Club Logo" className="h-10 w-auto" />
              <span className="text-xl font-['Delius']">
                Ghana Code Club
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering the next generation of Ghanaian innovators through coding education.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:col-span-1">
            <h3 className={`text-base font-bold text-white ${delius.className}`}>Quick Links</h3>
            <ul className="space-y-1.5">
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                About Us
              </a></li>
              <li><a href="/programs" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Programs
              </a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Blog
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 md:col-span-1 pr-6">
            <h3 className={`text-base font-bold text-white ${delius.className}`}>Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-3">
                <div className="p-1.5 bg-gray-700 rounded-full flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm break-words">tinaappiah@ghanacodeclub.org</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-1.5 bg-gray-700 rounded-full flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">+233 265 270 825</span>
                  <span className="text-sm">+233 244 670 660</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="p-1.5 bg-gray-700 rounded-full flex-shrink-0 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm break-words">Robotics & Coding House, Gospel Avenue, Ashongman Estates GE-105-6378, Accra, Ghana</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-3 md:col-span-1 pl-6">
            <h3 className={`text-base font-bold text-white ${delius.className}`}>Follow Us</h3>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/ghanacodeclub" className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 hover:text-white transition-all duration-300">
                <FaFacebook size={16} />
              </a>
              <a href="https://twitter.com/ghanacodeclub" className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 hover:text-white transition-all duration-300">
                <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/ghanacodeclub" className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 hover:text-white transition-all duration-300">
                <FaInstagram size={16} />
              </a>
              <a href="https://www.linkedin.com/company/ghana-code-club" className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 hover:text-white transition-all duration-300">
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>

          {/* Latest Blog */}
          <div className="space-y-3 md:col-span-1">
            <h3 className={`text-base font-bold text-white ${delius.className}`}>Latest Blog</h3>
            <div className="space-y-2">
              <a href="/blog" className="block p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <h4 className="text-white font-medium mb-1 text-sm">Ghana Code Club Partners with The Ursula Foundation</h4>
                <p className="text-gray-400 text-xs">March 28, 2025</p>
              </a>
              <a href="/blog" className="block p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <h4 className="text-white font-medium mb-1 text-sm">Ghana Code Club at Accra Parent Expo</h4>
                <p className="text-gray-400 text-xs">March 25, 2025</p>
              </a>
              <a href="/blog" className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center">
                View All Posts
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Policies */}
          <div className="space-y-3 md:col-span-1">
            <h3 className={`text-base font-bold text-white ${delius.className}`}>Policies</h3>
            <ul className="space-y-1.5">
              <li><a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Privacy Policy
              </a></li>
              <li><a href="/child-protection-policy" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Child Protection Policy
              </a></li>
              <li><a href="/code-of-conduct" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Code of Conduct
              </a></li>
              <li><a href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Terms of Service
              </a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 pt-3">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} Ghana Code Club. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="/privacy-policy" className="text-gray-400 hover:text-white text-xs">Privacy Policy</a>
              <a href="/child-protection-policy" className="text-gray-400 hover:text-white text-xs">Child Protection Policy</a>
              <a href="/code-of-conduct" className="text-gray-400 hover:text-white text-xs">Code of Conduct</a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-white text-xs">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 