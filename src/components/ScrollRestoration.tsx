'use client';

import { useEffect } from 'react';
import { saveScrollPosition, restoreScrollPosition } from '@/utils/scrollUtils';

export default function ScrollRestoration() {
  useEffect(() => {
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