'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Delius } from 'next/font/google';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface PageLoaderProps {
  isLoading: boolean;
}

export default function PageLoader({ isLoading }: PageLoaderProps) {
  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Code Symbols */}
            {[...Array(12)].map((_, i) => {
              const symbols = ['{', '}', '<', '>', '/', '*', '=', ';'];
              return (
                <motion.div
                  key={i}
                  className="absolute text-red-200/30 text-4xl font-mono"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 0.3, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                  style={{
                    left: `${(i * 8) % 100}%`,
                    top: `${(i * 10) % 80 + 10}%`,
                  }}
                >
                  {symbols[i % symbols.length]}
                </motion.div>
              );
            })}
          </div>

          {/* Main Loading Content */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Logo with Pulse Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              className="relative mb-8"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-50"></div>
                <Image
                  src="/images/gcc-logo.png"
                  alt="Ghana Code Club"
                  width={120}
                  height={120}
                  className="relative rounded-full border-4 border-red-500 shadow-2xl"
                  priority
                />
              </motion.div>
              
              {/* Rotating Rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute inset-0 border-4 border-red-500/20 rounded-full"
                  style={{
                    width: `${100 + ring * 20}px`,
                    height: `${100 + ring * 20}px`,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3 + ring,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: ring * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${delius.className}`}
            >
              Ghana Code Club
            </motion.h1>

            {/* Loading Text with Typewriter Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-2"
            >
              <span className="text-gray-600 text-lg">Loading</span>
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-red-500 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mt-8 h-1 bg-red-100 rounded-full w-64 overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-full"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Code Lines Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-12 space-y-2 text-gray-400 font-mono text-sm"
            >
              {['// Empowering Ghana\'s Youth', '// Through Code & Technology', '// Building Future Leaders'].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-left"
                >
                  <span className="text-red-500">{'> '}</span>
                  {line}
                  {i === 2 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1"
                    >
                      |
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-red-500/20"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-red-500/20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-red-500/20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-red-500/20"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

