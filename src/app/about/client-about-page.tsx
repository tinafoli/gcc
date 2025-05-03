'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Delius } from 'next/font/google';
import { BookOpenIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
});

// Team member data
const teamMembers = [
  { 
    id: 1, 
    name: 'Peter Asamoah Aforo', 
    title: 'Director, Program Design, Senior Developer', 
    image: '/images/team/peter-asamoah-aforo.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  { 
    id: 2, 
    name: 'Noella Deribaa', 
    title: 'Lead instructor for Little Programmers', 
    image: '/images/team/noella-deribaa.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  { 
    id: 3, 
    name: 'Leon Nuako Yankful', 
    title: 'Lead Trainer/Instructor', 
    image: '/images/team/leon-nuako-yankful.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  { 
    id: 4, 
    name: 'George Osei Yeboah', 
    title: 'Lead Trainer/Instructor', 
    image: '/images/team/george-osei-yeboah.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  { 
    id: 5, 
    name: 'Daud Yakub', 
    title: 'Lead Trainer/Instructor', 
    image: '/images/team/daud-yakub.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  { 
    id: 6, 
    name: 'Michael Dzata', 
    title: 'Lead Trainer/Instructor', 
    image: '/images/team/michael-dzata.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  { 
    id: 7, 
    name: 'Emmanuel Mingle', 
    title: 'Lead Trainer/Instructor', 
    image: '/images/team/emmanuel-mingle.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  { 
    id: 8, 
    name: 'Perfect Elorm Avugla', 
    title: 'Lead Trainer/Instructor', 
    image: '/images/team/perfect-elorm-avugla.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  { 
    id: 9, 
    name: 'Kwaku Amo-Korankye', 
    title: 'Lead Trainer/Instructor', 
    image: '/images/team/kwaku.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  { 
    id: 10, 
    name: 'Theophilus', 
    title: 'Lead Trainer/Instructor', 
    image: '/images/team/theophilus.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  { 
    id: 11, 
    name: 'Alberta Bliss Hayford', 
    title: 'Upper West Coordinator', 
    image: '/images/team/alberta-bliss-hayford.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  }
];

// Board members data
const boardMembers = [
  { 
    id: 1, 
    name: 'Katie Donkor', 
    title: 'PGCE | BA\nEdTech & Digital Learning Specialist',
    image: '/images/board/katie-donkor.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  { 
    id: 2, 
    name: 'LaToya Samuels Wharton, MBA', 
    title: 'Founder, Siblings Keeper',
    image: '/images/board/latoya.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  { 
    id: 3, 
    name: 'Rachel Man', 
    title: 'Founder, WemanConnect\nSocial Impact Consulting',
    image: '/images/board/rachel-man.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  { 
    id: 4, 
    name: 'Ethel Cofie', 
    title: 'Founder,\nEdel Technology Consulting',
    image: '/images/board/ethel-cofie.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  {
    id: 5,
    name: 'Tawiah Steve Sewu',
    title: 'Co-Founder and CEO at Leti Arts',
    image: '/images/board/tawiah-steve-sewu.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  },
  {
    id: 6,
    name: 'Eyram Tanisha Tawiah',
    title: 'Board Member',
    image: '/images/board/eyram-tanisha-tawiah.jpg',
    social: {
      instagram: '#',
      twitter: '#',
      facebook: '#'
    }
  }
];

export default function ClientAboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBoardSlide, setCurrentBoardSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const boardSliderRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const autoSlideInterval = useRef<NodeJS.Timeout>();
  const autoBoardSlideInterval = useRef<NodeJS.Timeout>();

  // Add scroll handler function
  const scrollToMission = (e: React.MouseEvent) => {
    e.preventDefault();
    const missionSection = document.getElementById('our-mission');
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalSlides = isMobile ? teamMembers.length : Math.ceil(teamMembers.length / 4);
  const totalBoardSlides = isMobile ? boardMembers.length : Math.ceil(boardMembers.length / 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const nextBoardSlide = () => {
    setCurrentBoardSlide((prev) => (prev + 1) % totalBoardSlides);
  };

  const prevBoardSlide = () => {
    setCurrentBoardSlide((prev) => (prev - 1 + totalBoardSlides) % totalBoardSlides);
  };

  // Auto slide effects
  useEffect(() => {
    autoSlideInterval.current = setInterval(nextSlide, 5000);
    autoBoardSlideInterval.current = setInterval(nextBoardSlide, 5000);
    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
      if (autoBoardSlideInterval.current) {
        clearInterval(autoBoardSlideInterval.current);
      }
    };
  }, [totalSlides, totalBoardSlides]);

  // Pause auto-slide on hover
  const handleMouseEnter = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
  };

  const handleMouseLeave = () => {
    autoSlideInterval.current = setInterval(nextSlide, 5000);
  };

  const handleBoardMouseEnter = () => {
    if (autoBoardSlideInterval.current) {
      clearInterval(autoBoardSlideInterval.current);
    }
  };

  const handleBoardMouseLeave = () => {
    autoBoardSlideInterval.current = setInterval(nextBoardSlide, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt="About Us Background"
            fill
            className="object-cover scale-105 motion-safe:animate-subtle-zoom"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/75 to-gray-900/85"></div>
          
          {/* Animated Pattern Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-blue-500/10"></div>
        </div>

          {/* Floating Elements */}
          {!isMobile && (
            <>
              <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </>
          )}
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
            {!isMobile && (
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>
            )}

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0 : 0.5 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white font-['Delius'] leading-tight relative inline-block">
                About Ghana Code Club
                <div className="absolute -bottom-2 left-0 w-full h-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-500 to-red-500"></div>
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500 via-white to-red-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    />
                  )}
                </div>
                {!isMobile && (
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
                )}
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0 : 0.5, delay: isMobile ? 0 : 0.2 }}
              className="text-2xl md:text-3xl text-gray-200 mb-8 leading-relaxed max-w-3xl"
            >
              Empowering the next generation of Ghanaian tech leaders through coding education and digital skills training.
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0 : 0.5, delay: isMobile ? 0 : 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <motion.button 
                onClick={scrollToMission}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative z-10">Our Mission</span>
                <motion.svg 
                  className="w-5 h-5 ml-2 relative z-10"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </motion.button>
              <motion.a 
                href="https://forms.gle/i4Sjcm6rmy5aRXox5" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-300 text-lg font-semibold border border-white/10 hover:border-white/25 shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative z-10">Join Our Team</span>
                <motion.svg 
                  className="w-5 h-5 ml-2 relative z-10"
                  initial={{ y: 0 }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </motion.svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Corner Decorations */}
        {!isMobile && (
          <>
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
          </>
        )}
      </section>

      {/* Introduction Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-red-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 font-['Delius']">Who We Are</h2>
              </div>
              <div className="space-y-6">
                <p className="text-xl text-gray-700 leading-relaxed">
                  The Ghana Code Club is an after-school program that teaches children computer programming skills. Children between ages 5-17 can join any of our Computer Science programs from Schools, Community Centers and Libraries to learn to create computer games, animations, interactive arts, websites and mobile apps.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Education</h3>
                    <p className="text-sm text-gray-600">Comprehensive programming education for young minds</p>
                  </div>
                  <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
                    <p className="text-sm text-gray-600">Programs available in schools and community centers</p>
                  </div>
                  <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
                    <p className="text-sm text-gray-600">Creating games, animations, and mobile apps</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="our-mission" className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Delius']">Our Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to empowering the next generation through technology education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[80%] mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-lg"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-200/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 font-['Delius']">Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To equip every Ghanaian kid between 5-17 years with Computer Science skills by providing training, mentoring and infrastructure resources for effective, simplified, sustained learning for the development of problem-solving aptitude through creativity and innovation.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-lg"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-200/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 font-['Delius']">Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We believe that Computer Science is foundational for all students in the 21st century regardless of their ultimate field of study or occupation. Our vision is to transform every Ghanaian child into a technology leader who is capable of creating their own future.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-white/80"></div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0"
          transition={{ duration: 1 }}
        >
          <div className="absolute top-20 left-10 w-64 h-64 bg-red-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-red-300/20 rounded-full blur-3xl"></div>
        </motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-red-100">
              <div className="flex items-center gap-4 mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 bg-red-500 rounded-2xl rotate-12 flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-white -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <h2 className="text-4xl font-bold text-gray-900 font-['Delius']">How It Started...</h2>
              </div>
              <div className="space-y-8">
                <div className="relative">
                  <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/3">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-red-500/20 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative">
                          <div className="aspect-square rounded-[2rem] overflow-hidden border-8 border-white shadow-xl transform group-hover:scale-[1.02] transition-transform duration-300">
                            <Image
                              src="/images/board/ernestina-appiah.jpg"
                              alt="Ernestina Appiah - Founder of Ghana Code Club"
                              width={400}
                              height={400}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-8 py-3 rounded-2xl text-lg font-semibold whitespace-nowrap shadow-lg"
                          >
                            Founder & CEO
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                    <div className="w-full md:w-2/3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <p className="text-xl text-gray-700 leading-relaxed mb-8">
                          Ghana Code Club was founded by <span className="font-bold text-red-600">Ernestina Appiah</span> through her registered NGO Healthy Career Initiative in Ghana in 2015.
                        </p>
                        <div className="relative">
                          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-red-500/0 via-red-500/50 to-red-500/0 rounded-full"></div>
                          <p className="text-xl text-gray-700 leading-relaxed mb-8 pl-6">
                            Ernestina believes that computer programming and other technical skills is a tool of empowerment. This is the reason why she has formed a team with a mission to ensuring that every child and youth particularly girls have access to the skills they need to thrive in our increasingly digital world.
                          </p>
                        </div>
                        <p className="text-xl text-gray-700 leading-relaxed">
                          Ghana Code Club has gradually become champions for coding education in Ghana, driving results through program design and delivery, strategic industry and public partnerships, research and advocacy.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12"
                >
                  <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 border border-red-100 shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 bg-red-500 rounded-xl rotate-6 flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-white -rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Founded in 2015</h3>
                    <p className="text-gray-600">Started as an NGO initiative for tech education</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 border border-red-100 shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 bg-red-500 rounded-xl -rotate-6 flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-white rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Empowering Youth</h3>
                    <p className="text-gray-600">Focus on girls and underserved communities</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 border border-red-100 shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 bg-red-500 rounded-xl rotate-3 flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-white -rotate-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Leaders</h3>
                    <p className="text-gray-600">Champions of coding education in Ghana</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Slider Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-white/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Delius']">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to education and technology
            </p>
          </motion.div>

          <div 
            className="max-w-[90%] mx-auto relative" 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={sliderRef}
          >
            <div className="w-full overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: isMobile 
                    ? `translateX(-${currentSlide * 100}%)` 
                    : `translateX(-${currentSlide * 100}%)` 
                }}
              >
                {isMobile ? (
                  // Mobile view shows one at a time
                  teamMembers.map((member) => (
                    <div key={member.id} className="w-full flex-shrink-0 px-2">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden"
                      >
                        <div className="relative bg-gradient-to-br from-red-500 to-red-600 h-28">
                          {/* Decorative Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                              </pattern>
                              <rect width="100" height="100" fill="url(#grid-pattern)" />
                            </svg>
                          </div>
                          
                          {/* Floating Circles */}
                          <div className="absolute inset-0">
                            <div className="absolute top-4 left-4 w-12 h-12">
                              <svg className="w-full h-full text-white opacity-10" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="currentColor" />
                              </svg>
                            </div>
                            <div className="absolute bottom-2 right-4 w-8 h-8">
                              <svg className="w-full h-full text-white opacity-10" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="currentColor" />
                              </svg>
                            </div>
                          </div>

                          {/* Decorative Lines */}
                          <div className="absolute inset-0">
                            <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                              <path d="M0 10 Q 50 0 100 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                              <path d="M0 10 Q 50 5 100 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            </svg>
                          </div>

                          {/* Dots Pattern */}
                          <div className="absolute top-2 right-2">
                            <div className="flex space-x-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-20"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-20"></div>
                            </div>
                          </div>
                        </div>
                        <div className="relative px-6 pb-6 -mt-20">
                          <div className="w-40 h-40 mx-auto rounded-full border-4 border-white shadow-lg overflow-hidden mb-4">
                            <Image
                              src={member.image}
                              alt={member.name}
                              width={160}
                              height={160}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <h3 className={`text-2xl font-bold text-gray-900 text-center mb-2 ${delius.className}`}>{member.name}</h3>
                          <p className="text-gray-600 text-center">{member.title}</p>
                        </div>
                      </motion.div>
                    </div>
                  ))
                ) : (
                  // Desktop view shows up to 4 at once
                  Array(Math.ceil(teamMembers.length / 4)).fill(0).map((_, batchIndex) => (
                    <div key={batchIndex} className="w-full flex-shrink-0 flex flex-wrap">
                      {teamMembers.slice(batchIndex * 4, batchIndex * 4 + 4).map((member) => (
                        <div key={member.id} className="w-1/2 md:w-1/4 p-2">
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                          >
                            <div className="relative bg-gradient-to-br from-red-500 to-red-600 h-28">
                              {/* Decorative Pattern */}
                              <div className="absolute inset-0 opacity-10">
                                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                  <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                                  </pattern>
                                  <rect width="100" height="100" fill="url(#grid-pattern)" />
                                </svg>
                              </div>
                              
                              {/* Floating Circles */}
                              <div className="absolute inset-0">
                                <div className="absolute top-4 left-4 w-12 h-12">
                                  <svg className="w-full h-full text-white opacity-10" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="currentColor" />
                                  </svg>
                                </div>
                                <div className="absolute bottom-2 right-4 w-8 h-8">
                                  <svg className="w-full h-full text-white opacity-10" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="currentColor" />
                                  </svg>
                                </div>
                              </div>

                              {/* Decorative Lines */}
                              <div className="absolute inset-0">
                                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                                  <path d="M0 10 Q 50 0 100 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                  <path d="M0 10 Q 50 5 100 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                </svg>
                              </div>

                              {/* Dots Pattern */}
                              <div className="absolute top-2 right-2">
                                <div className="flex space-x-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-20"></div>
                                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-20"></div>
                                </div>
                              </div>
                            </div>
                            <div className="relative px-4 pb-6 -mt-16">
                              <div className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg overflow-hidden mb-4">
                                <Image
                                  src={member.image}
                                  alt={member.name}
                                  width={128}
                                  height={128}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <h3 className={`text-lg font-bold text-gray-900 text-center mb-2 ${delius.className}`}>{member.name}</h3>
                              <p className="text-sm text-gray-600 text-center">{member.title}</p>
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            <button 
              onClick={prevSlide} 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center z-10 focus:outline-none"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center z-10 focus:outline-none"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Delius']">Board Members</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our dedicated board members who provide guidance and oversight
            </p>
          </motion.div>

          <div 
            className="max-w-[90%] mx-auto relative" 
            onMouseEnter={handleBoardMouseEnter}
            onMouseLeave={handleBoardMouseLeave}
            ref={boardSliderRef}
          >
            <div className="w-full overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: isMobile 
                    ? `translateX(-${currentBoardSlide * 100}%)` 
                    : `translateX(-${currentBoardSlide * 100}%)` 
                }}
              >
                {isMobile ? (
                  // Mobile view shows one at a time
                  boardMembers.map((member) => (
                    <div key={member.id} className="w-full flex-shrink-0 px-2">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden"
                      >
                        <div className="relative bg-gradient-to-br from-red-500 to-red-600 h-32">
                          {/* Decorative Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <pattern id="board-grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                              </pattern>
                              <rect width="100" height="100" fill="url(#board-grid-pattern)" />
                            </svg>
                          </div>
                          
                          {/* Floating Circles */}
                          <div className="absolute inset-0">
                            <div className="absolute top-4 left-4 w-12 h-12">
                              <svg className="w-full h-full text-white opacity-10" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="currentColor" />
                              </svg>
                            </div>
                            <div className="absolute bottom-2 right-4 w-8 h-8">
                              <svg className="w-full h-full text-white opacity-10" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="currentColor" />
                              </svg>
                            </div>
                          </div>

                          {/* Decorative Lines */}
                          <div className="absolute inset-0">
                            <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                              <path d="M0 10 Q 50 0 100 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                              <path d="M0 10 Q 50 5 100 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            </svg>
                          </div>

                          {/* Dots Pattern */}
                          <div className="absolute top-2 right-2">
                            <div className="flex space-x-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-20"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-20"></div>
                            </div>
                          </div>
                        </div>
                        <div className="relative px-6 pb-6 -mt-20">
                          <div className="w-40 h-40 mx-auto rounded-full border-4 border-white shadow-lg overflow-hidden mb-4">
                            <Image
                              src={member.image}
                              alt={member.name}
                              width={160}
                              height={160}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <h3 className={`text-2xl font-bold text-gray-900 text-center mb-2 ${delius.className}`}>{member.name}</h3>
                          <p className="text-gray-600 text-center whitespace-pre-line">{member.title}</p>
                        </div>
                      </motion.div>
                    </div>
                  ))
                ) : (
                  // Desktop view shows up to 3 at once
                  Array(Math.ceil(boardMembers.length / 3)).fill(0).map((_, batchIndex) => (
                    <div key={batchIndex} className="w-full flex-shrink-0 flex flex-wrap">
                      {boardMembers.slice(batchIndex * 3, batchIndex * 3 + 3).map((member) => (
                        <div key={member.id} className="w-1/3 p-2">
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                          >
                            <div className="relative bg-gradient-to-br from-red-500 to-red-600 h-32">
                              {/* Decorative Pattern */}
                              <div className="absolute inset-0 opacity-10">
                                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                  <pattern id="board-grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                                  </pattern>
                                  <rect width="100" height="100" fill="url(#board-grid-pattern)" />
                                </svg>
                              </div>
                              
                              {/* Floating Circles */}
                              <div className="absolute inset-0">
                                <div className="absolute top-4 left-4 w-12 h-12">
                                  <svg className="w-full h-full text-white opacity-10" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="currentColor" />
                                  </svg>
                                </div>
                                <div className="absolute bottom-2 right-4 w-8 h-8">
                                  <svg className="w-full h-full text-white opacity-10" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="currentColor" />
                                  </svg>
                                </div>
                              </div>

                              {/* Decorative Lines */}
                              <div className="absolute inset-0">
                                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                                  <path d="M0 10 Q 50 0 100 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                  <path d="M0 10 Q 50 5 100 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                </svg>
                              </div>

                              {/* Dots Pattern */}
                              <div className="absolute top-2 right-2">
                                <div className="flex space-x-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-20"></div>
                                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-20"></div>
                                </div>
                              </div>
                            </div>
                            <div className="relative px-4 pb-6 -mt-16">
                              <div className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg overflow-hidden mb-4">
                                <Image
                                  src={member.image}
                                  alt={member.name}
                                  width={128}
                                  height={128}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <h3 className={`text-xl font-bold text-gray-900 text-center mb-2 ${delius.className}`}>{member.name}</h3>
                              <p className="text-sm text-gray-600 text-center whitespace-pre-line">{member.title}</p>
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            <button 
              onClick={prevBoardSlide} 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center z-10 focus:outline-none"
              aria-label="Previous board member"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextBoardSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center z-10 focus:outline-none"
              aria-label="Next board member"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-red-500 to-red-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6 font-['Delius']">Join Our Mission</h2>
            <p className="text-xl mb-8">
              Help us make a difference in the lives of Ghanaian youth. Whether you're a mentor, sponsor, or volunteer, we welcome your support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                Contact Us
              </Link>
              <Link href="/donate" className="bg-red-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors">
                Donate
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 