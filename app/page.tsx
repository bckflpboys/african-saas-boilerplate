import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

            <div className="flex gap-6 items-center justify-center mt-12">
              <a
                className="rounded-full bg-primary hover:bg-primary/90 text-white px-10 py-4 font-semibold transition-colors text-lg"
                href="/docs"
              >
                Get Started
              </a>
              <a
                className="rounded-full border border-gray-700 hover:border-primary px-10 py-4 font-semibold text-gray-300 transition-colors text-lg"
                href="/docs"
              >
                Documentation
              </a>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
