'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
} 