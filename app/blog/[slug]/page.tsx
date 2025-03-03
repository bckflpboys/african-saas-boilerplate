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

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post?.title;
    
    const shareUrls = {
      Twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text || '')}`,
      Reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text || '')}`,
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
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
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                  {post.category}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4">
                  <p className="text-gray-300">
                    {new Date(post.createdAt).toLocaleDateString()} · {post.readingTime}
                  </p>
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
            <div 
              dangerouslySetInnerHTML={{ 
                __html: post.content.replace(
                  /<h1>/g, '<h1 style="font-size: 2.25rem; font-weight: 700; color: white; margin-bottom: 1.5rem; line-height: 1.2;">'
                ).replace(
                  /<h2>/g, '<h2 style="font-size: 1.875rem; font-weight: 600; color: white; margin-bottom: 1rem; line-height: 1.3;">'
                ).replace(
                  /<p><\/p>/g, '<p style="margin-top: 2rem;"></p>'
                ).replace(
                  /<ul>/g, '<ul style="list-style-type: disc; padding-left: 1.5rem; margin: 1rem 0;">'
                ).replace(
                  /<ol>/g, '<ol style="list-style-type: decimal; padding-left: 1.5rem; margin: 1rem 0;">'
                ).replace(
                  /<li>/g, '<li style="margin-bottom: 0.5rem; color: #D1D5DB;">'
                )
              }} 
              className="prose prose-lg prose-invert max-w-none [&>p]:mb-4" 
            />
          </motion.div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-white font-semibold mb-4">Share this article</h3>
            <div className="flex gap-4">
              {['Twitter', 'Reddit', 'Facebook'].map(platform => (
                <button
                  key={platform}
                  onClick={() => handleShare(platform)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm transition-colors flex items-center gap-2"
                >
                  Share on {platform}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
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
