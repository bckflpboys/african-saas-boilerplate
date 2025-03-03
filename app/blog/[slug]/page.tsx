'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  createdAt: string;
  readingTime: string;
}

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [params.slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/posts/${params.slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      const data = await response.json();
      setPost(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-black-bg min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-black-bg min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
            <Link href="/blog" className="text-primary hover:text-primary/90">
              Return to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black-bg min-h-screen flex flex-col">
      <Navbar />

      <article className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[70vh] min-h-[500px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
          <div className="absolute inset-0 flex items-end pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-4 py-1 bg-primary/90 text-white rounded-full text-sm font-medium mb-4">
                  {post.category}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=10B981&color=fff`}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">{post.author}</p>
                    <p className="text-gray-300">
                      {new Date(post.createdAt).toLocaleDateString()} · {post.readingTime}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <p className="text-xl text-gray-300 mb-8">
              {post.excerpt}
            </p>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </motion.div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-white font-semibold mb-4">Share this article</h3>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Facebook'].map(platform => (
                <button
                  key={platform}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm transition-colors"
                >
                  Share on {platform}
                </button>
              ))}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
