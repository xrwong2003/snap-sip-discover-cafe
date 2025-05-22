
import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
  const [activePersona, setActivePersona] = useState(0);

  return (
    <section className="bg-nescafe-cream py-16">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nescafe-black mb-4">Discover Your Coffee Persona</h2>
          <p className="text-lg text-nescafe-brown max-w-2xl mx-auto">Which coffee personality matches your lifestyle?</p>
        </div>

        <Carousel 
          className="w-full max-w-5xl mx-auto"
          onSelect={(index) => setActivePersona(index)}
        >
          <CarouselContent>
            {personas.map((persona, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="persona-card h-full p-1">
                  <div className={`rounded-xl overflow-hidden shadow-lg h-full ${persona.color}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={persona.image} 
                        alt={persona.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl shadow-md">
                        {persona.icon}
                      </div>
                    </div>
                    <div className="p-5 text-center bg-white">
                      <h3 className="text-xl font-bold mb-2">{persona.name}</h3>
                      <p className="text-nescafe-brown">{persona.description}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:flex justify-center mt-8 gap-4">
            <CarouselPrevious className="relative bg-nescafe-red text-white hover:bg-nescafe-brown hover:text-white" />
            <CarouselNext className="relative bg-nescafe-red text-white hover:bg-nescafe-brown hover:text-white" />
          </div>
        </Carousel>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {personas.map((_, index) => (
              <button
                key={index}
                onClick={() => setActivePersona(index)}
                className={`w-3 h-3 rounded-full ${
                  activePersona === index ? 'bg-nescafe-red' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoffeePersonasSection;
