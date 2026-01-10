'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { usePageLoading } from '@/context/PageLoadingContext';

export default function PageTransitionHandler() {
  const pathname = usePathname();
  const { startLoading, stopLoading } = usePageLoading();

  useEffect(() => {
    // Start loading on pathname change (navigation)
    startLoading();
    
    // Stop loading after page is ready
    // Give a minimum time for smooth transition and content to load
    const stopLoadingAfterDelay = () => {
      const timer = setTimeout(() => {
        stopLoading();
      }, 1000); // Minimum 1s for preloader visibility and content compilation
      return () => clearTimeout(timer);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      return stopLoadingAfterDelay();
    } else {
      // Wait for page load event
      window.addEventListener('load', stopLoadingAfterDelay, { once: true });
      return () => {
        window.removeEventListener('load', stopLoadingAfterDelay);
      };
    }
  }, [pathname, startLoading, stopLoading]);

  return null;
}



