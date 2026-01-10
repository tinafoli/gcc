'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { usePageLoading } from '@/context/PageLoadingContext';

export default function PageTransitionHandler() {
  const pathname = usePathname();
  const { startLoading, stopLoading } = usePageLoading();
  const isInitialMount = useRef(true);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // On initial mount, start loading and wait for everything to be ready
    if (isInitialMount.current) {
      isInitialMount.current = false;
      startLoading();

      // Wait for all critical resources to load
      const waitForPageReady = () => {
        // Check if document is fully loaded
        if (document.readyState !== 'complete') {
          window.addEventListener('load', waitForPageReady, { once: true });
          return;
        }

        // Wait for images to load, especially the hero carousel images
        // Poll for images until they appear in DOM, then wait for them to load
        const waitForImages = (): Promise<void> => {
          return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 20; // Check for up to 2 seconds (20 * 100ms)
            
            const checkImages = () => {
              const images = document.querySelectorAll('img');
              const priorityImages = Array.from(images).filter((img) => {
                const src = img.getAttribute('src') || '';
                const loading = img.getAttribute('loading');
                // Prioritize hero images, logo, and eager loading images
                return (
                  loading === 'eager' ||
                  src.includes('hero') ||
                  src.includes('gcc-logo') ||
                  src.includes('welcome') ||
                  src.includes('slide')
                );
              });
              
              // If we found priority images, wait for them to load
              if (priorityImages.length > 0) {
                Promise.all(
                  priorityImages.map((img) => {
                    if ((img as HTMLImageElement).complete && (img as HTMLImageElement).naturalHeight > 0) {
                      return Promise.resolve();
                    }
                    return new Promise<void>((imgResolve) => {
                      const timeout = setTimeout(() => imgResolve(), 4000); // Max 4s per image
                      img.addEventListener('load', () => {
                        clearTimeout(timeout);
                        imgResolve();
                      }, { once: true });
                      img.addEventListener('error', () => {
                        clearTimeout(timeout);
                        imgResolve(); // Resolve even on error to continue
                      }, { once: true });
                    });
                  })
                ).then(() => resolve());
                return;
              }
              
              // If no priority images found yet, check again after a delay
              attempts++;
              if (attempts >= maxAttempts) {
                // Timeout - resolve anyway to prevent infinite waiting
                resolve();
                return;
              }
              
              setTimeout(checkImages, 100);
            };
            
            // Start checking after giving DOM time to render
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                checkImages();
              });
            });
          });
        };
        
        const imagePromises = waitForImages();

        // Wait for fonts to load
        const fontPromises = document.fonts ? document.fonts.ready : Promise.resolve();

        // Wait for a minimum time to ensure smooth transition and content compilation
        const minLoadTime = new Promise<void>((resolve) => setTimeout(resolve, 1500));

        // Wait for all promises to resolve
        Promise.all([imagePromises, fontPromises, minLoadTime]).then(() => {
          // Small delay to ensure all React components are rendered
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              initialLoadDone.current = true;
              stopLoading();
            });
          });
        });
      };

      waitForPageReady();
    } else {
      // On route changes, start loading and wait for new page
      startLoading();
      
      const stopLoadingAfterDelay = () => {
        const timer = setTimeout(() => {
          stopLoading();
        }, 1000);
        return () => clearTimeout(timer);
      };

      if (document.readyState === 'complete') {
        stopLoadingAfterDelay();
      } else {
        window.addEventListener('load', stopLoadingAfterDelay, { once: true });
        return () => {
          window.removeEventListener('load', stopLoadingAfterDelay);
        };
      }
    }
  }, [pathname, startLoading, stopLoading]);

  return null;
}



