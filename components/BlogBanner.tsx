'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from './BlogCard';

interface BlogBannerProps {
  posts: BlogPost[];
}

export default function BlogBanner({ posts }: BlogBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerPosts = posts.filter(post => post.isBanner).slice(0, 3); // Only take first 3 banner posts

  useEffect(() => {
    if (bannerPosts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerPosts.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [bannerPosts.length]);

  if (bannerPosts.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src={bannerPosts[currentIndex].coverImage}
            alt={bannerPosts[currentIndex].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(bannerPosts[currentIndex].author)}&background=10B981&color=fff`}
                      alt={bannerPosts[currentIndex].author}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-sm text-gray-300">{bannerPosts[currentIndex].author}</span>
                  </div>
                  <span className="text-sm text-gray-400">·</span>
                  <span className="text-sm text-gray-300">{formatDate(bannerPosts[currentIndex].createdAt)}</span>
                  <span className="text-sm text-gray-400">·</span>
                  <span className="text-sm text-gray-300">{bannerPosts[currentIndex].readingTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                  {bannerPosts[currentIndex].title}
                </h2>
                <p className="text-base text-gray-300 mb-4 line-clamp-2">
                  {bannerPosts[currentIndex].excerpt}
                </p>
                <Link
                  href={`/blog/${bannerPosts[currentIndex]._id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Read Article
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      {bannerPosts.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {bannerPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary w-6'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
