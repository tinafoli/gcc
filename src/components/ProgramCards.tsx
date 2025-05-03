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
    tagColor: "purple",
    link: "/programs/coolest-projects"
  },
  {
    title: "Digital Village Program",
    description: "Bringing technology education to rural communities",
    image: "/images/digital-village.jpg",
    tag: "Community",
    tagColor: "green",
    link: "/programs/digital-village"
  },
  {
    title: "Summer Code Camp",
    description: "Intensive summer program for kids to learn coding and robotics",
    image: "/images/summer-camp.jpg",
    tag: "Summer Camp",
    tagColor: "orange",
    link: "/programs/summer-camp"
  },
  {
    title: "Alumni Mentorship Program",
    description: "Connecting students with industry professionals for guidance",
    image: "/images/mentorship.jpg",
    tag: "Mentorship",
    tagColor: "blue",
    link: "/programs/mentorship"
  },
  {
    title: "100 Girls in STEM",
    description: "Empowering girls through technology and coding education",
    image: "/images/girls-in-tech.jpg",
    tag: "Girls in Tech",
    tagColor: "pink",
    link: "/programs/100-girls-in-stem"
  },
  {
    title: "Adults in Tech",
    description: "Digital skills training for adult learners",
    image: "/images/adults-tech.jpg",
    tag: "Adult Learning",
    tagColor: "indigo",
    link: "/programs/adults-tech"
  },
  {
    title: "After School Code Clubs",
    description: "Teacher training and student coding clubs for sustainable learning",
    image: "/images/code-club.jpg",
    tag: "Code Clubs",
    tagColor: "blue",
    link: "/programs/code-clubs"
  },
  {
    title: "Teacher Training",
    description: "Professional development for educators in computer science",
    image: "/images/teacher-training.jpg",
    tag: "Training",
    tagColor: "purple",
    link: "/programs/teacher-training"
  },
  {
    title: "Saturday Coding School",
    description: "Weekend coding education for all ages",
    image: "/images/saturday-school.jpg",
    tag: "Weekend Learning",
    tagColor: "cyan",
    link: "/programs/saturday-coding-school"
  }
];

export default function ProgramCards() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollIntervalRef = useRef<NodeJS.Timeout>();

  // Add auto-scroll functionality
  useEffect(() => {
    const autoScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        
        // If we've reached the end, stop scrolling
        if (scrollLeft >= scrollWidth - clientWidth) {
          if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = undefined;
          }
          return;
        }
        
        const cardWidth = window.innerWidth >= 640 ? 300 : container.clientWidth * 0.85;
        const gap = 24;
        container.scrollBy({
          left: cardWidth + gap,
          behavior: 'smooth'
        });
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
      // Only restart auto-scroll if we haven't reached the end
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      if (scrollLeft < scrollWidth - clientWidth) {
        scrollIntervalRef.current = setInterval(() => {
          if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            
            // If we've reached the end, stop scrolling
            if (scrollLeft >= scrollWidth - clientWidth) {
              if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
                scrollIntervalRef.current = undefined;
              }
              return;
            }
            
            scrollContainerRef.current.scrollBy({
              left: 324,
              behavior: 'smooth'
            });
          }
        }, 5000);
      }
    }
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // Show left arrow if we've scrolled right
      setShowLeftArrow(scrollLeft > 0);
      
      // Show right arrow if there's more content to scroll to
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = window.innerWidth >= 640 ? 300 : container.clientWidth * 0.85; // 85vw for mobile
      const gap = 24; // 6 * 4 = 24px (gap-6)
      const scrollAmount = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
      
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
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
            <a
              href={program.link}
              key={index}
              className="flex-none w-[85vw] sm:w-[300px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 snap-center"
            >
              <div className="relative h-56 sm:h-48">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 85vw, 300px"
                  priority={index < 3}
                />
                <div className={`absolute top-4 left-4 ${tagColors.bg} ${tagColors.text} px-3 py-1 rounded-full text-sm font-medium`}>
                  {program.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl sm:text-lg md:text-xl mb-3 font-['Delius'] text-gray-900`}>{program.title}</h3>
                <p className="text-base sm:text-sm md:text-base text-gray-600 line-clamp-3">{program.description}</p>
              </div>
            </a>
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