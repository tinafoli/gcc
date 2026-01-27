'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProgramImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProgramImage({ src, alt, className }: ProgramImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className={className}
      onError={() => setError(true)}
    />
  );
} 