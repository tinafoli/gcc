'use client';

import { useState, useEffect } from 'react';
import PromoModal from './PromoModal';

interface ClientPromoModalProps {
  enabled?: boolean;
  delayMs?: number;
  announcement?: {
    eventTitle: string;
    date: string;
    time: string;
    location: string;
    image: string;
    description: string;
    buttonUrl: string;
    buttonText: string;
    badge: string;
    title: string;
  };
}

export default function ClientPromoModal({ enabled = false, delayMs = 3000, announcement }: ClientPromoModalProps) {
  const [shouldShow, setShouldShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!enabled) return;
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [enabled, delayMs]);

  const handleClose = () => {
    setShouldShow(false);
  };

  if (!mounted) {
    return null;
  }

  if (!shouldShow) {
    return null;
  }

  return <PromoModal onClose={handleClose} announcement={announcement} />;
} 