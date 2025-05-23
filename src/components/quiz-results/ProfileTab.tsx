
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProfileTabProps {
  persona: any;
  personaName: string;
  handleCopyCoupon: () => void;
}

const ProfileTab = ({ 
  persona, 
  personaName,
  handleCopyCoupon 
}: ProfileTabProps) => {
  return (
    <>
      <div className="text-center mb-8">
        <div className="mb-4 inline-block p-4 rounded-full bg-white">
          <div className="text-5xl">{persona.icon}</div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Coffee Persona</h1>
        <div className={`${persona.color} text-white font-bold py-2 px-6 rounded-full text-xl md:text-2xl inline-block mb-4`}>
          {personaName}
        </div>
        <p className="text-lg text-nescafe-brown max-w-xl mx-auto">{persona.description}</p>
      </div>

      {/* Coffee Recommendation */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
        <h2 className="text-2xl font-bold p-6 bg-nescafe-red text-white">Your Perfect Coffee Match</h2>
        <div className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/3">
            <img 
              src={persona.product.image} 
              alt={persona.product.name} 
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-2/3">
            <h3 className="text-xl font-bold mb-2">{persona.product.name}</h3>
            <p className="text-gray-700 mb-4">{persona.product.description}</p>
            <Button className="bg-nescafe-red hover:bg-nescafe-brown text-white">
              Shop Now
            </Button>
          </div>
        </div>
      </div>

      {/* Special Offer */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-nescafe-red to-nescafe-brown p-6">
          <h2 className="text-2xl font-bold text-white">Your Special Offer</h2>
        </div>
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">Use this coupon code</p>
            <p className="text-3xl font-bold mb-1">{persona.coupon}</p>
            <p className="text-sm text-gray-600">for 20% off your next purchase</p>
          </div>
          <Button 
            className="w-full bg-nescafe-red hover:bg-nescafe-brown text-white"
            onClick={handleCopyCoupon}
          >
            Copy Code
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfileTab;
