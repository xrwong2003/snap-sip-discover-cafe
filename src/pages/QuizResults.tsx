
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Headphones, Music, Share2, Spotify, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";
import { spotifyPlaylists, motivationalQuotes } from "@/utils/personaData";

// Sample data for coffee personas
const personaDetails = {
  "The Hustler": {
    description: "Always on the move, you need your coffee strong and quick to fuel your busy day.",
    image: "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "bg-gradient-to-br from-nescafe-red to-nescafe-brown",
    icon: "💼",
    product: {
      name: "NESCAFÉ 3in1",
      image: "https://images.unsplash.com/photo-1574914629385-46e8178f0e9f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Quick, convenient, and gives you that instant energy boost."
    },
    coupon: "HUSTLE20"
  },
  "The Dreamer": {
    description: "Thoughtful and creative, you enjoy a smooth coffee that inspires your imagination.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "bg-gradient-to-br from-blue-400 to-purple-500",
    icon: "✨",
    product: {
      name: "NESCAFÉ Gold",
      image: "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "A smooth, aromatic blend to inspire your creative thoughts."
    },
    coupon: "DREAM15"
  },
  "The Socialite": {
    description: "Vibrant and outgoing, you prefer coffee that's perfect for sharing with friends.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "bg-gradient-to-br from-amber-400 to-orange-500",
    icon: "🎭",
    product: {
      name: "NESCAFÉ Iced Can",
      image: "https://images.unsplash.com/photo-1527156231393-7023794f363c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Refreshing and ready to share with friends anywhere, anytime."
    },
    coupon: "SOCIAL25"
  },
  "The Zen Master": {
    description: "Calm and balanced, you appreciate the mindful ritual of a perfectly brewed cup.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "bg-gradient-to-br from-green-400 to-teal-500",
    icon: "🧘",
    product: {
      name: "NESCAFÉ Kopi Kedah",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "A traditional blend for those who appreciate ritual."
    },
    coupon: "ZEN10"
  },
  "The Adventurer": {
    description: "Bold and daring, you love trying new coffee flavors and experiences.",
    image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    color: "bg-gradient-to-br from-yellow-400 to-red-500",
    icon: "🌍",
    product: {
      name: "NESCAFÉ Origins Collection",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Explore coffee flavors from around the world."
    },
    coupon: "ADVENTURE20"
  }
};

const QuizResults = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [randomPlaylist, setRandomPlaylist] = useState<any>(null);
  const [randomQuote, setRandomQuote] = useState<string>("");

  // In a real app, this would come from the quiz completion
  // For now, using a default persona or URL param
  const personaName = new URLSearchParams(location.search).get('persona') || "The Hustler";
  const persona = personaDetails[personaName as keyof typeof personaDetails];

  useEffect(() => {
    // Get random playlist for this persona
    const playlists = spotifyPlaylists[personaName as keyof typeof spotifyPlaylists] || [];
    const randomPlaylistIndex = Math.floor(Math.random() * playlists.length);
    setRandomPlaylist(playlists[randomPlaylistIndex]);
    
    // Get random quote for this persona
    const quotes = motivationalQuotes[personaName as keyof typeof motivationalQuotes] || [];
    const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomQuoteIndex]);
  }, [personaName]);

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(persona.coupon)
      .then(() => {
        toast({
          title: "Coupon Copied!",
          description: `Use code ${persona.coupon} at checkout for your discount`,
        });
      })
      .catch(() => {
        toast({
          title: "Copy Failed",
          description: "Please manually copy the coupon code",
          variant: "destructive",
        });
      });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `My NESCAFÉ Coffee Persona: ${personaName}`,
        text: `I'm ${personaName}! Discover your coffee personality with NESCAFÉ Snap & Sip AI!`,
        url: window.location.href
      }).catch(console.error);
    } else {
      toast({
        title: "Share",
        description: "Copy the link to share your results!",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-nescafe-cream">
          <div className="section-container">
            <div className="text-center mb-8">
              <div className="mb-4 inline-block p-4 rounded-full bg-white">
                <div className="text-5xl">{persona.icon}</div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Coffee Persona</h1>
              <div className={`${persona.color} text-white font-bold py-2 px-6 rounded-full text-xl md:text-2xl inline-block mb-4`}>
                {personaName}
              </div>
              <p className="text-lg text-nescafe-brown max-w-xl mx-auto">{persona.description}</p>
            </div>

            {/* Coffee Recommendation */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
              <h2 className="text-2xl font-bold p-6 bg-nescafe-red text-white">Your Perfect Coffee Match</h2>
              <div className="p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/3">
                  <img 
                    src={persona.product.image} 
                    alt={persona.product.name} 
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-2">{persona.product.name}</h3>
                  <p className="text-gray-700 mb-4">{persona.product.description}</p>
                  <Button className="bg-nescafe-red hover:bg-nescafe-brown text-white">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Spotify Playlist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {randomPlaylist && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 flex items-center">
                    <Spotify className="h-8 w-8 text-white mr-3" />
                    <h2 className="text-2xl font-bold text-white">Your Spotify Playlist</h2>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{randomPlaylist.name}</h3>
                    <p className="text-gray-700 mb-4">{randomPlaylist.description}</p>
                    <div className="bg-gray-100 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Music className="h-4 w-4 mr-2" /> 
                        Top Tracks
                      </h4>
                      <ul className="space-y-2">
                        {randomPlaylist.tracks.map((track: string, index: number) => (
                          <li key={index} className="text-sm text-gray-700">{track}</li>
                        ))}
                      </ul>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Open in Spotify
                    </Button>
                  </div>
                </div>
              )}

              {/* Quote and Coupon */}
              <div className="space-y-8">
                {randomQuote && (
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-6 flex items-center">
                      <Quote className="h-8 w-8 text-white mr-3" />
                      <h2 className="text-2xl font-bold text-white">Your Motivation Quote</h2>
                    </div>
                    <div className="p-6">
                      <blockquote className="italic text-xl text-gray-700 border-l-4 border-amber-500 pl-4 py-2">
                        "{randomQuote}"
                      </blockquote>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-nescafe-red to-nescafe-brown p-6">
                    <h2 className="text-2xl font-bold text-white">Your Special Offer</h2>
                  </div>
                  <div className="p-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-4">
                      <p className="text-sm text-gray-600 mb-1">Use this coupon code</p>
                      <p className="text-3xl font-bold mb-1">{persona.coupon}</p>
                      <p className="text-sm text-gray-600">for 20% off your next purchase</p>
                    </div>
                    <Button 
                      className="w-full bg-nescafe-red hover:bg-nescafe-brown text-white"
                      onClick={handleCopyCoupon}
                    >
                      Copy Code
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Results */}
            <div className="text-center">
              <p className="text-lg mb-4">Share your results with friends!</p>
              <Button 
                variant="outline" 
                className="border-nescafe-red text-nescafe-red hover:bg-nescafe-red hover:text-white"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Results
              </Button>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-10">
              <Link to="/">
                <Button variant="ghost" className="text-nescafe-brown hover:text-nescafe-red">
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuizResults;
