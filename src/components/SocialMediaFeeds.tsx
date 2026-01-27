'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
    platform: "LinkedIn",
    username: "Ghana Code Club",
    followers: "1,022 followers",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7416748561272528896",
    profileUrl: "https://www.linkedin.com/posts/ghana-code-club_ghanacodeclub-ailiteracy-ecobank-activity-7416748561272528896-Qnvd?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE71zwwBAQc_iS6a_42u1pQ3CSOAWPIwniU",
    brandColor: "bg-[#0077b5] hover:bg-[#005e8c]"
  }
];

export default function SocialMediaFeeds() {
  const [iframeErrors, setIframeErrors] = useState<Record<string, boolean>>({});

  const handleIframeError = (platform: string) => {
    setIframeErrors(prev => ({ ...prev, [platform]: true }));
  };

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {socialMediaFeeds.map((feed, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="p-6 border-b">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100">
                    <Image
                      src="/images/gcc-logo.png"
                      alt="Ghana Code Club"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{feed.username}</h3>
                    <p className="text-base text-gray-500">{feed.followers}</p>
                  </div>
                </div>
              </div>
              
              <div className="h-[400px] bg-gray-50 relative overflow-hidden">
                {iframeErrors[feed.platform] ? (
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                    <div>
                      <p className="text-gray-600 mb-4">Unable to load the feed directly.</p>
                      <a 
                        href={feed.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        View on {feed.platform}
                      </a>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={feed.embedUrl}
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    onError={() => handleIframeError(feed.platform)}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${feed.platform} feed for ${feed.username}`}
                  />
                )}
              </div>
              
              <div className="p-6">
                <a 
                  href={feed.profileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`inline-flex items-center justify-center w-full ${feed.brandColor} text-white px-6 py-4 rounded-lg font-medium text-lg transition-all duration-300 hover:scale-102 active:scale-98`}
                >
                  <span className="mr-3">{feed.icon}</span>
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
          
        </motion.div>
      </div>
    </section>
  );
} 