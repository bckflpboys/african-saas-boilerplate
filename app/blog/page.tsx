'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard, { BlogPost } from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import BlogBanner from "@/components/BlogBanner";
import { sampleBlogPosts } from "@/components/BlogSection";

export default function BlogPage() {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(
    sampleBlogPosts.filter(post => !post.isBanner)
  );
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Development', 'Payments', 'Performance', 'Security'];

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredPosts(sampleBlogPosts.filter(post => !post.isBanner));
      return;
    }

    const searchResults = sampleBlogPosts
      .filter(post => !post.isBanner)
      .filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setFilteredPosts(searchResults);
  };

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredPosts(sampleBlogPosts.filter(post => !post.isBanner));
      return;
    }
    const categoryPosts = sampleBlogPosts
      .filter(post => !post.isBanner)
      .filter(post => post.category === category);
    setFilteredPosts(categoryPosts);
  };

  // Separate featured posts
  const featuredPosts = filteredPosts.filter(post => post.isFeatured);
  const regularPosts = filteredPosts.filter(post => !post.isFeatured);

  return (
    <div className="bg-black-bg min-h-screen flex flex-col">
      <Navbar />

      {/* Banner Section */}
      <BlogBanner posts={sampleBlogPosts} />

      {/* Search and Categories Section */}
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
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Discover the latest trends, tutorials, and insights about African SaaS development,
              mobile money integration, and web optimization strategies.
            </p>

            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              posts={sampleBlogPosts.filter(post => !post.isBanner)}
              className="max-w-2xl mx-auto"
            />
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${category === activeCategory
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
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-gray-400">No articles found matching your criteria.</p>
            </motion.div>
          ) : (
            <>
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-white mb-8">Featured Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredPosts.map((post, index) => (
                      <BlogCard key={`featured-${post.id}`} post={post} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              {regularPosts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post, index) => (
                      <BlogCard key={`regular-${post.id}`} post={post} index={index} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Load More Button */}
          {regularPosts.length >= 6 && (
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
