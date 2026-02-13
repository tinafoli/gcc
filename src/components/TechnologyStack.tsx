'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const technologies = [
  { 
    icon: '/images/tech/bee-bots.png',
    alt: 'Bee-Bots'
  },
  { 
    icon: '/images/tech/scratch.png',
    alt: 'Scratch'
  },
  { 
    icon: '/images/tech/mit.png',
    alt: 'MIT App Inventor'
  },
  { 
    icon: '/images/tech/python.png',
    alt: 'Python'
  },
  { 
    icon: '/images/tech/microbit.png',
    alt: 'Micro:bit'
  },
  { 
    icon: '/images/tech/web.png',
    alt: 'Web Design'
  },
  { 
    icon: '/images/tech/ai.png',
    alt: 'AI'
  },
  { 
    icon: '/images/tech/data.png',
    alt: 'Data Science'
  },
  { 
    icon: '/images/tech/arduino.png',
    alt: 'Arduino'
  },
  { 
    icon: '/images/tech/spike-prime.png',
    alt: 'Spike Prime'
  },
  { 
    icon: '/images/tech/ozobot.png',
    alt: 'Ozobot'
  },
  { 
    icon: '/images/tech/makey-makey.png',
    alt: 'Makey Makey'
  },
];

export default function TechnologyStack() {
  // Create a triple set of items for smoother infinite loop
  const tripleSetOfTechnologies = [...technologies, ...technologies, ...technologies];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="w-[80vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-['Delius'] leading-tight py-1"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Technology Stack
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Dive into the world off Scratch, AI, robotics, 3D modeling,  Python, Blockly, and HTML/CSS with our specially designed curricula that combines critical STEM learning with fun and engaging hands-on projects, using:
          </motion.p>
        </motion.div>

        <div className="relative w-full overflow-hidden">
          {/* Gradient overlay - left */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-10"></div>

          {/* Scrolling container */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-12 py-8 w-fit"
              animate={{
                x: ["0%", "-33.33%"]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear",
                },
              }}
            >
              {tripleSetOfTechnologies.map((tech, index) => (
                <motion.div
                  key={`${tech.alt}-${index}`}
                  className="relative w-40 h-40 sm:w-32 sm:h-32 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ 
                    scale: 1.08,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={tech.icon}
                    alt={tech.alt}
                    fill
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 128px, 112px"
                    className="object-contain p-3 sm:p-2.5 group-hover:scale-110 transition-transform duration-300"
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/10 to-transparent h-12 sm:h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2"
                  >
                    <span className="text-sm sm:text-xs font-medium text-gray-700">{tech.alt}</span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient overlay - right */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
} 