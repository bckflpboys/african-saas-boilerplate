'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const pricingPlans = [
  {
    name: 'Starter',
    price: { monthly: 29, yearly: 290 },
    description: 'Perfect for small businesses just getting started',
    features: [
      'Up to 1,000 customers',
      'Basic analytics',
      'Email support',
      '2 team members',
      'Basic integrations',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: { monthly: 79, yearly: 790 },
    description: 'Ideal for growing businesses with more needs',
    features: [
      'Up to 10,000 customers',
      'Advanced analytics',
      'Priority email & chat support',
      '5 team members',
      'Advanced integrations',
      'Custom domain',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: 199, yearly: 1990 },
    description: 'For large scale operations and maximum features',
    features: [
      'Unlimited customers',
      'Custom analytics',
      '24/7 priority support',
      'Unlimited team members',
      'All integrations',
      'Custom solutions',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-20 bg-black-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400">Choose the perfect plan for your business</p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <span className={`text-sm ${!isYearly ? 'text-primary' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700"
            >
              <span className="sr-only">Toggle billing period</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-primary transition ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-primary' : 'text-gray-400'}`}>
              Yearly <span className="text-accent">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ scale: 1.02 }}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-primary/10 to-black-bg border-2 border-primary'
                  : 'bg-gray-800 border border-gray-700'
              }`}
            >
              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">
                  ${isYearly ? plan.price.yearly : plan.price.monthly}
                </span>
                <span className="text-gray-400">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <svg
                      className="h-5 w-5 text-primary mr-3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                className={`block w-full py-3 px-6 text-center rounded-full font-medium transition-colors ${
                  plan.highlighted
                    ? 'bg-primary hover:bg-primary/90 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
