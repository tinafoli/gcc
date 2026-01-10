'use client';

import { useEffect } from 'react';
import { saveScrollPosition, restoreScrollPosition } from '@/utils/scrollUtils';

export default function ScrollRestoration() {
  useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window === 'undefined') {
      return;
    }

    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Use requestAnimationFrame for smoother restoration
    requestAnimationFrame(() => {
      restoreScrollPosition();
    });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
} 