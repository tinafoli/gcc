'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Partner data
const partners = [
  {
    category: 'Main Partners',
    partners: [
      {
        id: 1,
        name: 'Raspberry Pi Foundation',
        logo: '/images/partners/raspberry-pi.png',
        description: 'Global leader in computing education, providing hardware and curriculum support for our coding clubs.',
        impact: 'Equipped our labs with Raspberry Pi computers and learning materials, enabling hands-on programming education',
        link: 'https://www.raspberrypi.org'
      },
      {
        id: 2,
        name: 'Code.org',
        logo: '/images/partners/code-org.png',
        description: 'Leading platform for computer science education, supporting our mission to expand access to coding education.',
        impact: 'Provided comprehensive curriculum resources and teacher training programs',
        link: 'https://code.org'
      },
      {
        id: 3,
        name: 'ATC Ghana',
        logo: '/images/partners/atc-ghana.png',
        description: 'Strategic partner in advancing technology education and digital skills development in Ghana.',
        impact: 'Collaborating on infrastructure development and educational programs',
        link: 'https://www.atcghana.com'
      },
      {
        id: 4,
        name: 'Ecobank',
        logo: '/images/partners/ecobank.png',
        description: 'Financial partner supporting our mission to make coding education accessible across Ghana.',
        impact: 'Providing financial support and resources for our educational programs',
        link: 'https://www.ecobank.com'
      },
      {
        id: 5,
        name: 'Samsung',
        logo: '/images/partners/samsung.png',
        description: 'Technology partner providing cutting-edge devices and resources for our digital education initiatives.',
        impact: 'Supplied tablets and smart devices for our mobile learning labs',
        link: 'https://www.samsung.com'
      },
      {
        id: 6,
        name: 'SEEDAfrique',
        logo: '/images/partners/seedafrique.png',
        description: 'Leading organization in STEM education and innovation in Africa, collaborating on robotics and AI initiatives.',
        impact: 'Joint programs in robotics education and AI training for youth across Ghana',
        link: 'https://seedafrique.com'
      }
    ]
  }
];

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  impact: string;
  link: string;
}

interface PartnerCategory {
  category: string;
  partners: Partner[];
}

export default function ClientPartnersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/partners-hero.jpg"
            alt="Partners Background"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white font-['Delius'] leading-tight relative inline-block">
                Our Partners
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
              Together with our partners, we're building a brighter future for Ghana's youth through technology education.
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-6"
            >
              <motion.a 
                href="/donate#our-impact" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative z-10">Our Impact</span>
                <motion.svg 
                  className="w-5 h-5 ml-2 relative z-10"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </motion.svg>
              </motion.a>
              <motion.a 
                href="https://forms.gle/xhjcNuqM1RyK9PTP9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-300 text-lg font-semibold border border-white/10 hover:border-white/25 shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative z-10">Become a Partner</span>
                <motion.svg 
                  className="w-5 h-5 ml-2 relative z-10"
                  initial={{ y: 0 }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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

      {/* White Background Wrapper */}
      <div className="bg-white" style={{ backgroundColor: '#ffffff' }}>
        {/* Partners Section */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-['Delius']">
                Meet some of the incredible partners
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                who share our vision and help drive our work forward.
              </p>
            </motion.div>

            {partners.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="mb-16"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center font-['Delius']">
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.partners.map((partner) => (
                    <motion.div
                      key={partner.id}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                    >
                      <div className="p-6">
                        <div className="h-32 flex items-center justify-center mb-6 bg-gray-50 rounded-lg p-4">
                          <div className="relative w-full h-full">
                            <Image
                              src={partner.logo}
                              alt={partner.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-contain p-2"
                              priority={partner.id <= 3}
                              quality={90}
                            />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{partner.name}</h3>
                        <p className="text-gray-600 mb-4">{partner.description}</p>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Impact:</span> {partner.impact}
                          </p>
                        </div>
                        <a
                          href={partner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-500 hover:text-red-600 font-medium"
                        >
                          Learn More →
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <section className="bg-gradient-to-r from-red-500 to-red-600">
          <div className="container mx-auto px-4 py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-['Delius']">Become a Partner</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto text-white">
                Join us in our mission to empower Ghana's youth through technology education. Together, we can create lasting impact.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact" className="bg-white text-red-500 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                  Contact Us
                </Link>
                <Link href="/about" className="bg-gray-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors">
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
} 