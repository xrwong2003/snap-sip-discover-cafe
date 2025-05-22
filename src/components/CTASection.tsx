
import React from 'react';
import { Button } from "@/components/ui/button";
import { QrCode, Share2 } from "lucide-react";

const CTASection = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'NESCAFÉ Snap & Sip AI',
        text: 'Discover your coffee personality with NESCAFÉ Snap & Sip AI!',
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      console.log('Web Share API not supported');
    }
  };

  return (
    <section className="bg-nescafe-brown text-white py-16">
      <div className="section-container relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="coffee-bean-1 absolute w-32 h-32 rounded-full border-4 border-white -top-10 -left-10 animate-spin-slow"></div>
          <div className="coffee-bean-2 absolute w-24 h-24 rounded-full border-4 border-white bottom-10 right-10 animate-spin-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Coffee Match?</h2>
          <p className="text-lg mb-8 text-nescafe-cream">
            Scan any NESCAFÉ pack to start your personalized coffee journey and unlock exclusive bonuses.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="button-scan group">
              <QrCode className="mr-2 group-hover:animate-spin-slow" />
              Scan a Pack to Start
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-nescafe-brown"
              onClick={handleShare}
            >
              <Share2 className="mr-2" />
              Share with Friends
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-3">
                <div className="text-nescafe-red text-2xl">🎵</div>
              </div>
              <p className="text-sm text-nescafe-cream">Personalized Playlists</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-3">
                <div className="text-nescafe-red text-2xl">🎁</div>
              </div>
              <p className="text-sm text-nescafe-cream">Exclusive Vouchers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-3">
                <div className="text-nescafe-red text-2xl">👤</div>
              </div>
              <p className="text-sm text-nescafe-cream">Coffee Personality Profile</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-3">
                <div className="text-nescafe-red text-2xl">📱</div>
              </div>
              <p className="text-sm text-nescafe-cream">AR Content Access</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
