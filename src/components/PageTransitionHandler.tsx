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
        // Start checking for images immediately, don't wait for document.readyState
        // This allows us to catch images as they're being rendered

        // Wait for images to load, especially the hero carousel images
        // Poll for images until they appear in DOM, then wait for them to load
        const waitForImages = (): Promise<void> => {
          return new Promise((resolve) => {
            let searchAttempts = 0;
            const maxSearchAttempts = 40; // Check for up to 4 seconds to find images (40 * 100ms)
            let imagesFound = false;
            let allImagesLoaded = false;
            
            // Expected carousel images on homepage
            const expectedHeroImages = [
              '/images/hero/welcome.jpg',
              '/images/hero/slide1.jpg',
              '/images/hero/slide2.jpg',
              '/images/hero/slide3.jpg',
              '/images/hero/slide4.jpg',
              '/images/hero/slide5.jpg',
              '/images/hero/slide6.jpg'
            ];
            
            const expectedProgramImages = [
              '/images/coolest-projects.jpg',
              '/images/digital-village.jpg',
              '/images/summer-camp.jpg',
              '/images/mentorship.jpg',
              '/images/girls-in-tech.jpg',
              '/images/adults-tech.jpg',
              '/images/code-club.jpg',
              '/images/teacher-training.jpg',
              '/images/saturday-school.jpg'
            ];
            
            // Images expected on programs page
            const expectedProgramsPageImages = [
              '/images/hero/slide1.jpg', // Hero image
              '/images/girls-in-tech.jpg',
              '/images/teacher-training.jpg',
              '/images/adults-tech.jpg',
              '/images/mentorship.jpg'
            ];
            
            // Images expected on about page
            const expectedAboutPageImages = [
              '/images/about-hero.jpg' // Hero image
            ];
            
            // Images expected on partners page
            const expectedPartnersPageImages = [
              '/images/partners-hero.jpg' // Hero image
            ];
            
            // Images expected on blog page (blog post images with priority)
            // Note: Blog page doesn't have a hero image, but first 2 blog posts have priority
            const expectedBlogPageImages: string[] = []; // Will detect priority images dynamically
            
            // Images expected on contact page
            const expectedContactPageImages = [
              '/images/contact-hero.jpg' // Hero image
            ];
            
            // Function to wait for specific images to load
            const waitForImageLoad = (images: HTMLImageElement[]): Promise<void> => {
              return new Promise((imgResolve) => {
                // Filter out images that are already fully loaded
                const imagesToLoad = images.filter(img => 
                  !(img.complete && img.naturalHeight > 0 && img.naturalWidth > 0)
                );
                
                // If all images are already loaded, resolve immediately
                if (imagesToLoad.length === 0) {
                  imgResolve();
                  return;
                }
                
                const imagePromises = imagesToLoad.map((img) => {
                  return new Promise<void>((singleImgResolve) => {
                    const timeout = setTimeout(() => {
                      singleImgResolve(); // Timeout after 10s per image
                    }, 10000);
                    
                    const onLoad = () => {
                      clearTimeout(timeout);
                      singleImgResolve();
                    };
                    
                    const onError = () => {
                      clearTimeout(timeout);
                      singleImgResolve(); // Resolve even on error to continue
                    };
                    
                    // Check if already loaded (race condition)
                    if (img.complete && img.naturalHeight > 0 && img.naturalWidth > 0) {
                      clearTimeout(timeout);
                      singleImgResolve();
                      return;
                    }
                    
                    // Listen for load/error events
                    img.addEventListener('load', onLoad, { once: true });
                    img.addEventListener('error', onError, { once: true });
                    
                    // Polling check for images that load before listeners attach
                    const checkInterval = setInterval(() => {
                      if (img.complete && img.naturalHeight > 0 && img.naturalWidth > 0) {
                        clearInterval(checkInterval);
                        clearTimeout(timeout);
                        singleImgResolve();
                      }
                    }, 100);
                    
                    // Clear interval after timeout
                    setTimeout(() => clearInterval(checkInterval), 10000);
                  });
                });
                
                Promise.all(imagePromises).then(() => {
                  // Final verification
                  const allLoaded = images.every(img => 
                    img.complete && img.naturalHeight > 0 && img.naturalWidth > 0
                  );
                  
                  if (allLoaded) {
                    allImagesLoaded = true;
                    imgResolve();
                  } else {
                    // If not all loaded, wait a bit and check again (images might still be loading)
                    setTimeout(() => {
                      const stillLoading = images.filter(img => 
                        !(img.complete && img.naturalHeight > 0 && img.naturalWidth > 0)
                      );
                      if (stillLoading.length === 0) {
                        allImagesLoaded = true;
                        imgResolve();
                      } else {
                        // Some images failed or are still loading, resolve anyway after timeout
                        imgResolve();
                      }
                    }, 500);
                  }
                });
              });
            };
            
            const checkImages = () => {
              // Next.js Image wraps img in a span, so query all img tags
              const images = document.querySelectorAll('img');
              const allImages = Array.from(images) as HTMLImageElement[];
              
              // Find all carousel images (hero and program cards)
              const carouselImages = allImages.filter((img) => {
                // Get all possible src attributes (Next.js optimizes images)
                // Next.js Image uses _next/image optimization, so check for the original URL in the src
                const src = img.getAttribute('src') || '';
                const srcset = img.getAttribute('srcset') || '';
                const currentSrc = img.currentSrc || img.src || '';
                const dataSrc = img.getAttribute('data-src') || '';
                // Also check the parent span/div for data attributes that Next.js might use
                const parent = img.parentElement;
                const parentSrc = parent?.getAttribute('data-src') || parent?.getAttribute('data-original') || '';
                const combinedSrc = (src + ' ' + srcset + ' ' + currentSrc + ' ' + dataSrc + ' ' + parentSrc).toLowerCase();
                
                // Check if image has priority attribute (Next.js adds fetchpriority="high" or loading="eager")
                const hasPriority = img.getAttribute('fetchpriority') === 'high' || 
                                   img.getAttribute('loading') === 'eager' ||
                                   img.closest('[data-priority]') !== null ||
                                   // Check parent for priority indicator
                                   (parent && (parent.getAttribute('data-priority') === 'true' || 
                                               parent.querySelector('[data-priority]') !== null));
                
                // Check if image is in a hero section (common patterns)
                const isInHeroSection = img.closest('section[class*="hero"]') !== null ||
                                       img.closest('[class*="Hero"]') !== null ||
                                       img.closest('[class*="hero"]') !== null ||
                                       // Check if parent has hero-related classes
                                       (parent && (
                                         parent.classList.toString().toLowerCase().includes('hero') ||
                                         parent.closest('section')?.classList.toString().toLowerCase().includes('hero')
                                       ));
                
                // Check for hero carousel images (by filename)
                const isHeroImage = expectedHeroImages.some(expected => {
                  const filename = expected.split('/').pop() || '';
                  const encodedFilename = encodeURIComponent(filename);
                  return combinedSrc.includes(filename.toLowerCase()) || 
                         combinedSrc.includes(encodedFilename.toLowerCase()) ||
                         (combinedSrc.includes('/hero/') && (combinedSrc.includes('welcome') || combinedSrc.includes('slide')));
                });
                
                // Check for program card images (only on homepage)
                const isProgramImage = pathname === '/' && expectedProgramImages.some(expected => {
                  const filename = expected.split('/').pop() || '';
                  const encodedFilename = encodeURIComponent(filename);
                  return combinedSrc.includes(filename.toLowerCase()) || 
                         combinedSrc.includes(encodedFilename.toLowerCase());
                });
                
                // Check for programs page images
                const isProgramsPageImage = pathname === '/programs' && expectedProgramsPageImages.some(expected => {
                  const filename = expected.split('/').pop() || '';
                  const encodedFilename = encodeURIComponent(filename);
                  return combinedSrc.includes(filename.toLowerCase()) || 
                         combinedSrc.includes(encodedFilename.toLowerCase());
                });
                
                // Check for about page images
                const isAboutPageImage = pathname === '/about' && expectedAboutPageImages.some(expected => {
                  const filename = expected.split('/').pop() || '';
                  const encodedFilename = encodeURIComponent(filename);
                  return combinedSrc.includes(filename.toLowerCase()) || 
                         combinedSrc.includes(encodedFilename.toLowerCase());
                });
                
                // Check for partners page images
                const isPartnersPageImage = pathname === '/partners' && expectedPartnersPageImages.some(expected => {
                  const filename = expected.split('/').pop() || '';
                  const encodedFilename = encodeURIComponent(filename);
                  return combinedSrc.includes(filename.toLowerCase()) || 
                         combinedSrc.includes(encodedFilename.toLowerCase());
                });
                
                // Check for blog page images (blog post images with priority)
                // Blog page images are in /images/blog/ directory
                const isBlogPageImage = pathname === '/blog' && 
                                       (combinedSrc.includes('/blog/') || combinedSrc.includes('/images/blog/'));
                
                // Check for contact page images
                const isContactPageImage = pathname === '/contact' && expectedContactPageImages.some(expected => {
                  const filename = expected.split('/').pop() || '';
                  const encodedFilename = encodeURIComponent(filename);
                  return combinedSrc.includes(filename.toLowerCase()) || 
                         combinedSrc.includes(encodedFilename.toLowerCase());
                });
                
                // Check if image is in hero carousel swiper container
                // Next.js Image wraps img in a span, so check parent containers
                const swiperSlide = img.closest('.swiper-slide');
                const isInHeroCarousel = swiperSlide !== null;
                
                // Also check if image is in a program card container (for program cards carousel)
                // Look for the scroll container that holds program cards
                const scrollContainer = img.closest('[class*="overflow-x-auto"]');
                const isInProgramCard = pathname === '/' && 
                                       scrollContainer !== null &&
                                       img.closest('[class*="snap-center"]') !== null &&
                                       // Verify it's actually a program image by checking nearby text
                                       (img.closest('div')?.querySelector('h3') !== null);
                
                // Check for logo (only on homepage) - but skip if it's in navigation
                const isLogo = pathname === '/' && 
                               combinedSrc.includes('gcc-logo') && 
                               img.closest('nav') === null;
                
                // For programs page, include priority images, hero images, images in hero sections,
                // and any image with /hero/ in the path (likely the hero background)
                if (pathname === '/programs') {
                  const isHeroPath = combinedSrc.includes('/hero/');
                  return isHeroImage || isProgramsPageImage || hasPriority || isInHeroSection || isHeroPath;
                }
                
                // For about page, include priority images, hero images, images in hero sections,
                // and about page specific images
                if (pathname === '/about') {
                  return isAboutPageImage || hasPriority || isInHeroSection;
                }
                
                // For partners page, include priority images, hero images, images in hero sections,
                // and partners page specific images
                if (pathname === '/partners') {
                  return isPartnersPageImage || hasPriority || isInHeroSection;
                }
                
                // For blog page, include priority images (first 2 blog posts) and blog post images
                if (pathname === '/blog') {
                  return isBlogPageImage || hasPriority;
                }
                
                // For contact page, include priority images, hero images, images in hero sections,
                // and contact page specific images
                if (pathname === '/contact') {
                  return isContactPageImage || hasPriority || isInHeroSection;
                }
                
                return isHeroImage || isProgramImage || isInHeroCarousel || isInProgramCard || isLogo;
              });
              
              // If we found carousel images, wait for ALL of them to load
              // On homepage, we expect at least 7 hero images
              // On programs page, we expect at least 1 hero image (and potentially more priority images)
              // On about page, we expect at least 1 hero image (and potentially more priority images)
              // On partners page, we expect at least 1 hero image (and potentially more priority images)
              // On blog page, we expect at least 2 priority blog post images (first 2 posts)
              // On contact page, we expect at least 1 hero image (and potentially more priority images)
              // We'll do multiple passes to ensure we catch all images as they render
              const minExpectedImages = pathname === '/' ? 7 : 
                                       (pathname === '/programs' ? 1 : 
                                       (pathname === '/about' ? 1 : 
                                       (pathname === '/partners' ? 1 : 
                                       (pathname === '/blog' ? 2 : 
                                       (pathname === '/contact' ? 1 : 1)))));
              
              if (carouselImages.length >= minExpectedImages && !imagesFound) {
                imagesFound = true;
                
                // Do multiple passes to catch all images as they progressively render
                // Next.js might render images in batches, so we check multiple times
                const collectAllImages = (): HTMLImageElement[] => {
                  const allImgs = document.querySelectorAll('img');
                  const allImgElements = Array.from(allImgs) as HTMLImageElement[];
                  
                  return allImgElements.filter((img) => {
                    const src = (img.getAttribute('src') || img.currentSrc || img.src || '').toLowerCase();
                    const srcset = (img.getAttribute('srcset') || '').toLowerCase();
                    const parent = img.parentElement;
                    const parentSrc = parent?.getAttribute('data-src') || '';
                    const combinedSrc = (src + ' ' + srcset + ' ' + parentSrc).toLowerCase();
                    
                    const isHeroImage = expectedHeroImages.some(expected => {
                      const filename = expected.split('/').pop() || '';
                      return combinedSrc.includes(filename.toLowerCase()) || 
                             (combinedSrc.includes('/hero/') && (combinedSrc.includes('welcome') || combinedSrc.includes('slide')));
                    });
                    
                    const isProgramImage = pathname === '/' && expectedProgramImages.some(expected => {
                      const filename = expected.split('/').pop() || '';
                      return combinedSrc.includes(filename.toLowerCase());
                    });
                    
                    const isProgramsPageImage = pathname === '/programs' && expectedProgramsPageImages.some(expected => {
                      const filename = expected.split('/').pop() || '';
                      return combinedSrc.includes(filename.toLowerCase());
                    });
                    
                    const isAboutPageImage = pathname === '/about' && expectedAboutPageImages.some(expected => {
                      const filename = expected.split('/').pop() || '';
                      return combinedSrc.includes(filename.toLowerCase());
                    });
                    
                    const isPartnersPageImage = pathname === '/partners' && expectedPartnersPageImages.some(expected => {
                      const filename = expected.split('/').pop() || '';
                      return combinedSrc.includes(filename.toLowerCase());
                    });
                    
                    // Check for blog page images (blog post images with priority)
                    const isBlogPageImage = pathname === '/blog' && 
                                           (combinedSrc.includes('/blog/') || combinedSrc.includes('/images/blog/'));
                    
                    const isContactPageImage = pathname === '/contact' && expectedContactPageImages.some(expected => {
                      const filename = expected.split('/').pop() || '';
                      return combinedSrc.includes(filename.toLowerCase());
                    });
                    
                    const hasPriority = img.getAttribute('fetchpriority') === 'high' || 
                                       img.getAttribute('loading') === 'eager' ||
                                       img.closest('[data-priority]') !== null;
                    
                    // Check if image is in a hero section (common patterns)
                    const isInHeroSection = img.closest('section[class*="hero"]') !== null ||
                                           img.closest('[class*="Hero"]') !== null ||
                                           img.closest('[class*="hero"]') !== null ||
                                           (parent && (
                                             parent.classList.toString().toLowerCase().includes('hero') ||
                                             parent.closest('section')?.classList.toString().toLowerCase().includes('hero')
                                           ));
                    
                    const isInHeroCarousel = img.closest('.swiper-slide') !== null;
                    // More specific check for program cards - look for the scroll container
                    const scrollContainer = img.closest('[class*="overflow-x-auto"]');
                    const isInProgramCard = pathname === '/' && 
                                           scrollContainer !== null &&
                                           img.closest('[class*="snap-center"]') !== null &&
                                           (img.closest('div')?.querySelector('h3') !== null);
                    const isLogo = pathname === '/' && combinedSrc.includes('gcc-logo') && img.closest('nav') === null;
                    
                    // For programs page, include priority images, hero images, images in hero sections,
                    // and any image with /hero/ in the path (likely the hero background)
                    if (pathname === '/programs') {
                      const isHeroPath = combinedSrc.includes('/hero/');
                      return isHeroImage || isProgramsPageImage || hasPriority || isInHeroSection || isHeroPath;
                    }
                    
                    // For about page, include priority images, hero images, images in hero sections,
                    // and about page specific images
                    if (pathname === '/about') {
                      return isAboutPageImage || hasPriority || isInHeroSection;
                    }
                    
                    // For partners page, include priority images, hero images, images in hero sections,
                    // and partners page specific images
                    if (pathname === '/partners') {
                      return isPartnersPageImage || hasPriority || isInHeroSection;
                    }
                    
                    // For blog page, include priority images (first 2 blog posts) and blog post images
                    if (pathname === '/blog') {
                      return isBlogPageImage || hasPriority;
                    }
                    
                    // For contact page, include priority images, hero images, images in hero sections,
                    // and contact page specific images
                    if (pathname === '/contact') {
                      return isContactPageImage || hasPriority || isInHeroSection;
                    }
                    
                    return isHeroImage || isProgramImage || isInHeroCarousel || isInProgramCard || isLogo;
                  });
                };
                
                // First pass: collect initial images
                let imagesToWaitFor = collectAllImages();
                
                // Second pass after 300ms: catch images that render slightly later
                setTimeout(() => {
                  const secondPass = collectAllImages();
                  if (secondPass.length > imagesToWaitFor.length) {
                    imagesToWaitFor = secondPass;
                  }
                  
                  // Third pass after another 300ms: final check
                  setTimeout(() => {
                    const thirdPass = collectAllImages();
                    if (thirdPass.length > imagesToWaitFor.length) {
                      imagesToWaitFor = thirdPass;
                    }
                    
                    // Now wait for all collected images to load
                    waitForImageLoad(imagesToWaitFor).then(() => {
                      resolve();
                    });
                  }, 300);
                }, 300);
                return;
              }
              
              // If we found some images but not enough, keep searching
              if (carouselImages.length > 0 && carouselImages.length < minExpectedImages && !imagesFound) {
                searchAttempts++;
                if (searchAttempts >= maxSearchAttempts) {
                  // If we've been searching too long, use what we found
                  imagesFound = true;
                  waitForImageLoad(carouselImages).then(() => {
                    resolve();
                  });
                  return;
                }
                setTimeout(checkImages, 100);
                return;
              }
              
              // If images were found and we're waiting, don't search again
              if (imagesFound) {
                return;
              }
              
              // If no carousel images found yet, check again after a delay
              searchAttempts++;
              if (searchAttempts >= maxSearchAttempts) {
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
        
        // Start checking for images immediately
        const imagePromises = waitForImages();

        // Also wait for document to be ready (but don't block on it)
        const documentReady = new Promise<void>((resolve) => {
          if (document.readyState === 'complete') {
            resolve();
          } else {
            window.addEventListener('load', () => resolve(), { once: true });
            // Timeout after 5 seconds to prevent blocking
            setTimeout(() => resolve(), 5000);
          }
        });

        // Wait for fonts to load
        const fontPromises = document.fonts ? document.fonts.ready : Promise.resolve();

        // Wait for a minimum time to ensure smooth transition and content compilation
        const minLoadTime = new Promise<void>((resolve) => setTimeout(resolve, 1500));

        // Wait for all promises to resolve
        Promise.all([imagePromises, documentReady, fontPromises, minLoadTime]).then(() => {
          // Small delay to ensure all React components are rendered
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              initialLoadDone.current = true;
              stopLoading();
            });
          });
        });
      };

      // Start immediately, don't wait for document.readyState
      waitForPageReady();
    } else {
      // On route changes, start loading and wait for new page images
      startLoading();
      
      const waitForRouteChangeImages = () => {
        // Wait for images to load on the new page
        const waitForImages = (): Promise<void> => {
          return new Promise((resolve) => {
            let searchAttempts = 0;
            const maxSearchAttempts = 20; // Check for up to 2 seconds (20 * 100ms)
            let imagesFound = false;
            
            // Expected images based on pathname
            const expectedHeroImages = [
              '/images/hero/welcome.jpg',
              '/images/hero/slide1.jpg',
              '/images/hero/slide2.jpg',
              '/images/hero/slide3.jpg',
              '/images/hero/slide4.jpg',
              '/images/hero/slide5.jpg',
              '/images/hero/slide6.jpg'
            ];
            
            const expectedProgramImages = [
              '/images/coolest-projects.jpg',
              '/images/digital-village.jpg',
              '/images/summer-camp.jpg',
              '/images/mentorship.jpg',
              '/images/girls-in-tech.jpg',
              '/images/adults-tech.jpg',
              '/images/code-club.jpg',
              '/images/teacher-training.jpg',
              '/images/saturday-school.jpg'
            ];
            
            const expectedProgramsPageImages = ['/images/hero/slide1.jpg'];
            const expectedAboutPageImages = ['/images/about-hero.jpg'];
            const expectedPartnersPageImages = ['/images/partners-hero.jpg'];
            const expectedContactPageImages = ['/images/contact-hero.jpg'];
            
            const waitForImageLoad = (images: HTMLImageElement[]): Promise<void> => {
              return new Promise((imgResolve) => {
                const imagesToLoad = images.filter(img => 
                  !(img.complete && img.naturalHeight > 0 && img.naturalWidth > 0)
                );
                
                if (imagesToLoad.length === 0) {
                  imgResolve();
                  return;
                }
                
                const imagePromises = imagesToLoad.map((img) => {
                  return new Promise<void>((singleImgResolve) => {
                    const timeout = setTimeout(() => {
                      singleImgResolve();
                    }, 5000); // 5s timeout per image for route changes
                    
                    const onLoad = () => {
                      clearTimeout(timeout);
                      singleImgResolve();
                    };
                    
                    const onError = () => {
                      clearTimeout(timeout);
                      singleImgResolve();
                    };
                    
                    if (img.complete && img.naturalHeight > 0 && img.naturalWidth > 0) {
                      clearTimeout(timeout);
                      singleImgResolve();
                      return;
                    }
                    
                    img.addEventListener('load', onLoad, { once: true });
                    img.addEventListener('error', onError, { once: true });
                    
                    const checkInterval = setInterval(() => {
                      if (img.complete && img.naturalHeight > 0 && img.naturalWidth > 0) {
                        clearInterval(checkInterval);
                        clearTimeout(timeout);
                        singleImgResolve();
                      }
                    }, 100);
                    
                    setTimeout(() => clearInterval(checkInterval), 5000);
                  });
                });
                
                Promise.all(imagePromises).then(() => {
                  imgResolve();
                });
              });
            };
            
            const checkImages = () => {
              const images = document.querySelectorAll('img');
              const allImages = Array.from(images) as HTMLImageElement[];
              
              const criticalImages = allImages.filter((img) => {
                const src = (img.getAttribute('src') || img.currentSrc || img.src || '').toLowerCase();
                const srcset = (img.getAttribute('srcset') || '').toLowerCase();
                const parent = img.parentElement;
                const parentSrc = parent?.getAttribute('data-src') || '';
                const combinedSrc = (src + ' ' + srcset + ' ' + parentSrc).toLowerCase();
                
                const hasPriority = img.getAttribute('fetchpriority') === 'high' || 
                                   img.getAttribute('loading') === 'eager';
                
                const isInHeroSection = img.closest('section[class*="hero"]') !== null ||
                                       img.closest('[class*="Hero"]') !== null ||
                                       img.closest('[class*="hero"]') !== null;
                
                // Check for homepage images
                if (pathname === '/') {
                  const isHeroImage = expectedHeroImages.some(expected => {
                    const filename = expected.split('/').pop() || '';
                    return combinedSrc.includes(filename.toLowerCase()) || 
                           (combinedSrc.includes('/hero/') && (combinedSrc.includes('welcome') || combinedSrc.includes('slide')));
                  });
                  
                  const isProgramImage = expectedProgramImages.some(expected => {
                    const filename = expected.split('/').pop() || '';
                    return combinedSrc.includes(filename.toLowerCase());
                  });
                  
                  const isInHeroCarousel = img.closest('.swiper-slide') !== null;
                  const scrollContainer = img.closest('[class*="overflow-x-auto"]');
                  const isInProgramCard = scrollContainer !== null &&
                                         img.closest('[class*="snap-center"]') !== null &&
                                         (img.closest('div')?.querySelector('h3') !== null);
                  
                  return isHeroImage || isProgramImage || isInHeroCarousel || isInProgramCard || hasPriority;
                }
                
                // Check for other pages
                if (pathname === '/programs') {
                  const isProgramsPageImage = expectedProgramsPageImages.some(expected => {
                    const filename = expected.split('/').pop() || '';
                    return combinedSrc.includes(filename.toLowerCase());
                  });
                  return isProgramsPageImage || hasPriority || isInHeroSection;
                }
                
                if (pathname === '/about') {
                  const isAboutPageImage = expectedAboutPageImages.some(expected => {
                    const filename = expected.split('/').pop() || '';
                    return combinedSrc.includes(filename.toLowerCase());
                  });
                  return isAboutPageImage || hasPriority || isInHeroSection;
                }
                
                if (pathname === '/partners') {
                  const isPartnersPageImage = expectedPartnersPageImages.some(expected => {
                    const filename = expected.split('/').pop() || '';
                    return combinedSrc.includes(filename.toLowerCase());
                  });
                  return isPartnersPageImage || hasPriority || isInHeroSection;
                }
                
                if (pathname === '/blog') {
                  return combinedSrc.includes('/blog/') || hasPriority;
                }
                
                if (pathname === '/contact') {
                  const isContactPageImage = expectedContactPageImages.some(expected => {
                    const filename = expected.split('/').pop() || '';
                    return combinedSrc.includes(filename.toLowerCase());
                  });
                  return isContactPageImage || hasPriority || isInHeroSection;
                }
                
                return hasPriority || isInHeroSection;
              });
              
              const minExpectedImages = pathname === '/' ? 7 : 
                                       (pathname === '/programs' ? 1 : 
                                       (pathname === '/about' ? 1 : 
                                       (pathname === '/partners' ? 1 : 
                                       (pathname === '/blog' ? 2 : 
                                       (pathname === '/contact' ? 1 : 1)))));
              
              if (criticalImages.length >= minExpectedImages && !imagesFound) {
                imagesFound = true;
                waitForImageLoad(criticalImages).then(() => {
                  resolve();
                });
                return;
              }
              
              searchAttempts++;
              if (searchAttempts >= maxSearchAttempts) {
                // Timeout - resolve anyway
                if (criticalImages.length > 0) {
                  waitForImageLoad(criticalImages).then(() => {
                    resolve();
                  });
                } else {
                  resolve();
                }
                return;
              }
              
              setTimeout(checkImages, 100);
            };
            
            // Start checking after a small delay to allow DOM to update
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                checkImages();
              });
            });
          });
        };
        
        // Wait for images and a minimum time
        const imagePromises = waitForImages();
        const minLoadTime = new Promise<void>((resolve) => setTimeout(resolve, 800)); // Shorter min time for route changes
        
        Promise.all([imagePromises, minLoadTime]).then(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              stopLoading();
            });
          });
        });
      };
      
      // Wait a bit for the route to change and DOM to update
      setTimeout(() => {
        waitForRouteChangeImages();
      }, 100);
    }
  }, [pathname, startLoading, stopLoading]);

  return null;
}



