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
    slug: 'building-saas-applications-for-african-markets',
    isBanner: true
  },
  {
    id: '2',
    title: 'The Future of Mobile Money in Africa',
    excerpt: 'Exploring the evolving landscape of mobile money solutions and their impact on African businesses.',
    category: 'Payments',
    author: {
      name: 'Jane Smith',
      image: 'https://ui-avatars.com/api/?name=Jane+Smith&background=FF6B00&color=fff'
    },
    publishDate: 'Feb 27, 2024',
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop',
    slug: 'future-of-mobile-money-africa',
    isBanner: true
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
    publishDate: 'Feb 26, 2024',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    slug: 'optimizing-web-apps-for-african-internet',
    isBanner: true
  },
  {
    id: '4',
    title: 'Securing Your African SaaS Platform',
    excerpt: 'Essential security practices and implementations for protecting your SaaS application and user data.',
    category: 'Security',
    author: {
      name: 'Sarah Williams',
      image: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=10B981&color=fff'
    },
    publishDate: 'Feb 25, 2024',
    readTime: '7 min',
    imageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1600&auto=format&fit=crop',
    slug: 'securing-your-african-saas-platform',
    isFeatured: true
  },
  {
    id: '11',
    title: 'AI Integration in African SaaS',
    excerpt: 'Exploring practical applications of AI and machine learning in African SaaS solutions.',
    category: 'AI & ML',
    author: {
      name: 'Zara Mohammed',
      image: 'https://ui-avatars.com/api/?name=Zara+Mohammed&background=8B5CF6&color=fff'
    },
    publishDate: 'Feb 24, 2024',
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop',
    slug: 'ai-integration-african-saas'
  },
  {
    id: '12',
    title: 'Data Privacy Compliance in Africa',
    excerpt: 'Understanding and implementing data protection regulations across African markets.',
    category: 'Legal',
    author: {
      name: 'Nathan Adebayo',
      image: 'https://ui-avatars.com/api/?name=Nathan+Adebayo&background=F43F5E&color=fff'
    },
    publishDate: 'Feb 23, 2024',
    readTime: '11 min',
    imageUrl: 'https://images.unsplash.com/photo-1562813733-b31f71025d54?q=80&w=1600&auto=format&fit=crop',
    slug: 'data-privacy-compliance-africa',
    isFeatured: true
  },
  {
    id: '13',
    title: 'Cloud Cost Optimization Strategies',
    excerpt: 'Tips and techniques for managing cloud costs while scaling your SaaS business.',
    category: 'Infrastructure',
    author: {
      name: 'Lisa Chen',
      image: 'https://ui-avatars.com/api/?name=Lisa+Chen&background=10B981&color=fff'
    },
    publishDate: 'Feb 22, 2024',
    readTime: '7 min',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    slug: 'cloud-cost-optimization'
  },
  {
    id: '14',
    title: 'Building Community Around Your SaaS',
    excerpt: 'Strategies for building and nurturing a strong user community in African markets.',
    category: 'Marketing',
    author: {
      name: 'Grace Okafor',
      image: 'https://ui-avatars.com/api/?name=Grace+Okafor&background=06B6D4&color=fff'
    },
    publishDate: 'Feb 21, 2024',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600&auto=format&fit=crop',
    slug: 'building-saas-community'
  },
  {
    id: '15',
    title: 'Automated Testing Best Practices',
    excerpt: 'Implementing effective automated testing strategies for your SaaS application.',
    category: 'Testing',
    author: {
      name: 'Daniel Kim',
      image: 'https://ui-avatars.com/api/?name=Daniel+Kim&background=14B8A6&color=fff'
    },
    publishDate: 'Feb 20, 2024',
    readTime: '9 min',
    imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1600&auto=format&fit=crop',
    slug: 'automated-testing-practices',
    isFeatured: true
  },
  {
    id: '16',
    title: 'Localization Strategies for African Markets',
    excerpt: 'Best practices for adapting your SaaS product to different African languages and cultures.',
    category: 'Localization',
    author: {
      name: 'Amina Diallo',
      image: 'https://ui-avatars.com/api/?name=Amina+Diallo&background=EC4899&color=fff'
    },
    publishDate: 'Feb 19, 2024',
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1600&auto=format&fit=crop',
    slug: 'localization-african-markets'
  },
  {
    id: '17',
    title: 'API Design for African Developers',
    excerpt: 'Creating developer-friendly APIs that work well in African contexts.',
    category: 'Development',
    author: {
      name: 'James Mwangi',
      image: 'https://ui-avatars.com/api/?name=James+Mwangi&background=6366F1&color=fff'
    },
    publishDate: 'Feb 18, 2024',
    readTime: '10 min',
    imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1600&auto=format&fit=crop',
    slug: 'api-design-african-developers'
  },
  {
    id: '18',
    title: 'Analytics for African SaaS Products',
    excerpt: 'Setting up and interpreting analytics for better decision-making in African markets.',
    category: 'Analytics',
    author: {
      name: 'Sophie Taylor',
      image: 'https://ui-avatars.com/api/?name=Sophie+Taylor&background=0EA5E9&color=fff'
    },
    publishDate: 'Feb 17, 2024',
    readTime: '7 min',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    slug: 'analytics-african-saas'
  },
  {
    id: '19',
    title: 'Customer Support Best Practices',
    excerpt: 'Building effective customer support systems for African SaaS products.',
    category: 'Support',
    author: {
      name: 'Kwame Mensah',
      image: 'https://ui-avatars.com/api/?name=Kwame+Mensah&background=8B5CF6&color=fff'
    },
    publishDate: 'Feb 16, 2024',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1600&auto=format&fit=crop',
    slug: 'customer-support-practices'
  },
  {
    id: '20',
    title: 'SaaS Pricing for African Markets',
    excerpt: 'Developing effective pricing strategies for African SaaS products.',
    category: 'Business',
    author: {
      name: 'Rachel Ndungu',
      image: 'https://ui-avatars.com/api/?name=Rachel+Ndungu&background=F43F5E&color=fff'
    },
    publishDate: 'Feb 15, 2024',
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop',
    slug: 'saas-pricing-african-markets',
    isFeatured: true
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
