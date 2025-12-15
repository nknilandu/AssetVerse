import React from "react";
import PricingPlans from "./Components/PricingPlans/PricingPlans";
import FeaturesSection from "./Components/FeaturesSection/FeaturesSection";
import Stats from "./Components/Stats/Stats";
import TestimonialsSection from "./Components/TestimonialsSection/TestimonialsCommentsSection";
import { HowItWorksSection } from "./Components/HowItWorksSection/HowItWorksSection";
import FaqSection from "./Components/FaqSection/FaqSection";
import Banner from "./Components/Banner/Banner";
import AboutSection from "./Components/AboutSection/AboutSection";
import TestimonialsCompanySection from "./Components/TestimonialsSection/TestimonialsCompanySection";
import { Element } from "react-scroll";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto pt-24 pb-10 px-4">
      <Banner></Banner>
      <AboutSection></AboutSection>
    
      <Element name="pricing">
        <PricingPlans></PricingPlans>
      </Element>

      <Element name="features" >
        <FeaturesSection></FeaturesSection>
      </Element>
      <Stats></Stats>
      <Element className="testimonials">
        <TestimonialsSection></TestimonialsSection>
        <TestimonialsCompanySection></TestimonialsCompanySection>
      </Element>
      <HowItWorksSection></HowItWorksSection>
      <Element name="faq">
        <FaqSection></FaqSection>
      </Element>
    </div>
  );
};

export default Home;
