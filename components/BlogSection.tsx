'use client';

import { motion } from 'framer-motion';
import BlogCard, { BlogPost } from './BlogCard';
import Link from 'next/link';

interface BlogSectionProps {
  title?: string;
  description?: string;
  posts: BlogPost[];
  showViewAll?: boolean;
}

// Sample blog posts data with online images
export const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building SaaS Applications for African Markets',
    excerpt: 'Learn the key considerations and best practices for developing successful SaaS applications tailored to African markets.',
    category: 'Development',
    author: {
      name: 'John Doe',
      image: 'https://ui-avatars.com/api/?name=John+Doe&background=0062F4&color=fff'
    },
    publishDate: 'Feb 28, 2024',
    readTime: '5 min',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop',
    slug: 'building-saas-applications-for-african-markets'
  },
  {
    id: '2',
    title: 'Integrating Mobile Money Payments in Next.js',
    excerpt: 'A comprehensive guide to implementing mobile money payment solutions in your Next.js applications.',
    category: 'Payments',
    author: {
      name: 'Jane Smith',
      image: 'https://ui-avatars.com/api/?name=Jane+Smith&background=FF6B00&color=fff'
    },
    publishDate: 'Feb 25, 2024',
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop',
    slug: 'integrating-mobile-money-payments'
  },
  {
    id: '3',
    title: 'Optimizing Web Apps for African Internet',
    excerpt: 'Strategies and techniques for making your web applications perform better in regions with limited internet connectivity.',
    category: 'Performance',
    author: {
      name: 'Mike Johnson',
      image: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=00B4D8&color=fff'
    },
    publishDate: 'Feb 22, 2024',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    slug: 'optimizing-web-apps-for-african-internet'
  }
];

export default function BlogSection({ 
  title = "Latest from Our Blog",
  description = "Stay updated with the latest insights, tutorials, and news about African SaaS development",
  posts = sampleBlogPosts,
  showViewAll = true 
}: BlogSectionProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-primary mb-4"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {showViewAll && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/90 font-medium"
            >
              View All Articles
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
