'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import { Delius } from 'next/font/google';
import Script from 'next/script';
import { blogPosts } from './data';

const delius = Delius({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function ClientBlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'tutorials', name: 'Coding Tutorials' },
    { id: 'success-stories', name: 'Success Stories' },
    { id: 'resources', name: 'Learning Resources' },
    { id: 'news', name: 'Tech News' },
    { id: 'behind-scenes', name: 'Behind the Scenes' },
    { id: 'ai-robotics', name: 'AI & Robotics' },
    { id: 'expert-insights', name: 'Expert Insights' }
  ];

  useEffect(() => {
    const initialIndices: Record<string, number> = {};
    blogPosts.forEach(post => {
      initialIndices[post.id] = 0;
    });
    setActiveImageIndices(initialIndices);
  }, []);

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    // Set up intervals for all visible posts
    const visiblePosts = blogPosts.filter(post => {
      const categoryMatch = activeCategory === 'all' || post.category === activeCategory;
      const searchMatch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });

    visiblePosts.forEach(post => {
      const interval = setInterval(() => {
        setActiveImageIndices(prev => ({
          ...prev,
          [post.id]: (prev[post.id] + 1) % 3
        }));
      }, 5000); // Reduce interval to 5 seconds for more frequent transitions

      intervals.push(interval);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [activeCategory, searchQuery]);

  // Filter blog posts based on active category and search query
  const filteredPosts = blogPosts.filter(post => {
    // First check category filter
    const categoryMatch = activeCategory === 'all' || post.category === activeCategory;
    
    // Then check search query
    const searchMatch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const handleCardClick = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubscriptionStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSubscriptionStatus({
        type: 'success',
        message: 'Successfully subscribed to newsletter!',
      });
      setEmail('');
      setTimeout(() => {
        setShowNewsletterModal(false);
        setSubscriptionStatus({ type: null, message: '' });
      }, 3000);
    } catch (error: any) {
      setSubscriptionStatus({
        type: 'error',
        message: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Ghana Code Club Blog',
    description: 'Latest news, articles, and insights from Ghana Code Club on coding education in Ghana.',
    url: 'https://ghanacodeclub.org/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Ghana Code Club',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ghanacodeclub.org/images/gcc-logo.png'
      }
    },
    blogPost: blogPosts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: post.author.name
      },
      image: {
        '@type': 'ImageObject',
        url: post.image
      }
    }))
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#EF4444]'}`}>
      <Script id="blog-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/blog-hero.jpg"
            alt="Blog Hero Background"
            fill
            className="object-cover scale-105 motion-safe:animate-subtle-zoom"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 via-red-600/75 to-red-700/85"></div>
          
          {/* Animated Pattern Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"
            ></motion.div>
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -5, 5, 0],
                y: [0, 10, 0],
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/2 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"
            ></motion.div>
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 3, -3, 0],
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 7,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-0 left-1/3 w-28 h-28 bg-white/10 rounded-full blur-2xl"
            ></motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Decorative Icon */}
            <div className="relative mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 12 }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="w-24 h-24 bg-gradient-to-br from-white to-white/90 backdrop-blur-sm rounded-2xl rotate-12 flex items-center justify-center relative group mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-2xl border-2 border-white/30"
                ></motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative z-10"
                >
                  <svg className="w-12 h-12 text-red-600 -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <h1 className={`text-6xl md:text-7xl font-bold mb-6 text-white ${delius.className} leading-tight relative inline-block`}>
                Our Blog
                <div className="absolute -bottom-2 left-0 w-full h-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-white"></div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white via-red-600 to-white"
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
                    <div className="w-2 h-2 bg-white rounded-full transform rotate-45"></div>
                  </div>
                </motion.div>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed"
            >
              Discover coding tutorials, success stories, and tech insights from Ghana's leading coding education platform.
            </motion.p>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center gap-6"
            >
              <Link 
                href="/contact#contact-form"
                className="group relative px-8 py-4 bg-white text-red-600 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative font-semibold">Join Our Community</span>
              </Link>
              <button 
                onClick={() => setShowNewsletterModal(true)}
                className="group relative px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative font-semibold">Subscribe to Newsletter</span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-0 left-0 w-full h-full border-l-2 border-t-2 border-white/20 rounded-tl-3xl"
          ></motion.div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-0 right-0 w-full h-full border-r-2 border-b-2 border-white/20 rounded-br-3xl"
          ></motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <h2 className={`text-2xl font-bold mb-4 text-black ${delius.className}`} style={{ fontFamily: 'Delius, cursive' }}>
            Categories
          </h2>
          <div className="flex flex-wrap gap-3 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors text-sm ${
                  activeCategory === category.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles by title, content, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
              <FiSearch className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-8 text-white ${delius.className}`} style={{ fontFamily: 'Delius, cursive' }}>
            {activeCategory === 'all' ? 'Latest Posts' : categories.find(c => c.id === activeCategory)?.name}
            {searchQuery && ` - Search results for "${searchQuery}"`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <div 
                key={post.id}
                className={`cursor-pointer ${
                  expandedPost === post.id ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                onClick={() => handleCardClick(post.id)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <article className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                      expandedPost === post.id ? 'shadow-2xl scale-105' : ''
                    }`}>
                      <div className="relative h-40">
                        <motion.div
                          key={activeImageIndices[post.id]}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ 
                            duration: 1,
                            ease: "easeInOut",
                            type: "tween"
                          }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={activeImageIndices[post.id] === 0 ? post.image : 
                                 activeImageIndices[post.id] === 1 ? post.image2 : post.image3}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            priority={index < 2}
                            loading={index < 2 ? "eager" : "lazy"}
                            quality={60}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjY4OEI4Li8vQUVFRUVFRUVFRUVFRUVFRUVFRUX/2wBDAR0XFyAeIBogHh4gIiAoJCAoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          />
                        </motion.div>
                        <div className="absolute top-3 right-3">
                          <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-xs">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-8 h-8 rounded-full overflow-hidden transition-transform duration-300 ${
                            expandedPost === post.id ? 'scale-120' : ''
                          }`}>
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className={`font-semibold text-sm ${delius.className}`} style={{ fontFamily: 'Delius, cursive' }}>{post.author.name}</h3>
                            <p className="text-xs text-gray-500">{post.author.role}</p>
                          </div>
                        </div>
                        <h2 className={`text-sm md:text-base lg:text-lg font-bold mb-2 leading-tight ${delius.className}`} style={{ fontFamily: 'Delius, cursive' }}>{post.title}</h2>
                        <p className={`text-sm text-gray-600 mb-3 transition-all duration-300 ${
                          expandedPost === post.id ? '' : 'line-clamp-2'
                        }`}>
                          {post.excerpt}
                        </p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{post.date}</span>
                          <span>{post.readTime}</span>
                        </div>
                        {expandedPost !== post.id && (
                          <div className="mt-3 flex items-center justify-center">
                            <button className="text-red-600 text-sm font-medium flex items-center gap-1 hover:text-red-700 transition-colors">
                              Read More
                              <span className="animate-bounce">
                                <FiArrowRight className="w-4 h-4" />
                              </span>
                            </button>
                          </div>
                        )}
                        {expandedPost === post.id && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                              <span className="font-medium">Category:</span>
                              <span className="bg-gray-100 px-2 py-1 rounded">{post.category}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="font-medium">Author:</span>
                              <span>{post.author.name}</span>
                              <span className="text-gray-400">•</span>
                              <span>{post.author.role}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white text-lg">
                {searchQuery 
                  ? `No posts found matching "${searchQuery}"`
                  : 'No posts found in this category.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Modal */}
      {showNewsletterModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowNewsletterModal(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl p-8 max-w-md w-full relative"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowNewsletterModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${delius.className}`}>
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-600 mb-6">
              Stay updated with our latest coding tutorials, success stories, and tech insights.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-gray-900 placeholder-gray-500"
                  required
                />
              </div>

              {subscriptionStatus.message && (
                <div className={`p-3 rounded-lg ${
                  subscriptionStatus.type === 'success' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {subscriptionStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
} 