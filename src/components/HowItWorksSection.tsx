
import React from 'react';
import { Image, QrCode, Headphones, Gift } from "lucide-react";

const steps = [
  {
    icon: <QrCode className="w-10 h-10 text-nescafe-red" />,
    title: "Scan the QR",
    description: "Find the QR code on any NESCAFÉ pack and scan it with your phone camera"
  },
  {
    icon: <Image className="w-10 h-10 text-nescafe-red" />,
    title: "Take the Quiz",
    description: "Answer a few quick questions with our AI barista in augmented reality"
  },
  {
    icon: <Headphones className="w-10 h-10 text-nescafe-red" />,
    title: "Get Your Match",
    description: "Discover your coffee personality and perfect NESCAFÉ product match"
  },
  {
    icon: <Gift className="w-10 h-10 text-nescafe-red" />,
    title: "Enjoy Perks",
    description: "Unlock digital bonuses like playlists, coupons, and more"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="bg-white py-16" id="how-it-works">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nescafe-black mb-4">How It Works</h2>
          <p className="text-lg text-nescafe-brown max-w-2xl mx-auto">Your journey to the perfect coffee experience in just a few easy steps</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="step-card group">
              <div className="rounded-full w-16 h-16 bg-nescafe-cream flex items-center justify-center mb-4 mx-auto group-hover:bg-nescafe-red transition-colors duration-300">
                <div className="rounded-full w-14 h-14 bg-white flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center text-nescafe-brown">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
              <div className="flex justify-center mt-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-nescafe-cream text-nescafe-brown font-bold">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg italic text-nescafe-brown">"The perfect blend of technology and taste, curated just for you."</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
