'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeroSectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export default function HeroSection({
  title = "African SaaS Boilerplate",
  description = "Build powerful SaaS applications tailored for African markets",
  primaryButtonText = "Get Started",
  primaryButtonLink = "/signup",
  secondaryButtonText = "Documentation",
  secondaryButtonLink = "/docs"
}: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-t from-accent/20 via-nature-100/10 to-transparent blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Title */}
          <motion.h1 
            className="text-5xl sm:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
            variants={itemVariants}
          >
            {description}
          </motion.p>

          {/* Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Link
              href={primaryButtonLink}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-colors text-lg w-full sm:w-auto"
            >
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonLink}
              className="border border-gray-700 hover:border-primary text-gray-300 hover:text-primary px-8 py-4 rounded-full font-medium transition-colors text-lg w-full sm:w-auto"
            >
              {secondaryButtonText}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-400">Components</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">10+</div>
              <div className="text-gray-400">Payment Methods</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">15+</div>
              <div className="text-gray-400">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-nature-100 mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
