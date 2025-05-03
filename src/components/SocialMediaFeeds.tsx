'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface SocialMediaFeed {
  platform: string;
  username: string;
  followers: string;
  icon: JSX.Element;
  embedUrl: string;
  profileUrl: string;
  brandColor: string;
}

const socialMediaFeeds: SocialMediaFeed[] = [
  {
    platform: "TikTok",
    username: "ghanacodeclub",
    followers: "2564 Followers",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    embedUrl: "https://www.tiktok.com/embed/@ghanacodeclub",
    profileUrl: "https://www.tiktok.com/@ghanacodeclub",
    brandColor: "bg-black hover:bg-gray-800"
  },
  {
    platform: "Facebook",
    username: "Ghana Code Club",
    followers: "Follow us on Facebook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
    embedUrl: "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fghanacodeclub&tabs=timeline&width=500&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId",
    profileUrl: "https://www.facebook.com/ghanacodeclub",
    brandColor: "bg-[#1877f2] hover:bg-blue-600"
  },
  {
    platform: "LinkedIn",
    username: "Ghana Code Club",
    followers: "Connect with us on LinkedIn",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7312767862622838785?collapsed=1",
    profileUrl: "https://www.linkedin.com/company/ghana-code-club/posts/?feedView=all",
    brandColor: "bg-[#0077b5] hover:bg-[#005e8c]"
  }
];

export default function SocialMediaFeeds() {
  // No need to load Twitter widget script anymore
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-['Delius']">Connect With Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest news, events, and success stories across our social media platforms.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {socialMediaFeeds.map((feed, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100">
                    <Image
                      src="/images/gcc-logo.png"
                      alt="Ghana Code Club"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feed.username}</h3>
                    <p className="text-sm text-gray-500">{feed.followers}</p>
                  </div>
                </div>
              </div>
              
              <div className="h-[300px] bg-gray-50 relative overflow-hidden">
                <iframe
                  src={feed.embedUrl}
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
              
              <div className="p-4">
                <a 
                  href={feed.profileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`inline-flex items-center justify-center w-full ${feed.brandColor} text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-102 active:scale-98`}
                >
                  <span className="mr-2">{feed.icon}</span>
                  Follow on {feed.platform}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Don't miss out on our latest updates!</p>
          <a 
            href="/contact#contact-form" 
            className="inline-flex items-center justify-center bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
} 