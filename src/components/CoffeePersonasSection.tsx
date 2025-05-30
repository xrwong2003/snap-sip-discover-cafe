
import React from 'react';

const coffeePersonas = [
  {
    emoji: "😌",
    name: "Relaxed",
    description: "You prefer calm moments with smooth, creamy coffee",
    recommendation: "NESCAFÉ Smooth Latte",
    color: "bg-blue-100 border-blue-300"
  },
  {
    emoji: "🧠",
    name: "Focused",
    description: "You need that mental clarity and concentration boost",
    recommendation: "NESCAFÉ Gold Americano",
    color: "bg-purple-100 border-purple-300"
  },
  {
    emoji: "💥",
    name: "Energetic",
    description: "You're always on the go and need that instant energy",
    recommendation: "NESCAFÉ 3in1 Original",
    color: "bg-orange-100 border-orange-300"
  },
  {
    emoji: "😎",
    name: "Adventurous",
    description: "You love exploring bold flavors and new experiences",
    recommendation: "NESCAFÉ Mocha",
    color: "bg-green-100 border-green-300"
  }
];

const CoffeePersonasSection = () => {
  return (
    <section className="bg-nescafe-cream py-16" id="coffee-personas">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nescafe-black mb-4">Coffee Personas</h2>
          <p className="text-lg text-nescafe-brown max-w-2xl mx-auto">
            Discover your unique coffee personality and get personalized recommendations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coffeePersonas.map((persona, index) => (
            <div key={index} className={`${persona.color} border-2 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300`}>
              <div className="text-6xl mb-4">{persona.emoji}</div>
              <h3 className="text-xl font-bold text-nescafe-brown mb-3">{persona.name}</h3>
              <p className="text-gray-700 mb-4 text-sm">{persona.description}</p>
              <div className="bg-white rounded-lg p-3 border">
                <p className="font-semibold text-nescafe-red text-sm">Perfect Match:</p>
                <p className="text-nescafe-brown font-medium">{persona.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-nescafe-brown mb-4">Want to discover your persona?</p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-nescafe-red text-white px-8 py-3 rounded-lg hover:bg-nescafe-brown transition-colors duration-300 font-medium"
          >
            Take the Quiz
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoffeePersonasSection;
