
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <span className={`font-bold text-2xl ${isScrolled ? 'text-nescafe-red' : 'text-nescafe-red'}`}>
                NESCAFÉ
              </span>
              <span className={`ml-2 font-medium ${isScrolled ? 'text-nescafe-brown' : 'text-white'}`}>
                Snap & Sip AI
              </span>
            </a>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#how-it-works" 
              className={`hover:text-nescafe-red transition-colors ${
                isScrolled ? 'text-nescafe-brown' : 'text-white'
              }`}
            >
              How It Works
            </a>
            <a 
              href="#" 
              className={`hover:text-nescafe-red transition-colors ${
                isScrolled ? 'text-nescafe-brown' : 'text-white'
              }`}
            >
              Coffee Personas
            </a>
            <a 
              href="#" 
              className={`hover:text-nescafe-red transition-colors ${
                isScrolled ? 'text-nescafe-brown' : 'text-white'
              }`}
            >
              Products
            </a>
            <Button 
              variant="default" 
              className={`${isScrolled ? 'bg-nescafe-red text-white' : 'bg-white text-nescafe-red'} hover:bg-nescafe-brown hover:text-white`}
            >
              Try Now
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? 'text-nescafe-brown' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col gap-4">
              <a 
                href="#how-it-works" 
                className="block px-4 py-2 text-nescafe-brown hover:bg-nescafe-cream rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#" 
                className="block px-4 py-2 text-nescafe-brown hover:bg-nescafe-cream rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Coffee Personas
              </a>
              <a 
                href="#" 
                className="block px-4 py-2 text-nescafe-brown hover:bg-nescafe-cream rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </a>
              <div className="px-4">
                <Button 
                  variant="default" 
                  className="w-full bg-nescafe-red text-white hover:bg-nescafe-brown"
                >
                  Try Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
