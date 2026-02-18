'use client';

import { usePageLoading } from '@/context/PageLoadingContext';
import PageLoader from '@/components/PageLoader';

export default function PageLoaderWrapper() {
  const { isLoading } = usePageLoading();
  return <PageLoader isLoading={isLoading} />;
}



