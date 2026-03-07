'use client';

import { PageLoadingProvider, usePageLoading } from '@/context/PageLoadingContext';
import PageLoaderWrapper from '@/components/PageLoaderWrapper';
import PageTransitionHandler from '@/components/PageTransitionHandler';
import ScrollRestoration from '@/components/ScrollRestoration';
import Navigation from '@/components/Navigation';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// Dynamically import Footer to reduce initial bundle
const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true,
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = usePageLoading();
  const pathname = usePathname();
  const isWorkbookPage = pathname.startsWith('/workbook-launch') || pathname.startsWith('/order-workbook');
  
  return (
    <>
      <PageLoaderWrapper />
      <PageTransitionHandler />
      <ScrollRestoration />
      {!isWorkbookPage && <Navigation />}
      {/* Hide main content until preloader is done - prevents FOUC */}
      {/* translateY(-200vh) moves content off-screen so IntersectionObserver won't fire whileInView animations prematurely */}
      <main 
        className={`flex-grow overflow-x-hidden w-full max-w-full transition-opacity duration-300 ${
          isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ 
          visibility: isLoading ? 'hidden' : 'visible',
          transform: isLoading ? 'translateY(-200vh)' : undefined,
        }}
      >
        {children}
      </main>
      {!isWorkbookPage && <Footer />}
    </>
  );
}

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PageLoadingProvider>
      <LayoutContent>{children}</LayoutContent>
    </PageLoadingProvider>
  );
}

