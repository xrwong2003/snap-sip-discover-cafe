
import React from 'react';

const products = [
  {
    name: "NESCAFÉ Gold",
    description: "Premium instant coffee with rich, aromatic flavor",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&auto=format&fit=crop&q=60",
    types: ["Americano", "Latte", "Cappuccino"]
  },
  {
    name: "NESCAFÉ 3in1",
    description: "Convenient mix of coffee, creamer, and sugar",
    image: "https://images.unsplash.com/photo-1574914629385-46e8178f0e9f?w=300&auto=format&fit=crop&q=60",
    types: ["Original", "Strong", "Creamy"]
  },
  {
    name: "NESCAFÉ Dolce Gusto",
    description: "Cafe-quality drinks with capsule convenience",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&auto=format&fit=crop&q=60",
    types: ["Espresso", "Mocha", "Macchiato"]
  },
  {
    name: "NESCAFÉ Cold Brew",
    description: "Smooth, refreshing iced coffee experience",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&auto=format&fit=crop&q=60",
    types: ["Classic", "Vanilla", "Caramel"]
  },
  {
    name: "NESCAFÉ Frappé",
    description: "Creamy, frothy iced coffee delight",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=300&auto=format&fit=crop&q=60",
    types: ["Original", "Coconut", "Hazelnut"]
  },
  {
    name: "NESCAFÉ Azera",
    description: "Barista-style coffee with premium beans",
    image: "https://images.unsplash.com/photo-1585515656644-5d6fa60bf987?w=300&auto=format&fit=crop&q=60",
    types: ["Intenso", "Smooth", "Americano"]
  }
];

const ProductsSection = () => {
  return (
    <section className="bg-white py-16" id="products">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nescafe-black mb-4">Our Products</h2>
          <p className="text-lg text-nescafe-brown max-w-2xl mx-auto">
            Discover the perfect NESCAFÉ blend for every moment and mood
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-nescafe-brown mb-3">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-nescafe-brown mb-2">Available Varieties:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.types.map((type, typeIndex) => (
                      <span 
                        key={typeIndex}
                        className="bg-nescafe-cream text-nescafe-brown px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-nescafe-red text-white py-2 rounded-lg hover:bg-nescafe-brown transition-colors duration-300 font-medium">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-nescafe-brown mb-4">Find these products at your nearest store or online</p>
          <button className="bg-white border-2 border-nescafe-red text-nescafe-red px-8 py-3 rounded-lg hover:bg-nescafe-red hover:text-white transition-colors duration-300 font-medium">
            Find Store Locations
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
