'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

interface PageLoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const PageLoadingContext = createContext<PageLoadingContextType>({
  isLoading: true, // Start as true to show preloader immediately
  startLoading: () => {},
  stopLoading: () => {},
});

export function PageLoadingProvider({ children }: { children: ReactNode }) {
  // Start with true on initial load to show preloader immediately, then check if we need to hide it
  const [isLoading, setIsLoading] = useState(true);

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

