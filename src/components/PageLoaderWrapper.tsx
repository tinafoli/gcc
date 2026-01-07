'use client';

import { usePageLoading } from '@/context/PageLoadingContext';
import dynamic from 'next/dynamic';

const PageLoader = dynamic(() => import('@/components/PageLoader'), {
  ssr: false,
});

export default function PageLoaderWrapper() {
  const { isLoading } = usePageLoading();
  return <PageLoader isLoading={isLoading} />;
}


