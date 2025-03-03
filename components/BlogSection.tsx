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
    _id: '1',
    title: 'Building SaaS Applications for African Markets',
    excerpt: 'Learn the key considerations and best practices for developing successful SaaS applications tailored to African markets.',
    category: 'Development',
    author: 'John Doe',
    createdAt: '2024-02-28',
    readingTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop',
    isBanner: true
  },
  {
    _id: '2',
    title: 'The Future of Mobile Money in Africa',
    excerpt: 'Exploring the evolving landscape of mobile money solutions and their impact on African businesses.',
    category: 'Payments',
    author: 'Jane Smith',
    createdAt: '2024-02-27',
    readingTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop',
    isBanner: true
  },
  {
    _id: '3',
    title: 'Optimizing Web Apps for African Internet',
    excerpt: 'Strategies and techniques for making your web applications perform better in regions with limited internet connectivity.',
    category: 'Performance',
    author: 'Mike Johnson',
    createdAt: '2024-02-26',
    readingTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    isBanner: true
  },
  {
    _id: '4',
    title: 'Securing Your African SaaS Platform',
    excerpt: 'Essential security practices and implementations for protecting your SaaS application and user data.',
    category: 'Security',
    author: 'Sarah Williams',
    createdAt: '2024-02-25',
    readingTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1600&auto=format&fit=crop',
    isFeatured: true
  },
  {
    _id: '11',
    title: 'AI Integration in African SaaS',
    excerpt: 'Exploring practical applications of AI and machine learning in African SaaS solutions.',
    category: 'AI & ML',
    author: 'Zara Mohammed',
    createdAt: '2024-02-24',
    readingTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop'
  },
  {
    _id: '12',
    title: 'Data Privacy Compliance in Africa',
    excerpt: 'Understanding and implementing data protection regulations across African markets.',
    category: 'Legal',
    author: 'Nathan Adebayo',
    createdAt: '2024-02-23',
    readingTime: '11 min read',
    coverImage: 'https://images.unsplash.com/photo-1562813733-b31f71025d54?q=80&w=1600&auto=format&fit=crop'
  },
  {
    _id: '13',
    title: 'Cloud Cost Optimization Strategies',
    excerpt: 'Tips and techniques for managing cloud costs while scaling your SaaS business.',
    category: 'Infrastructure',
    author: 'Lisa Chen',
    createdAt: '2024-02-22',
    readingTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop'
  },
  {
    _id: '14',
    title: 'Building Community Around Your SaaS',
    excerpt: 'Strategies for building and nurturing a strong user community in African markets.',
    category: 'Marketing',
    author: 'Grace Okafor',
    createdAt: '2024-02-21',
    readingTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600&auto=format&fit=crop'
  },
  {
    _id: '15',
    title: 'Automated Testing Best Practices',
    excerpt: 'Implementing effective automated testing strategies for your SaaS application.',
    category: 'Testing',
    author: 'Daniel Kim',
    createdAt: '2024-02-20',
    readingTime: '9 min read',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1600&auto=format&fit=crop',
    isFeatured: true
  },
  {
    _id: '16',
    title: 'Localization Strategies for African Markets',
    excerpt: 'Best practices for adapting your SaaS product to different African languages and cultures.',
    category: 'Localization',
    author: 'Amina Diallo',
    createdAt: '2024-02-19',
    readingTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1600&auto=format&fit=crop'
  },
  {
    _id: '17',
    title: 'API Design for African Developers',
    excerpt: 'Creating developer-friendly APIs that work well in African contexts.',
    category: 'Development',
    author: 'James Mwangi',
    createdAt: '2024-02-18',
    readingTime: '10 min read',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1600&auto=format&fit=crop'
  },
  {
    _id: '18',
    title: 'Analytics for African SaaS Products',
    excerpt: 'Setting up and interpreting analytics for better decision-making in African markets.',
    category: 'Analytics',
    author: 'Sophie Taylor',
    createdAt: '2024-02-17',
    readingTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop'
  },
  {
    _id: '19',
    title: 'Customer Support Best Practices',
    excerpt: 'Building effective customer support systems for African SaaS products.',
    category: 'Support',
    author: 'Kwame Mensah',
    createdAt: '2024-02-16',
    readingTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1600&auto=format&fit=crop'
  },
  {
    _id: '20',
    title: 'SaaS Pricing for African Markets',
    excerpt: 'Developing effective pricing strategies for African SaaS products.',
    category: 'Business',
    author: 'Rachel Ndungu',
    createdAt: '2024-02-15',
    readingTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop',
    isFeatured: true
  }
];

export default function BlogSection({ 
  title = "Latest from Our Blog",
  description = "Stay updated with the latest insights, tutorials, and news about African SaaS development",
  posts = sampleBlogPosts,
  showViewAll = true 
}: BlogSectionProps) {
  // Sort posts to show featured ones first
  const sortedPosts = [...posts].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });

  // Take only the first 6 posts
  const displayPosts = sortedPosts.slice(0, 6);

  return (
    <section className="py-20 bg-black-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard post={post} index={index} />
            </motion.div>
          ))}
        </div>

        {showViewAll && (
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
