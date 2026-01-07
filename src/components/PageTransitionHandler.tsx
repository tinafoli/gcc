'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { usePageLoading } from '@/context/PageLoadingContext';

export default function PageTransitionHandler() {
  const pathname = usePathname();
  const { stopLoading } = usePageLoading();

  useEffect(() => {
    // Stop loading when pathname changes (page has loaded)
    const timer = setTimeout(() => {
      stopLoading();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, stopLoading]);

  return null;
}


