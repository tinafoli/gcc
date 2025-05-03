'use client';

import { motion } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import Image from "next/image";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
    inViewThreshold: 0.7,
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = () => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    };

    const interval = setInterval(autoplay, 5000); // Scroll every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [emblaApi]);

  const testimonials = [
    {
      name: "Emerald Asamoah",
      role: "Student, Age 14",
      initial: "E",
      image: "/images/testimonials/student1.jpg",
      quote: "Ghana Code Club has completely transformed my understanding of technology. The hands-on projects and supportive mentors have helped me build my first mobile app!",
      highlight: "Transformed my understanding of technology"
    },
    {
      name: "Irene ",
      role: "Parent",
      initial: "I",
      image: "/images/testimonials/parent1.jpg",
      quote: "As a parent, I'm amazed at how quickly my son has developed his coding skills. The club's approach to teaching makes complex concepts accessible and fun.",
      highlight: "Makes complex concepts accessible and fun"
    },
    {
      name: "Carl Russel",
      role: "Student, Age 10",
      initial: "C",
      image: "/images/testimonials/student2.jpg",
      quote: "The robotics program at Ghana Code Club is incredible! I've learned so much about engineering and problem-solving. It's helped me discover my passion for STEM.",
      highlight: "Discovered my passion for STEM"
    },
    {
      name: "Faustina Narh",
      role: "Parent",
      initial: "F",
      image: "/images/testimonials/parent2.jpg",
      quote: "The confidence my daughter has gained through coding is remarkable. She's now leading her school's tech club and inspiring other girls to learn programming.",
      highlight: "Her confidence has skyrocketed"
    },
    {
      name: "Debbie Wilson",
      role: "Student, Age 15",
      initial: "D",
      image: "/images/testimonials/student3.jpg",
      quote: "The mobile app workshop was a game-changer for me! I've created my first mobile app and now I'm working on more complex projects.",
      highlight: "Created my first Mobile App"
    },
    {
      name: "Savannah Martins ",
      role: "Student, Age 13",
      initial: "M",
      image: "/images/testimonials/student4.jpg",
      quote: "I love how Ghana Code Club makes coding fun and accessible. The projects are challenging but exciting, and I've made so many friends who share my interests!",
      highlight: "Made so many friends who share my interests"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-red-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-10">
        <div className="absolute top-10 left-[10%] text-6xl text-red-500 transform -rotate-12">
          ❤️
        </div>
        <div className="absolute top-1/3 right-[15%] text-5xl text-red-500">
          ⭐
        </div>
        <div className="absolute bottom-[20%] left-[15%] text-6xl text-red-500">
          🚀
        </div>
        <div className="absolute bottom-[30%] right-[10%] text-5xl text-red-500">
          💡
        </div>
        <div className="absolute top-[40%] right-[5%] text-6xl text-red-500">
          🌟
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-['Delius']">
            <span className="text-red-500">Why Our Community</span> Loves Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Delius']">
            Hear the inspiring stories from our students and parents about their journey with Ghana Code Club
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 h-full border border-red-100 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mr-4 overflow-hidden">
                        {testimonial.image ? (
                          <Image 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-red-500">{testimonial.initial}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <svg className="absolute -top-4 -left-2 text-red-200 w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-gray-600 italic pl-6 pt-2">
                        "{testimonial.quote}"
                      </p>
                      <div className="mt-4 pt-2 border-t border-red-100">
                        <p className="text-red-500 font-semibold">
                          {testimonial.highlight}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-red-50 transition-colors z-10 border border-red-100"
            onClick={scrollPrev}
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-red-50 transition-colors z-10 border border-red-100"
            onClick={scrollNext}
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === selectedIndex ? 'bg-red-500' : 'bg-gray-300'
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <a 
            href="/contact#contact-form" 
            className="inline-block bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
          >
            Join Our Community
          </a>
        </motion.div>
      </div>
    </section>
  );
} 