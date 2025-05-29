
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const CafeCategoriesSection = () => {
  const [activeCategory, setActiveCategory] = useState('Most Popular');

  const categories = [
    { id: 'popular', name: 'Most Popular', icon: '🔥' },
    { id: 'nearby', name: 'Nearby', icon: '📍' },
    { id: 'hidden', name: 'Hidden Gems', icon: '💎' },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="section-container">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.name ? "default" : "outline"}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.name
                  ? 'bg-nescafe-red text-white shadow-lg transform scale-105'
                  : 'border-nescafe-brown text-nescafe-brown hover:bg-nescafe-red hover:text-white hover:border-nescafe-red'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CafeCategoriesSection;
