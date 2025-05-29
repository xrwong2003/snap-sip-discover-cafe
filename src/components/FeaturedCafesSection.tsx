
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";

const FeaturedCafesSection = () => {
  const featuredCafes = [
    {
      id: 1,
      name: "Artisan Coffee Roasters",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
      description: "Specialty single-origin coffees roasted in-house daily. Known for their Ethiopian beans and latte art.",
      location: "Downtown District",
      rating: 4.8,
      category: "Most Popular"
    },
    {
      id: 2,
      name: "The Cozy Corner",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
      description: "A warm, intimate space perfect for studying or catching up with friends. Famous for their cinnamon rolls.",
      location: "University Area",
      rating: 4.6,
      category: "Hidden Gems"
    },
    {
      id: 3,
      name: "Brew & Bean",
      image: "https://images.unsplash.com/photo-1559496417-e7f25cb247cd?w=400&h=300&fit=crop",
      description: "Modern café with industrial design. Offers coffee workshops and has an extensive tea selection.",
      location: "Arts Quarter",
      rating: 4.7,
      category: "Nearby"
    },
    {
      id: 4,
      name: "Morning Glory Café",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      description: "Early bird special with fresh pastries and expertly crafted espresso drinks. Opens at 6 AM.",
      location: "Business District",
      rating: 4.5,
      category: "Most Popular"
    },
    {
      id: 5,
      name: "Garden Café",
      image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop",
      description: "Outdoor seating surrounded by plants. Serves organic coffee and healthy breakfast options.",
      location: "Green Valley",
      rating: 4.9,
      category: "Hidden Gems"
    },
    {
      id: 6,
      name: "City Central Coffee",
      image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&h=300&fit=crop",
      description: "Convenient location with quick service. Perfect for grab-and-go coffee and light snacks.",
      location: "City Center",
      rating: 4.4,
      category: "Nearby"
    }
  ];

  return (
    <section className="py-16 bg-nescafe-cream/30">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-nescafe-black">
          Featured Cafés
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCafes.map((cafe) => (
            <Card key={cafe.id} className="coffee-card group cursor-pointer hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={cafe.image}
                  alt={cafe.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{cafe.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-nescafe-black">{cafe.name}</h3>
                <div className="flex items-center gap-1 mb-3 text-nescafe-brown">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{cafe.location}</span>
                </div>
                <p className="text-nescafe-brown/80 text-sm leading-relaxed">{cafe.description}</p>
              </CardContent>
              
              <CardFooter className="px-6 pb-6">
                <Button className="w-full bg-nescafe-red hover:bg-nescafe-red/90 text-white font-semibold py-2 rounded-full transition-all duration-300">
                  View More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="border-nescafe-red text-nescafe-red hover:bg-nescafe-red hover:text-white px-8 py-3 rounded-full font-semibold">
            View All Cafés
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCafesSection;
