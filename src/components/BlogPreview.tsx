'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Delius } from 'next/font/google';
import { useRouter } from 'next/navigation';

const delius = Delius({ 
  weight: '400',
  subsets: ['latin'],
});

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
  image2: string;
  image3: string;
  slug?: string;
  content?: string;
}

interface BlogPreviewProps {
  posts: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const router = useRouter();
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});

  // Initialize activeImageIndices for each post
  useEffect(() => {
    const initialIndices: Record<string, number> = {};
    posts.forEach(post => {
      initialIndices[post.id] = 0;
    });
    setActiveImageIndices(initialIndices);
  }, [posts]);

  // Set up individual intervals for each post
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    posts.forEach(post => {
      const interval = setInterval(() => {
        setActiveImageIndices(prev => ({
          ...prev,
          [post.id]: (prev[post.id] + 1) % 3
        }));
      }, 10000 + Math.random() * 5000); // Changed from 5000 to 10000 (10-15 seconds)

      intervals.push(interval);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [posts]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 text-gray-900 ${delius.className}`} style={{ fontFamily: 'Delius, cursive' }}>
            Latest from Our Blog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest stories, tutorials, and community updates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <motion.div
                  key={activeImageIndices[post.id]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeImageIndices[post.id] === 0 ? post.image : 
                         activeImageIndices[post.id] === 1 ? post.image2 : post.image3}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </motion.div>
                <div className="absolute top-3 right-3">
                  <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-xs">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className={`text-sm font-['Delius']`}>{post.author.name}</h3>
                    <p className="text-xs text-gray-500">{post.author.role}</p>
                  </div>
                </div>

                <h2 className={`text-xl text-gray-900 mb-3 font-['Delius'] line-clamp-2 min-h-[3.5rem]`}>{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                  {post.excerpt}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => {
              // Clear any saved scroll position
              if (typeof window !== 'undefined') {
                sessionStorage.removeItem('scrollPosition');
              }
              // Navigate to blog page and force scroll to top
              router.push('/blog');
              // Force scroll to top after navigation
              setTimeout(() => {
                window.scrollTo(0, 0);
              }, 100);
            }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            View All Blog Posts
            <FiArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}