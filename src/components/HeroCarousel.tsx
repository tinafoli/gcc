'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';

// Custom styles for Swiper navigation arrows
const swiperStyles = `
  .swiper-button-next,
  .swiper-button-prev {
    color: #EF4444 !important;
    border: 2px solid white !important;
    border-radius: 50% !important;
    width: 32px !important;
    height: 32px !important;
    background-color: rgba(0, 0, 0, 0.3) !important;
    transition: all 0.3s ease !important;
  }
  
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 14px !important;
  }
  
  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background-color: rgba(0, 0, 0, 0.5) !important;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.7) !important;
    transform: scale(1.1) !important;
  }
  
  .swiper-pagination-bullet {
    width: 8px !important;
    height: 8px !important;
    background: rgba(255, 255, 255, 0.5) !important;
    opacity: 1 !important;
  }
  
  .swiper-pagination-bullet-active {
    background: #EF4444 !important;
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.7) !important;
  }
`;

interface SlideContent {
  image: string;
  title: string;
  description: string;
}

const slides: SlideContent[] = [
  {
    image: '/images/hero/welcome.jpg',
    title: 'Welcome to Ghana Code Club',
    description: 'Empowering the next generation of Ghanaian tech leaders through coding education and digital skills training.',
  },
  {
    image: '/images/hero/slide1.jpg',
    title: 'Engaging Students from 5-17 to Computer Science in an interactive way.',
    description: 'We are champions and pacesetters for Computer Science education in Ghana, driving results through program design and implementation, strategic capacity and public partnerships, research and advocacy.',
  },
  {
    image: '/images/hero/slide2.jpg',
    title: 'Empowering Girls in Technology',
    description: 'Our dedicated programs focus on bridging the gender gap in tech, providing girls with the skills and confidence to excel in computer science and digital innovation.',
  },
  {
    image: '/images/hero/slide3.jpg',
    title: 'Building Future Tech Leaders',
    description: 'Through hands-on projects and real-world applications, we nurture creativity, problem-solving skills, and technological literacy in the next generation.',
  },
  {
    image: '/images/hero/slide4.jpg',
    title: 'Creating Impact Across Ghana',
    description: 'With our mobile labs and community partnerships, we bring quality computer science education to both urban and rural areas throughout Ghana.',
  },
  {
    image: '/images/hero/slide5.jpg',
    title: 'Join Our Tech Community',
    description: 'Be part of a growing network of students, teachers, and tech enthusiasts shaping the future of technology education in Ghana.',
  },
  {
    image: '/images/hero/slide6.jpg',
    title: 'Innovation Through Education',
    description: 'Our curriculum combines cutting-edge technology with practical skills, preparing students for the digital economy and future opportunities.',
  }
];

export default function HeroCarousel() {
  return (
    <section className="relative w-full h-[85vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]">
      <style jsx global>{swiperStyles}</style>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full"
        speed={1000}
        slidesPerView={1}
        spaceBetween={0}
        allowTouchMove={true}
        centeredSlides={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/70 z-10">
              <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-blue-500/20"></div>
            </div>
            
            {/* Animated pattern overlay with enhanced effects */}
            <div className="absolute inset-0 z-[11]">
              <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-10 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-purple-500/10 to-blue-500/20 mix-blend-overlay"></div>
            </div>

            {/* Enhanced Floating Elements - Disabled on mobile */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[12] hidden sm:block">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                  y: [-20, 0, -20]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, -5, 5, 0],
                  x: [-20, 0, -20]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 -right-12 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 3, -3, 0],
                  y: [0, -20, 0]
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-0 left-1/3 w-36 h-36 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
              />
            </div>
            
            {/* Enhanced background image with zoom and parallax effect */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover transform scale-105 motion-safe:animate-subtle-zoom filter brightness-90"
                sizes="100vw"
                priority={index === 0}
                quality={90}
                loading={index === 0 ? "eager" : "lazy"}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjY4OEI4Li8vQUVFRUVFRUVFRUVFRUVFRUVFRUX/2wBDAR0XFyAeIBogHiAeIBogHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>

            {/* Enhanced Content with Glass Effect */}
            <div className="relative z-20 h-full flex items-center">
              <div className="container mx-auto px-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-3xl backdrop-blur-sm bg-black/10 p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10"
                >
                  {/* Enhanced Decorative Element - Hidden on mobile */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 12 }}
                    transition={{ 
                      duration: 0.8,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-red-600 backdrop-blur-sm rounded-2xl mb-4 sm:mb-8 rotate-12 flex items-center justify-center relative group shadow-lg shadow-red-500/20 hidden sm:block"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-2xl border-2 border-red-400/30"
                    ></motion.div>
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-12 relative z-10 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </motion.div>

                  {/* Enhanced Title with Glow Effect */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-['Delius'] relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {slide.title}
                    <div className="absolute -bottom-2 left-0 w-full h-1">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-500 to-red-500 blur-sm"></div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-red-500 via-white to-red-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                      />
                    </div>
                    <motion.div
                      className="absolute -right-4 -top-4 w-8 h-8"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="absolute inset-0 animate-ping-slow">
                        <div className="w-2 h-2 bg-red-500 rounded-full transform rotate-45 shadow-lg shadow-red-500/50"></div>
                      </div>
                    </motion.div>
                  </h1>

                  {/* Enhanced Description with Glass Effect */}
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-200/90 mb-4 sm:mb-8 leading-relaxed max-w-3xl drop-shadow-lg">
                    {slide.description}
                  </p>

                  {/* Enhanced Button with Modern Effects */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <motion.a 
                      href="/donate" 
                      className="group bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
                      whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(239, 68, 68, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-red-600 to-red-700"></div>
                      <span className="relative z-10 flex items-center justify-center">
                        Donate Now
                        <motion.svg 
                          className="w-5 h-5 ml-2 relative z-10"
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                      </span>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Enhanced Corner Decorations with Glow - Hidden on mobile */}
            <div className="absolute top-0 left-0 w-40 h-40 pointer-events-none z-[13] hidden sm:block">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute top-0 left-0 w-full h-full border-l-2 border-t-2 border-red-500/30 rounded-tl-3xl shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              ></motion.div>
            </div>
            <div className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none z-[13] hidden sm:block">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-0 right-0 w-full h-full border-r-2 border-b-2 border-red-500/30 rounded-br-3xl shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              ></motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
} 