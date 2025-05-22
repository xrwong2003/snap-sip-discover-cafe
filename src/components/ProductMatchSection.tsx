
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const products = [
  {
    name: "NESCAFÉ 3in1",
    description: "Perfect for The Hustler. Quick, convenient, and gives you that instant energy boost.",
    image: "https://images.unsplash.com/photo-1574914629385-46e8178f0e9f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    matchFor: "The Hustler"
  },
  {
    name: "NESCAFÉ Gold",
    description: "Ideal for The Dreamer. A smooth, aromatic blend to inspire your creative thoughts.",
    image: "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    matchFor: "The Dreamer"
  },
  {
    name: "NESCAFÉ Iced Can",
    description: "For The Socialite. Refreshing and ready to share with friends anywhere, anytime.",
    image: "https://images.unsplash.com/photo-1527156231393-7023794f363c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    matchFor: "The Socialite"
  },
  {
    name: "NESCAFÉ Kopi Kedah",
    description: "Perfect for The Zen Master. A traditional blend for those who appreciate ritual.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    matchFor: "The Zen Master"
  }
];

const ProductMatchSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nescafe-black mb-4">Find Your Perfect Match</h2>
          <p className="text-lg text-nescafe-brown max-w-2xl mx-auto">
            Every coffee personality has its perfect NESCAFÉ companion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div key={index} className="coffee-card flex flex-col md:flex-row overflow-hidden">
              <div className="md:w-1/2">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-nescafe-cream text-nescafe-brown text-sm rounded-full mb-3">
                  Perfect for {product.matchFor}
                </div>
                <h3 className="text-xl font-bold mb-2 text-nescafe-black">{product.name}</h3>
                <p className="text-nescafe-brown mb-4">{product.description}</p>
                <Link to={`/quiz-results?persona=${encodeURIComponent(product.matchFor)}`}>
                  <Button className="bg-nescafe-red text-white px-4 py-2 rounded-full hover:bg-nescafe-brown transition-colors self-start">
                    See Persona Results
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductMatchSection;
