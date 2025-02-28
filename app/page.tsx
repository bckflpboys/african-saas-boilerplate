import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import HeroSection from "@/components/HeroSection";
import BlogSection, { sampleBlogPosts } from "@/components/BlogSection";

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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-nature-100 mb-4">Cloud Ready</h2>
                  <p className="text-gray-400 text-lg">Easy deployment with built-in cloud infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="w-full max-w-6xl mx-auto mt-24 mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-secondary">Why Choose African SaaS Boilerplate?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-accent">Local Payment Methods</h3>
            <p className="text-gray-400">Support for Paystack, M-Pesa, and other popular African payment gateways</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-sunset-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sunset-200">Optimized Performance</h3>
            <p className="text-gray-400">Built for African internet conditions with offline-first capabilities</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-nature-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-nature-100">Multi-Language Support</h3>
            <p className="text-gray-400">Built-in support for major African languages and localization</p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-6">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400">Choose the perfect plan to start building your SaaS application</p>
        </div>
        <PricingSection />
      </div>

      {/* Blog Section */}
      <div className="border-t border-gray-800">
        <BlogSection posts={sampleBlogPosts} />
      </div>

      {/* FAQ Section */}
      <div className="border-t border-gray-800">
        <FAQSection
          title="Common Questions"
          description="Everything you need to know about the African SaaS Boilerplate"
          faqs={homeFAQs}
        />
      </div>

      <Footer />
    </div>
  );
}
