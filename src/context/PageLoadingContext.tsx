'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

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

