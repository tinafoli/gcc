'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Delius } from 'next/font/google';

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const programs = [
  {
    title: "Coolest Projects Ghana",
    description: "Showcasing innovative tech projects from Ghana's young creators",
    image: "/images/coolest-projects.jpg",
    tag: "Innovation",
    tagColor: "purple"
  },
  {
    title: "Digital Village Program",
    description: "Bringing technology education to rural communities",
    image: "/images/digital-village.jpg",
    tag: "Community",
    tagColor: "green"
  },
  {
    title: "Summer Code Camp",
    description: "An intensive eight-week program during school holidays that immerses students in coding and technology. Participants work on real-world projects and develop digital skills for the future.",
    image: "/images/summer-camp.jpg",
    tag: "Summer Camp",
    tagColor: "orange"
  },
  {
    title: "Alumni Mentorship Program",
    description: "Connecting students with industry professionals for guidance",
    image: "/images/mentorship.jpg",
    tag: "Mentorship",
    tagColor: "blue"
  },
  {
    title: "100 Girls in STEM",
    description: "Empowering girls through technology and coding education",
    image: "/images/girls-in-tech.jpg",
    tag: "Girls in Tech",
    tagColor: "pink"
  },
  {
    title: "Adults in Tech",
    description: "Digital skills training for adult learners",
    image: "/images/adults-tech.jpg",
    tag: "Adult Learning",
    tagColor: "indigo"
  },
  {
    title: "After School Code Clubs",
    description: "Teacher training and student coding clubs for sustainable learning",
    image: "/images/code-club.jpg",
    tag: "Code Clubs",
    tagColor: "blue"
  },
  {
    title: "Teacher Training",
    description: "Professional development for educators in computer science",
    image: "/images/teacher-training.jpg",
    tag: "Training",
    tagColor: "purple"
  },
  {
    title: "Saturday Coding School",
    description: "A weekly program that provides structured coding education for children aged 5-17. Students learn programming fundamentals and build problem-solving skills in a fun, supportive environment.",
    image: "/images/saturday-school.jpg",
    tag: "Weekend Learning",
    tagColor: "cyan"
  }
];

export default function ProgramCards() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollIntervalRef = useRef<NodeJS.Timeout>();
  const [mobileCardWidth, setMobileCardWidth] = useState<number>(0);

  // Calculate mobile card width based on container
  useEffect(() => {
    const calculateCardWidth = () => {
      if (scrollContainerRef.current && typeof window !== 'undefined' && window.innerWidth < 640) {
        const container = scrollContainerRef.current;
        // Get the container's parent or viewport width
        // Container has px-4 (16px padding on each side = 32px total)
        // Card should be viewport width minus container padding (32px) minus a bit more for spacing
        const viewportWidth = window.innerWidth;
        // Account for container padding: 32px total (16px each side)
        // We want card to be slightly smaller to ensure text doesn't get cut off
        const cardWidth = viewportWidth - 48; // 48px = 3rem for better spacing
        setMobileCardWidth(cardWidth);
      } else {
        setMobileCardWidth(0);
      }
    };

    // Calculate on mount and after a short delay to ensure container is rendered
    calculateCardWidth();
    const timeoutId = setTimeout(calculateCardWidth, 100);
    const timeoutId2 = setTimeout(calculateCardWidth, 500); // Double check after render
    
    window.addEventListener('resize', calculateCardWidth);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
      window.removeEventListener('resize', calculateCardWidth);
    };
  }, []);

  // Add auto-scroll functionality with infinite loop
  useEffect(() => {
    const autoScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        
        // Calculate card width and gap
        const isMobile = window.innerWidth < 640;
        // On mobile, use the calculated card width, on desktop use 300px
        const cardWidth = isMobile ? (mobileCardWidth || (window.innerWidth - 48)) : 300;
        const gap = 24;
        const scrollAmount = cardWidth + gap;
        
        // Check if we've reached the end (with a small buffer for rounding)
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          // Loop back to the beginning
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          // Scroll to next card
          container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
      }
    };

    // Start auto-scrolling after 5 seconds
    scrollIntervalRef.current = setInterval(autoScroll, 5000);

    // Cleanup interval on component unmount
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

  // Add pause functionality on hover
  const handleMouseEnter = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (scrollContainerRef.current) {
      // Restart auto-scroll with infinite loop
      scrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const { scrollLeft, scrollWidth, clientWidth } = container;
          
          const isMobile = window.innerWidth < 640;
          // On mobile, card width is calc(100vw - 2rem), which accounts for padding
          const cardWidth = isMobile ? (window.innerWidth - 32) : 300;
          const gap = 24;
          const scrollAmount = cardWidth + gap;
          
          // Check if we've reached the end (with a small buffer for rounding)
          if (scrollLeft >= scrollWidth - clientWidth - 10) {
            // Loop back to the beginning
            container.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
          } else {
            // Scroll to next card
            container.scrollBy({
              left: scrollAmount,
              behavior: 'smooth'
            });
          }
        }
      }, 5000);
    }
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      
      // Show left arrow if we've scrolled right (or always show for infinite loop)
      setShowLeftArrow(scrollLeft > 10);
      
      // Show right arrow if there's more content to scroll to (or always show for infinite loop)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
      
      // Auto-loop: if user manually scrolls to the end, loop back to start
      if (scrollLeft >= scrollWidth - clientWidth - 10) {
        // Small delay to allow smooth transition
        setTimeout(() => {
          if (scrollContainerRef.current) {
            const { scrollLeft: currentScrollLeft, scrollWidth: currentScrollWidth, clientWidth: currentClientWidth } = scrollContainerRef.current;
            // Only loop if still at the end (user hasn't scrolled back)
            if (currentScrollLeft >= currentScrollWidth - currentClientWidth - 10) {
              scrollContainerRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
              });
            }
          }
        }, 500);
      }
      
      // Auto-loop: if user manually scrolls to the beginning (from the end), stay at beginning
      if (scrollLeft <= 10 && scrollLeft > 0) {
        // This handles the case when looping from end to beginning
        // No action needed, just let it stay at the beginning
      }
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let timeoutId: NodeJS.Timeout;
    
    const debouncedCheckScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScroll, 100);
    };
    
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', debouncedCheckScroll);
      // Initial check
      checkScroll();
      
      return () => {
        scrollContainer.removeEventListener('scroll', debouncedCheckScroll);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;
          const isMobile = window.innerWidth < 640;
          // On mobile, use the calculated card width, on desktop use 300px
          const cardWidth = isMobile ? (mobileCardWidth || (window.innerWidth - 48)) : 300;
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      
      if (direction === 'right') {
        // Check if we're at the end
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          // Loop back to the beginning
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          // Scroll right
          container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
      } else {
        // Check if we're at the beginning
        if (scrollLeft <= 10) {
          // Loop to the end
          container.scrollTo({
            left: scrollWidth - clientWidth,
            behavior: 'smooth'
          });
        } else {
          // Scroll left
          container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const getTagColors = (color: string) => {
    const colors: { [key: string]: { bg: string, text: string } } = {
      pink: { bg: 'bg-pink-100', text: 'text-pink-500' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-500' },
      green: { bg: 'bg-green-100', text: 'text-green-500' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-500' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-500' },
      red: { bg: 'bg-red-100', text: 'text-red-500' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-500' },
      cyan: { bg: 'bg-cyan-100', text: 'text-cyan-500' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Cards Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 px-4 py-6 scrollbar-hide scroll-smooth snap-x snap-mandatory"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {programs.map((program, index) => {
          const tagColors = getTagColors(program.tagColor);
          return (
            <div
              key={index}
              className="flex-none sm:w-[300px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 snap-center"
              style={{
                ...(typeof window !== 'undefined' && window.innerWidth < 640 && mobileCardWidth > 0
                  ? { width: `${mobileCardWidth}px`, minWidth: `${mobileCardWidth}px`, maxWidth: `${mobileCardWidth}px` }
                  : {})
              }}
            >
              <div className="relative h-48 sm:h-48">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover"
                  sizes={typeof window !== 'undefined' && window.innerWidth < 640 && mobileCardWidth > 0 
                    ? `${mobileCardWidth}px` 
                    : '(max-width: 640px) calc(100vw - 3rem), 300px'}
                  priority={index < 3}
                />
                <div className={`absolute top-3 left-3 ${tagColors.bg} ${tagColors.text} px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium`}>
                  {program.tag}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className={`text-lg sm:text-lg md:text-xl mb-2 sm:mb-3 font-['Delius'] text-gray-900 leading-tight`}>{program.title}</h3>
                <p className="text-sm sm:text-sm md:text-base text-gray-600 line-clamp-3 leading-relaxed">{program.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}