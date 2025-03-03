'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from './BlogCard';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  posts: BlogPost[];
  className?: string;
}

export default function SearchBar({ onSearch, posts, className = '' }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Show only first 5 suggestions
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm, posts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles..."
            className="w-full px-5 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            type="submit"
            className="absolute inset-y-1 right-1 flex items-center px-4 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Search
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden"
          >
            <ul className="divide-y divide-gray-700">
              {suggestions.map((post) => (
                <motion.li
                  key={post._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group hover:bg-gray-700/50 transition-colors"
                >
                  <button
                    onClick={() => {
                      setSearchTerm(post.title);
                      onSearch(post.title);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-4 py-3 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                        {post.category}
                      </span>
                      <p className="text-white group-hover:text-primary transition-colors">
                        {post.title}
                      </p>
                    </div>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
