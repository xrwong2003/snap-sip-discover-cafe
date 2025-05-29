
import React from 'react';
import { Button } from "@/components/ui/button";

interface WelcomePageProps {
  onGetStarted: () => void;
}

const WelcomePage = ({ onGetStarted }: WelcomePageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nescafe-cream via-white to-nescafe-cream flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4">
        {/* Hero Image */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/9d92cff0-454f-4af6-926b-43d728a1813b.png" 
            alt="NESCAFÉ Red Mug"
            className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl"
          />
        </div>

        {/* Welcome Content */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-nescafe-red mb-6 tracking-tight">
            NESCAFÉ
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-nescafe-brown mb-6">
            Snap & Sip AI
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover your coffee personality, track your brewing journey, and earn rewards with every sip!
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">☕</div>
            <h3 className="font-bold text-lg mb-2">My Profile</h3>
            <p className="text-gray-600">Customize your coffee avatar and track your journey</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-bold text-lg mb-2">Daily Activities</h3>
            <p className="text-gray-600">Complete quizzes, games, and maintain your streak</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="font-bold text-lg mb-2">Achievements</h3>
            <p className="text-gray-600">Earn badges and climb the leaderboard</p>
          </div>
        </div>

        {/* Get Started Button */}
        <Button 
          className="bg-nescafe-red hover:bg-nescafe-brown text-white font-bold py-6 px-12 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={onGetStarted}
        >
          Get Started
        </Button>

        <p className="text-gray-500 mt-6">
          Start your coffee adventure today!
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
