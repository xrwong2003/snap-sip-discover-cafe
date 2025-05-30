
import React from 'react';

const products = [
  {
    name: "NESCAFÉ Gold",
    description: "Premium instant coffee with rich, aromatic flavor",
    image: "/lovable-uploads/d7313ef4-838e-4360-819b-972ad9652a45.png",
    types: ["Rich & Smooth", "Pure Soluble Coffee", "100 Cups"]
  },
  {
    name: "NESCAFÉ 3in1",
    description: "Convenient mix of coffee, creamer, and sugar",
    image: "/lovable-uploads/e7bb1326-debe-4dbd-915a-e1243e8b385b.png",
    types: ["Original", "Aromatic & Balanced", "25 Sachets"]
  },
  {
    name: "NESCAFÉ Dolce Gusto",
    description: "Cafe-quality drinks with capsule convenience",
    image: "/lovable-uploads/f1b854e8-0d12-4be1-9eec-3fd5711435db.png",
    types: ["Cappuccino", "Ristretto Ardenza", "16 Capsules"]
  },
  {
    name: "NESCAFÉ Cold Brew",
    description: "Smooth, refreshing iced coffee experience",
    image: "/lovable-uploads/9fca2f95-60b3-40a5-b21d-4b0f65bc84d1.png",
    types: ["Latte", "Milk Coffee", "Smooth Taste"]
  },
  {
    name: "NESCAFÉ Frappé",
    description: "Creamy, frothy iced coffee delight",
    image: "/lovable-uploads/34daee69-beb3-4eb5-bf63-bd2906a6e70b.png",
    types: ["Typ Eiskaffee", "Lactose Free", "100g"]
  },
  {
    name: "NESCAFÉ Azera",
    description: "Barista-style coffee with premium beans",
    image: "/lovable-uploads/dda013d5-f4d5-4c3d-8d72-ec5e21a2e807.png",
    types: ["Espresso", "Intenso", "Americano"]
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
              <div className="h-64 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
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
