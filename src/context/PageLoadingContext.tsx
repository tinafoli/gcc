'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

interface PageLoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const PageLoadingContext = createContext<PageLoadingContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export function PageLoadingProvider({ children }: { children: ReactNode }) {
  // Initialize as false to avoid SSR hydration issues, then set to true on client mount
  const [isLoading, setIsLoading] = useState(false);

  // Start loading on client side only to ensure preloader shows on initial visit
  useEffect(() => {
    setIsLoading(true);
  }, []);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <PageLoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </PageLoadingContext.Provider>
  );
}

export function usePageLoading() {
  return useContext(PageLoadingContext);
}

