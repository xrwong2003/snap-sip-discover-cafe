
import React from 'react';
import { QrCode, MessageSquare, UserCircle, Gamepad2, Gift } from "lucide-react";

const steps = [
  {
    icon: <QrCode className="w-10 h-10 text-nescafe-red" />,
    title: "Scan & Start",
    description: "Scan the QR code on any NESCAFÉ product using your smartphone to launch an interactive AR experience."
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-nescafe-red" />,
    title: "Meet Your Barista",
    description: "An AI-powered digital barista guides you through a fun personality quiz to discover your unique Coffee Persona."
  },
  {
    icon: <UserCircle className="w-10 h-10 text-nescafe-red" />,
    title: "Create & Customize",
    description: "Design your Coffee Avatar based on your persona. Customize styles, unlock traits, and evolve it through daily app engagement."
  },
  {
    icon: <Gamepad2 className="w-10 h-10 text-nescafe-red" />,
    title: "Play & Earn",
    description: "Keep your Daily Brew Streak, take mood quizzes, and play mini-games like Bean Hunt to earn Aroma Points and exclusive perks."
  },
  {
    icon: <Gift className="w-10 h-10 text-nescafe-red" />,
    title: "Redeem & Repeat",
    description: "Redeem points for rewards at AR kiosks or online, unlock new content, and share your Coffee Persona on social media. Come back daily for fresh experiences!"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="bg-white py-16" id="how-it-works">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nescafe-black mb-4">How It Works</h2>
          <p className="text-lg text-nescafe-brown max-w-2xl mx-auto">Your personalized coffee adventure — one sip, one scan, one step at a time.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="step-card group">
              <div className="rounded-full w-16 h-16 bg-nescafe-cream flex items-center justify-center mb-4 mx-auto group-hover:bg-nescafe-red transition-colors duration-300">
                <div className="rounded-full w-14 h-14 bg-white flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center text-nescafe-brown">{step.title}</h3>
              <p className="text-gray-600 text-center text-sm">{step.description}</p>
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
