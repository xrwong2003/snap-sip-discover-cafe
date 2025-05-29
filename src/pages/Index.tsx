
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CafeCategoriesSection from '@/components/CafeCategoriesSection';
import FeaturedCafesSection from '@/components/FeaturedCafesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CoffeePersonasSection from '@/components/CoffeePersonasSection';
import ProductMatchSection from '@/components/ProductMatchSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CafeCategoriesSection />
        <FeaturedCafesSection />
        <HowItWorksSection />
        <CoffeePersonasSection />
        <ProductMatchSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
