'use client';

import { PageLoadingProvider } from '@/context/PageLoadingContext';
import PageLoaderWrapper from '@/components/PageLoaderWrapper';
import PageTransitionHandler from '@/components/PageTransitionHandler';
import ScrollRestoration from '@/components/ScrollRestoration';
import Navigation from '@/components/Navigation';
import dynamic from 'next/dynamic';

// Dynamically import Footer to reduce initial bundle
const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true,
});

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PageLoadingProvider>
      <PageLoaderWrapper />
      <PageTransitionHandler />
      <ScrollRestoration />
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </PageLoadingProvider>
  );
}

