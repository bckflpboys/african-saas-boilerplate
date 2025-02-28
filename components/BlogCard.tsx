'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    image: string;
  };
  publishDate: string;
  readTime: string;
  imageUrl: string;
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <Image
            src={post.imageUrl}
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

        <div className="p-6 relative bg-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={post.author.image}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-sm">
              <p className="text-gray-300">{post.author.name}</p>
              <p className="text-gray-500">{post.publishDate} · {post.readTime} read</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-400 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center text-primary">
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
