import React from 'react';
import HeroSection from "./HeroSection";
import SolutionOverview from "./SolutionOverview";
import FeaturesAndBenefits from "./FeaturesAndBenefits";
import TestimonialsSection from "./TestimonialsSection";
import TrustAndPricing from "./TrustAndPricing";
import ContactFooter from "./ContactFooter";

const LedLandingPage: React.FC = () => {
  return (
    // Remove default margin/padding and extend background to the very top
    <div className="w-full min-h-screen bg-slate-900 absolute top-0 left-0 right-0">
      <div className="container mx-auto px-4">
        <main className="flex flex-col">
          {/* Add padding-top instead of margin to maintain background color */}
          <div className="pt-24"> {/* Adjusted from pt-32 to pt-24 to account for nav height */}
            <HeroSection />
          </div>
          <SolutionOverview />
          <FeaturesAndBenefits />
          <TestimonialsSection />
          <TrustAndPricing />
          <ContactFooter />
        </main>
      </div>
    </div>
  );
};

export default LedLandingPage;