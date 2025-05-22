import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const personas = [
  {
    name: "The Hustler",
    description: "Always on the move, you need your coffee strong and quick to fuel your busy day.",
    image: "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "bg-gradient-to-br from-nescafe-red to-nescafe-brown",
    icon: "💼"
  },
  {
    name: "The Dreamer",
    description: "Thoughtful and creative, you enjoy a smooth coffee that inspires your imagination.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "bg-gradient-to-br from-blue-400 to-purple-500",
    icon: "✨"
  },
  {
    name: "The Socialite",
    description: "Vibrant and outgoing, you prefer coffee that's perfect for sharing with friends.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "bg-gradient-to-br from-amber-400 to-orange-500",
    icon: "🎭"
  },
  {
    name: "The Zen Master",
    description: "Calm and balanced, you appreciate the mindful ritual of a perfectly brewed cup.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "bg-gradient-to-br from-green-400 to-teal-500",
    icon: "🧘"
  },
  {
    name: "The Adventurer",
    description: "Bold and daring, you love trying new coffee flavors and experiences.",
    image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "bg-gradient-to-br from-yellow-400 to-red-500",
    icon: "🌍"
  }
];

const CoffeePersonasSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? personas.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === personas.length - 1 ? 0 : prev + 1));
  };

  const handleSelect = (event: React.MouseEvent<HTMLDivElement>) => {
    const index = Number(event.currentTarget.dataset.index);
    if (!isNaN(index)) {
      setActiveIndex(index);
    }
  };

  const activePersona = personas[activeIndex];

  return (
    <section className="bg-nescafe-cream py-16" id="personas">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nescafe-black mb-4">Discover Your Coffee Persona</h2>
          <p className="text-lg text-nescafe-brown max-w-2xl mx-auto">
            Your coffee choice says a lot about you. Find out which NESCAFÉ personality matches your style.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Persona Carousel */}
          <div className="md:w-1/2 relative">
            <div className={`persona-card rounded-2xl overflow-hidden shadow-xl ${activePersona.color}`}>
              <div className="relative h-80">
                <img 
                  src={activePersona.image} 
                  alt={activePersona.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <div className="text-4xl mb-2">{activePersona.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{activePersona.name}</h3>
                  <p className="text-white/90">{activePersona.description}</p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-white" 
                onClick={handlePrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-2">
                {personas.map((persona, index) => (
                  <div
                    key={index}
                    data-index={index}
                    onClick={handleSelect}
                    className={`w-3 h-3 rounded-full cursor-pointer ${
                      index === activeIndex ? "bg-nescafe-red" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-white" 
                onClick={handleNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Persona Details */}
          <div className="md:w-1/2 bg-white rounded-2xl p-8 shadow-lg">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4 text-nescafe-black">Are You {activePersona.name}?</h3>
              <p className="text-nescafe-brown mb-4">
                {activePersona.description} Each coffee persona has a perfect NESCAFÉ match and unique perks.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-nescafe-red mr-2">✓</span>
                  <span>Personalized coffee recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-nescafe-red mr-2">✓</span>
                  <span>Curated Spotify playlist to match your vibe</span>
                </li>
                <li className="flex items-start">
                  <span className="text-nescafe-red mr-2">✓</span>
                  <span>Special offers and discounts</span>
                </li>
              </ul>
            </div>
            
            <Link to={`/quiz-results?persona=${encodeURIComponent(activePersona.name)}`}>
              <Button className="w-full bg-nescafe-red hover:bg-nescafe-brown text-white">
                See Full Results
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoffeePersonasSection;
