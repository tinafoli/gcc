'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Delius } from 'next/font/google';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ClientResourcesPage() {
  // Set target date to 3 weeks from now
  const [targetDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 21); // 3 weeks = 21 days
    return date;
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate, mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center"
        >
          {/* Message */}
          <div className="mb-12">
            <div className="text-5xl mb-4">👷‍♂️</div>
            <h1 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${delius.className}`}>
              This Page Is Being Built
            </h1>
            <p className="text-gray-600 text-lg">
              We're working behind the scenes to bring you something valuable.
            </p>
          </div>

          {/* Countdown Label */}
          <h2 className={`text-xl md:text-2xl font-semibold text-gray-800 mb-8 ${delius.className}`}>
            Countdown to launch:
          </h2>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-3xl mx-auto">
            {/* Days */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative group"
            >
              <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-8 border-2 border-gray-200 hover:border-red-500 transition-all duration-300 shadow-sm hover:shadow-xl text-center flex flex-col items-center justify-center">
                <div className="text-2xl md:text-6xl font-bold text-gray-900 mb-1 md:mb-3 tracking-tight">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-gray-500 text-xs md:text-base font-semibold uppercase tracking-wider">
                  {timeLeft.days === 1 ? 'Day' : 'Days'}
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative group"
            >
              <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-8 border-2 border-gray-200 hover:border-red-500 transition-all duration-300 shadow-sm hover:shadow-xl text-center flex flex-col items-center justify-center">
                <div className="text-2xl md:text-6xl font-bold text-gray-900 mb-1 md:mb-3 tracking-tight">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-gray-500 text-xs md:text-base font-semibold uppercase tracking-wider">
                  {timeLeft.hours === 1 ? 'Hour' : 'Hours'}
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>

            {/* Minutes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative group"
            >
              <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-8 border-2 border-gray-200 hover:border-red-500 transition-all duration-300 shadow-sm hover:shadow-xl text-center flex flex-col items-center justify-center">
                <div className="text-2xl md:text-6xl font-bold text-gray-900 mb-1 md:mb-3 tracking-tight">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-gray-500 text-xs md:text-base font-semibold uppercase tracking-wider">
                  {timeLeft.minutes === 1 ? 'Minute' : 'Minutes'}
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>

            {/* Seconds */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative group"
            >
              <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-8 border-2 border-gray-200 hover:border-red-500 transition-all duration-300 shadow-sm hover:shadow-xl text-center flex flex-col items-center justify-center">
                <div className="text-2xl md:text-6xl font-bold text-gray-900 mb-1 md:mb-3 tracking-tight">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-gray-500 text-xs md:text-base font-semibold uppercase tracking-wider">
                  {timeLeft.seconds === 1 ? 'Second' : 'Seconds'}
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
