'use client';

import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { sampleBlogPosts } from "@/components/BlogSection";

export default function BlogPage() {
  return (
    <div className="bg-black-bg min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Our Latest{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                Insights
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover the latest trends, tutorials, and insights about African SaaS development,
              mobile money integration, and web optimization strategies.
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {['All', 'Development', 'Payments', 'Performance', 'Security'].map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${index === 0 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add more sample posts for the blog page */}
            {[...sampleBlogPosts, ...sampleBlogPosts].map((post, index) => (
              <BlogCard key={`${post.id}-${index}`} post={post} index={index} />
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mt-12"
          >
            <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-medium transition-colors">
              Load More Articles
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
