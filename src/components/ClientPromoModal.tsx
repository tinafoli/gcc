'use client';

import { useState, useEffect } from 'react';
import PromoModal from './PromoModal';

export default function ClientPromoModal() {
  const [shouldShow, setShouldShow] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log('ClientPromoModal mounted, isClient:', true);
    
    // Show modal after 3 seconds
    const timer = setTimeout(() => {
      console.log('Timer fired - showing modal');
      setShouldShow(true);
    }, 3000);

    return () => {
      console.log('Cleaning up timer');
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    console.log('Modal closing');
    setShouldShow(false);
  };

  if (!isClient) {
    console.log('Not client side yet, returning null');
    return null;
  }

  if (!shouldShow) {
    console.log('Should not show modal, returning null');
    return null;
  }

  console.log('Rendering PromoModal');
  return <PromoModal onClose={handleClose} />;
} 