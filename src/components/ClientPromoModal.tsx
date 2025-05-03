'use client';

import { useState, useEffect } from 'react';
import PromoModal from './PromoModal';

export default function ClientPromoModal() {
  const [shouldShow, setShouldShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShouldShow(false);
  };

  if (!mounted) {
    return null;
  }

  if (!shouldShow) {
    return null;
  }

  return <PromoModal onClose={handleClose} />;
} 