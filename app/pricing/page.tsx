import PricingSection from '@/components/PricingSection';
import FAQSection from '@/components/FAQSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const pricingFAQs = [
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, mobile money, and bank transfers through our secure payment gateway."
  },
  {
    question: "Is there a contract or commitment?",
    answer: "No long-term contracts required. You can cancel your subscription at any time."
  },
  {
    question: "Do you offer custom enterprise solutions?",
    answer: "Yes, our enterprise plan can be customized to meet your specific needs. Contact our sales team for details."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, all plans come with a 14-day free trial. No credit card required to start."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We offer email support for all plans, with priority support and dedicated account managers for higher-tier plans."
  }
];

export default function PricingPage() {
  return (
    <div className="bg-black-bg min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-primary mb-6">Choose Your Plan</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started with the perfect plan for your business. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
        
        <PricingSection />

        <FAQSection 
          title="Pricing FAQ"
          description="Find answers to commonly asked questions about our pricing and plans."
          faqs={pricingFAQs}
        />
      </main>
      <Footer />
    </div>
  );
}
