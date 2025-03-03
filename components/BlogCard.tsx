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

  // Format date consistently
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full border border-gray-700/50 hover:border-primary/50"
    >
      <Link href={`/blog/${post._id}`} className="block h-full">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={post.coverImage || defaultCoverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-400">
              {formatDate(post.createdAt)}
            </span>
            <span className="text-sm text-gray-400">·</span>
            <span className="text-sm text-gray-400">
              {post.readingTime}
            </span>
          </div>

          <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          <div className="flex items-center text-primary font-medium">
            Read Article
            <svg
              className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
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
