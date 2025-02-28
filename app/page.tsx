import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";

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
      <div className="flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full">
          <main className="flex flex-col items-center">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-primary">African SaaS Boilerplate</h1>
              <p className="text-xl text-gray-300">Build powerful SaaS applications tailored for African markets</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
              <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-primary transition-colors">
                <h2 className="text-2xl font-semibold text-accent mb-4">Local Payment Integration</h2>
                <p className="text-gray-400 text-lg">Built-in support for Paystack and mobile money payments</p>
              </div>
              
              <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-secondary transition-colors">
                <h2 className="text-2xl font-semibold text-secondary mb-4">Authentication</h2>
                <p className="text-gray-400 text-lg">Secure authentication with support for local providers</p>
              </div>

              <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-sunset-200 transition-colors">
                <h2 className="text-2xl font-semibold text-sunset-200 mb-4">Responsive Design</h2>
                <p className="text-gray-400 text-lg">Mobile-first design optimized for African markets</p>
              </div>

              <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-nature-100 transition-colors">
                <h2 className="text-2xl font-semibold text-nature-100 mb-4">Cloud Ready</h2>
                <p className="text-gray-400 text-lg">Easy deployment with built-in cloud infrastructure</p>
              </div>
            </div>

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

            <div className="w-full max-w-6xl mx-auto mb-16">
              <div className="bg-gray-800/50 rounded-2xl p-8 sm:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">Ready for African Enterprises</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">USSD Integration Ready</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">SMS Notification System</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">Compliance with African Regulations</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">Local CDN Integration</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-24 h-24 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full max-w-4xl mx-auto mb-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-secondary">Start Building Today</h2>
              <p className="text-xl text-gray-400 mb-8">Join the growing community of African developers building the next generation of SaaS applications</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Quick Setup</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-6 h-6 text-sunset-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Instant Deployment</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-6 h-6 text-nature-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            <div className="flex gap-6 items-center justify-center mt-12">
              <a
                href="/signup"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Get Started
              </a>
              <a
                href="/docs"
                className="text-gray-300 hover:text-primary px-8 py-3 rounded-full font-medium transition-colors"
              >
                Documentation
              </a>
            </div>
          </main>
        </div>
      </div>

      {/* Features Section */}
      {/* ... */}

      {/* Add Pricing Section */}
      <div className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-6">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400">Choose the perfect plan to start building your SaaS application</p>
        </div>
        <PricingSection />
      </div>

      {/* Add FAQ Section */}
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
