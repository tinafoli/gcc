'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiShare2, FiClock, FiCalendar } from 'react-icons/fi';
import { Delius } from 'next/font/google';
import { BlogPost } from '@/components/BlogPreview';
import { blogPosts } from '../data';

const delius = Delius({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface ClientBlogPostPageProps {
  post: BlogPost;
}

export default function ClientBlogPostPage({ post }: ClientBlogPostPageProps) {
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Get other posts (excluding current post)
  const otherPosts = blogPosts
    .filter(p => p.id !== post.id && p.slug)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 10); // Show up to 10 related posts

  const images = [post.image, post.image2, post.image3].filter(Boolean);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && images.length > 1) {
      const interval = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [mounted, images.length]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!mounted) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-[#EF4444]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/blog"
              className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              <span className="font-medium">Back to Blog</span>
            </Link>
            <button
              onClick={handleShare}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FiShare2 className="mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - YouTube-like Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Left - 2/3 width) */}
          <div className="lg:col-span-2">
            {/* Image Carousel */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-6 bg-gray-100">
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: activeImageIndex === index ? 1 : 0,
                    scale: activeImageIndex === index ? 1 : 1.05
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={img}
                    alt={`${post.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </motion.div>
              ))}
              
              {/* Image Indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeImageIndex === index ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Post Content */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${delius.className}`}>
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{post.author.name}</p>
                    <p className="text-sm text-gray-500">{post.author.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <FiCalendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <FiClock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Excerpt/Content */}
              <div className="prose prose-lg max-w-none">
                {post.content ? (
                  <div className="text-gray-700 leading-relaxed">
                    {post.content.split('\n\n').map((paragraph, index) => {
                      // Check if paragraph is a section divider
                      if (paragraph.trim() === '⸻') {
                        return (
                          <div key={index} className="my-8 border-t border-gray-300"></div>
                        );
                      }
                      
                      // Check if paragraph is a heading (starts with capital letter and no period)
                      if (paragraph.length > 0 && paragraph.length < 100 && !paragraph.includes('.') && paragraph[0] === paragraph[0].toUpperCase()) {
                        return (
                          <h2 key={index} className={`text-2xl font-bold text-gray-900 mt-8 mb-4 ${delius.className}`}>
                            {paragraph}
                          </h2>
                        );
                      }
                      
                      // Check if paragraph contains bullet points (•, 🟢, or ✅)
                      if (paragraph.includes('•') || paragraph.includes('🟢') || paragraph.includes('✅')) {
                        const lines = paragraph.split('\n');
                        return (
                          <ul key={index} className="list-none space-y-2 my-4">
                            {lines.map((line, lineIndex) => {
                              // Match bullet with •, 🟢, or ✅
                              const bulletMatch = line.match(/^(?:•|🟢|✅)\s*(.+)$/);
                              if (bulletMatch) {
                                // Determine which emoji to use
                                let bulletEmoji = '•';
                                if (line.includes('🟢')) bulletEmoji = '🟢';
                                else if (line.includes('✅')) bulletEmoji = '✅';
                                
                                // Set color based on emoji
                                let bulletColor = 'text-red-600';
                                if (bulletEmoji === '🟢') bulletColor = 'text-green-600';
                                else if (bulletEmoji === '✅') bulletColor = 'text-green-600';
                                
                                return (
                                  <li key={lineIndex} className="flex items-start">
                                    <span className={`${bulletColor} mr-3 mt-1 text-lg`}>{bulletEmoji}</span>
                                    <span>{bulletMatch[1]}</span>
                                  </li>
                                );
                              }
                              return null;
                            })}
                          </ul>
                        );
                      }
                      
                      // Regular paragraph
                      if (paragraph.trim()) {
                        return (
                          <p key={index} className="mb-4 text-lg">
                            {paragraph}
                          </p>
                        );
                      }
                      
                      return null;
                    })}
                  </div>
                ) : (
                  <div className="text-gray-700 leading-relaxed">
                    <p className="text-lg mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar (Right - 1/3 width) - Other Posts */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <h2 className={`text-2xl font-bold text-white mb-4 ${delius.className}`}>
                More Posts
              </h2>
              <div className="space-y-4">
                {otherPosts.map((otherPost, index) => (
                  <Link
                    key={otherPost.id}
                    href={`/blog/${otherPost.slug}`}
                    className="block"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="relative w-full h-32">
                        <Image
                          src={otherPost.image}
                          alt={otherPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className={`text-sm font-bold text-gray-900 mb-2 line-clamp-2 ${delius.className}`}>
                          {otherPost.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{otherPost.date}</span>
                          <span>{otherPost.readTime}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

