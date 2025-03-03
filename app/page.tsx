'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import HeroSection from "@/components/HeroSection";
import BlogSection from "@/components/BlogSection";
import { BlogPost } from "@/components/BlogCard";

const homeFAQs = [
  {
    question: "What makes this boilerplate special for African markets?",
    answer: "Our boilerplate is specifically designed with African markets in mind, featuring local payment integrations, USSD support, and optimizations for varied internet conditions."
  },
  {
    question: "How easy is it to customize?",
    answer: "Very easy! The boilerplate is built with TypeScript and follows modern React practices, making it simple to modify and extend according to your needs."
  },
  {
    question: "What payment methods are supported?",
    answer: "We support various African payment methods including Paystack, mobile money, and bank transfers, with easy integration for additional payment providers."
  },
  {
    question: "Is it mobile-friendly?",
    answer: "Yes! The boilerplate is fully responsive and optimized for all devices, with special consideration for the high mobile usage in African markets."
  }
];

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (err: any) {
      console.error('Error fetching posts:', err);
    }
  };

  return (
    <div className="bg-black-bg min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection 
        title="African SaaS Boilerplate"
        description="Build scalable and powerful SaaS applications optimized for African markets. Get started with our comprehensive toolkit designed for modern web development."
      />

      {/* Features Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-accent mb-4">Local Payment Integration</h2>
                  <p className="text-gray-400 text-lg">Built-in support for Paystack and mobile money payments</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-secondary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-secondary mb-4">Authentication</h2>
                  <p className="text-gray-400 text-lg">Secure authentication with support for local providers</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-sunset-200 transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-sunset-200/10 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-sunset-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-sunset-200 mb-4">Responsive Design</h2>
                  <p className="text-gray-400 text-lg">Mobile-first design optimized for African markets</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-nature-100 transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-nature-100/10 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-nature-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-nature-100 mb-4">Performance</h2>
                  <p className="text-gray-400 text-lg">Optimized for varying network conditions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="border-t border-gray-800">
        <PricingSection />
      </div>

      {/* Blog Section */}
      <div className="border-t border-gray-800">
        <BlogSection 
          posts={posts}
          title="Latest from Our Blog"
          description="Stay updated with the latest insights, tutorials, and news about African SaaS development"
        />
      </div>

      {/* FAQ Section */}
      <div className="border-t border-gray-800">
        <FAQSection faqs={homeFAQs} />
      </div>

      <Footer />
    </div>
  );
}
