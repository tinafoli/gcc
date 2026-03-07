'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Delius } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { usePageLoading } from '@/context/PageLoadingContext';

const delius = Delius({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// Animation variants
const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      height: {
        duration: 0.2
      },
      opacity: {
        duration: 0.2
      }
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      height: {
        duration: 0.2
      },
      opacity: {
        duration: 0.2
      }
    }
  }
};

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();
  const { startLoading } = usePageLoading();

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Keep navbar visible near top
      if (currentScrollY < 80) {
        setIsNavVisible(true);
      } else {
        const delta = currentScrollY - lastScrollY.current;

        // Hide on meaningful downward scroll, show on upward scroll
        if (delta > 8 && currentScrollY > 120 && !isMenuOpen) {
          setIsNavVisible(false);
        } else if (delta < -8) {
          setIsNavVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const handleMobileNavigation = (path: string) => {
    setIsMenuOpen(false);
    startLoading();
    router.push(path);
  };

  const handleLinkClick = () => {
    startLoading();
  };

  // Return a placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return <div className="h-16" />;
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 transform ${isNavVisible ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'bg-white shadow-md py-2' : 'bg-red-50 py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" onClick={handleLinkClick} className="flex items-center group">
            <div className="relative">
              <Image
                src="/images/gcc-logo.png"
                alt="Ghana Code Club"
                width={50}
                height={50}
                className="rounded-full border-2 border-red-500 shadow-lg"
                priority
              />
            </div>
            <span className={`ml-3 text-xl ${scrolled ? 'text-gray-900' : 'text-gray-800'} font-['Delius'] cursor-pointer`}>
              Ghana Code Club
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/programs" 
              className={`${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-gray-700 hover:text-red-600'} px-4 py-2 rounded-md transition-colors duration-200 relative group ${
                pathname === '/programs' ? 'text-red-600' : ''
              }`}
            >
              <span className="relative z-10">Programs</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transition-all duration-200 ${
                pathname === '/programs' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></span>
            </Link>
            
            <Link 
              href="/about" 
              onClick={handleLinkClick}
              className={`${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-gray-700 hover:text-red-600'} px-4 py-2 rounded-md transition-colors duration-200 relative group ${
                pathname === '/about' ? 'text-red-600' : ''
              }`}
            >
              <span className="relative z-10">About us</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transition-all duration-200 ${
                pathname === '/about' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></span>
            </Link>

            <Link 
              href="/partners" 
              onClick={handleLinkClick}
              className={`${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-gray-700 hover:text-red-600'} px-4 py-2 rounded-md transition-colors duration-200 relative group ${
                pathname === '/partners' ? 'text-red-600' : ''
              }`}
            >
              <span className="relative z-10">Partners</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transition-all duration-200 ${
                pathname === '/partners' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></span>
            </Link>
            
            <Link 
              href="/blog" 
              onClick={handleLinkClick}
              className={`${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-gray-700 hover:text-red-600'} px-4 py-2 rounded-md transition-colors duration-200 relative group ${
                pathname === '/blog' ? 'text-red-600' : ''
              }`}
            >
              <span className="relative z-10">Blog</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transition-all duration-200 ${
                pathname === '/blog' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></span>
            </Link>
            
            <Link 
              href="/resources" 
              onClick={handleLinkClick}
              className={`${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-gray-700 hover:text-red-600'} px-4 py-2 rounded-md transition-colors duration-200 relative group ${
                pathname === '/resources' ? 'text-red-600' : ''
              }`}
            >
              <span className="relative z-10">Resources</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transition-all duration-200 ${
                pathname === '/resources' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></span>
            </Link>
            
            <Link 
              href="/contact" 
              onClick={handleLinkClick}
              className={`${scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-gray-700 hover:text-red-600'} px-4 py-2 rounded-md transition-colors duration-200 relative group ${
                pathname === '/contact' ? 'text-red-600' : ''
              }`}
            >
              <span className="relative z-10">Contact us</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transition-all duration-200 ${
                pathname === '/contact' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></span>
            </Link>
            
            <Link 
              href="/donate" 
              onClick={handleLinkClick}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-md hover:from-red-600 hover:to-red-700 transition-colors duration-200 shadow-md ml-2"
            >
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${scrolled ? 'text-gray-700' : 'text-gray-700'} hover:text-red-500 transition-colors`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div 
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden absolute top-full left-0 right-0 w-full z-40 overflow-hidden"
            >
              <div className="mx-4 bg-white rounded-b-lg shadow-lg">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <button 
                    onClick={() => handleMobileNavigation('/programs')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      pathname === '/programs' 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-700 hover:text-red-500 hover:bg-gray-50'
                    }`}
                  >
                    Programs
                  </button>
                  <button 
                    onClick={() => handleMobileNavigation('/about')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      pathname === '/about' 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-700 hover:text-red-500 hover:bg-gray-50'
                    }`}
                  >
                    About us
                  </button>
                  <button 
                    onClick={() => handleMobileNavigation('/partners')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      pathname === '/partners' 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-700 hover:text-red-500 hover:bg-gray-50'
                    }`}
                  >
                    Partners
                  </button>
                  <button 
                    onClick={() => handleMobileNavigation('/blog')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      pathname === '/blog' 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-700 hover:text-red-500 hover:bg-gray-50'
                    }`}
                  >
                    Blog
                  </button>
                  <button 
                    onClick={() => handleMobileNavigation('/resources')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      pathname === '/resources' 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-700 hover:text-red-500 hover:bg-gray-50'
                    }`}
                  >
                    Resources
                  </button>
                  <button 
                    onClick={() => handleMobileNavigation('/contact')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      pathname === '/contact' 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-700 hover:text-red-500 hover:bg-gray-50'
                    }`}
                  >
                    Contact us
                  </button>
                  <button 
                    onClick={() => handleMobileNavigation('/donate')}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md hover:from-red-600 hover:to-red-700 transition-colors duration-200 mt-2 text-center"
                  >
                    Donate
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
} 