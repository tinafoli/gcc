'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  fallbackSrc = '/images/placeholder.jpg',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading && retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setCurrentSrc(prev => `${prev}?retry=${retryCount}`);
      } else if (isLoading && retryCount >= 3) {
        setError(true);
        setCurrentSrc(fallbackSrc);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeoutId);
  }, [isLoading, retryCount, fallbackSrc]);

  const handleError = () => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      setCurrentSrc(`${src}?retry=${retryCount}`);
    } else {
      setError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
          ${error ? 'opacity-50' : ''}
        `}
        onLoadingComplete={() => setIsLoading(false)}
        onError={handleError}
        priority={priority}
        quality={quality}
        loading={priority ? 'eager' : 'lazy'}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-xs text-gray-500">Image not available</span>
        </div>
      )}
    </div>
  );
} 