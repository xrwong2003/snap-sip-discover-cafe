
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="bg-gradient-to-br from-nescafe-cream to-white relative overflow-hidden">
      <div className="bg-coffee-texture absolute inset-0 opacity-30"></div>
      <div className="section-container relative z-10 flex flex-col items-center">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-nescafe-black">
            <span className="inline-block text-nescafe-red animate-pulse-gentle">NESCAFÉ</span> Snap & Sip AI
          </h1>
          <p className="text-xl md:text-2xl text-nescafe-brown opacity-90 mb-8">
            Discover your coffee personality and perfect NESCAFÉ match through our AI-powered AR experience
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nescafe-brown h-5 w-5" />
            <Input
              type="text"
              placeholder="Search cafes by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg border-2 border-nescafe-brown/20 focus:border-nescafe-red rounded-full"
            />
          </div>
          
          <div className="mt-12">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-nescafe-red flex items-center justify-center animate-float shadow-lg">
                <span className="text-white font-bold text-lg">AR</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-nescafe-brown flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: '0.5s' }}>
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-nescafe-red flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: '1s' }}>
                <span className="text-white font-bold text-lg">YOU</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-1 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
          <path fill="#FFFFFF" d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
