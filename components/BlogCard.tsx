'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  createdAt: string;
  readingTime: string;
  coverImage: string;
  isFeatured?: boolean;
  isBanner?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  // Default images
  const defaultCoverImage = "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1600&auto=format&fit=crop";
  const defaultAuthorImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author || 'User')}&background=10B981&color=fff`;

  // Format date consistently
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full"
    >
      <Link href={`/blog/${post._id}`} className="block h-full flex flex-col">
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <Image
            src={post.coverImage || defaultCoverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 text-sm font-medium bg-primary/90 text-white rounded-full backdrop-blur-sm">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-6 relative bg-gray-800 flex-grow flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={defaultAuthorImage}
                alt={post.author || 'Author'}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-sm">
              <p className="text-gray-300">{post.author || 'Anonymous'}</p>
              <p className="text-gray-500">
                {formatDate(post.createdAt)} · {post.readingTime}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-400 line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center text-primary">
            <span className="text-sm font-medium">Read More</span>
            <svg
              className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1"
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
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
