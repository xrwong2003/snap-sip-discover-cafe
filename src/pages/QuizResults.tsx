
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Headphones, Music, Share2, Award, MessageSquare, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";
import { 
  spotifyPlaylists, 
  motivationalQuotes, 
  coffeeFacts, 
  miniGames,
  moodCoffeeMatches,
  achievementBadges
} from "@/utils/personaData";

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
  const [dailyFact, setDailyFact] = useState<string>("");
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [avatarCustomization, setAvatarCustomization] = useState({
    hairStyle: "short",
    facialFeature: "none",
    outfit: "casual",
    accessory: "coffee cup"
  });
  const [todayMood, setTodayMood] = useState<string>("Energized");
  const [moodRecipe, setMoodRecipe] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [todayGame, setTodayGame] = useState<any>(null);
  const [earnedBadges, setEarnedBadges] = useState<string[]>(["first-brew"]);

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

    // Get daily coffee fact
    const factIndex = Math.floor(Math.random() * coffeeFacts.length);
    setDailyFact(coffeeFacts[factIndex]);

    // Get daily mini-game
    const gameIndex = Math.floor(Math.random() * miniGames.length);
    setTodayGame(miniGames[gameIndex]);

    // Get coffee suggestion based on mood
    setMoodRecipe(moodCoffeeMatches[todayMood as keyof typeof moodCoffeeMatches]);

    // Simulate a streak (would come from local storage in a real app)
    const savedStreak = localStorage.getItem('coffeeStreak');
    if (savedStreak) {
      setCurrentStreak(parseInt(savedStreak));
    }

    // Save today's visit to increase streak (simplified)
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit');
    
    if (lastVisit !== today) {
      localStorage.setItem('lastVisit', today);
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      localStorage.setItem('coffeeStreak', newStreak.toString());
      
      // Award streak badge if applicable
      if (newStreak >= 7 && !earnedBadges.includes("streak-7")) {
        const updatedBadges = [...earnedBadges, "streak-7"];
        setEarnedBadges(updatedBadges);
        toast({
          title: "New Badge Earned!",
          description: "Week Warrior: You've maintained a 7-day coffee streak!",
        });
      }
    }
  }, [personaName, todayMood]);

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

  const handleUpdateMood = (mood: string) => {
    setTodayMood(mood);
    setMoodRecipe(moodCoffeeMatches[mood as keyof typeof moodCoffeeMatches]);
    toast({
      title: "Mood Updated",
      description: `We've updated your coffee recommendation based on your ${mood} mood!`,
    });
  };

  const handlePlayGame = () => {
    toast({
      title: "Starting Game",
      description: `Get ready to play ${todayGame.name}! Earn up to ${todayGame.rewardPoints} Aroma Points.`,
    });
    // In a real implementation, this would launch the game interface
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-nescafe-cream">
          <div className="section-container">
            {/* Tabs Navigation */}
            <div className="mb-8 flex justify-center">
              <div className="bg-white rounded-full p-1 shadow-md inline-flex">
                <button 
                  className={`px-5 py-2 rounded-full transition-colors ${activeTab === 'profile' ? 'bg-nescafe-red text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  My Profile
                </button>
                <button 
                  className={`px-5 py-2 rounded-full transition-colors ${activeTab === 'daily' ? 'bg-nescafe-red text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('daily')}
                >
                  Daily Activities
                </button>
                <button 
                  className={`px-5 py-2 rounded-full transition-colors ${activeTab === 'achievements' ? 'bg-nescafe-red text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('achievements')}
                >
                  Achievements
                </button>
              </div>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <>
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

                {/* Spotify Playlist and Quote */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  {randomPlaylist && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 flex items-center">
                        <Headphones className="h-8 w-8 text-white mr-3" />
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
              </>
            )}

            {/* Daily Activities Tab */}
            {activeTab === 'daily' && (
              <div className="space-y-8">
                {/* Daily Streak */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-6">
                    <h2 className="text-2xl font-bold text-white">Daily Brew Streak</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-lg">Your Current Streak</span>
                      <span className="text-3xl font-bold text-amber-600">{currentStreak} days</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                      <div 
                        className="bg-amber-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(currentStreak * 10, 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="text-center">
                      {currentStreak < 7 ? (
                        <p>Keep your streak going! Earn a special badge at 7 days.</p>
                      ) : (
                        <p>Amazing streak! You're earning bonus Aroma Points daily.</p>
                      )}
                      <Button className="mt-4 bg-amber-500 hover:bg-amber-600 text-white">
                        Check In Today
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Daily Coffee Fact */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6">
                    <h2 className="text-2xl font-bold text-white">Daily Coffee Fact</h2>
                  </div>
                  <div className="p-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                      <p className="text-lg">{dailyFact}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>+5 Aroma Points for reading</span>
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        Share Fact
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Mood Coffee Match */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6">
                    <h2 className="text-2xl font-bold text-white">Today's Mood Coffee Match</h2>
                  </div>
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">How are you feeling today?</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.keys(moodCoffeeMatches).map(mood => (
                          <Button 
                            key={mood} 
                            variant={todayMood === mood ? "default" : "outline"}
                            className={todayMood === mood ? "bg-purple-500 hover:bg-purple-600" : ""}
                            onClick={() => handleUpdateMood(mood)}
                          >
                            {mood}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {moodRecipe && (
                      <div className="border rounded-lg p-4">
                        <h4 className="font-bold text-lg mb-2">Your {todayMood} Coffee: {moodRecipe.recipe}</h4>
                        <p className="text-sm mb-4">{moodRecipe.description}</p>
                        <div className="mb-4">
                          <h5 className="font-semibold mb-1">Ingredients:</h5>
                          <ul className="list-disc pl-5">
                            {moodRecipe.ingredients.map((ingredient: string, i: number) => (
                              <li key={i} className="text-sm">{ingredient}</li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-xs text-purple-600">Try this recipe and earn {moodRecipe.aromaPoints} Aroma Points!</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Daily Mini-Game */}
                {todayGame && (
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-green-700 p-6">
                      <h2 className="text-2xl font-bold text-white">Today's Mini-Game</h2>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <img 
                            src={todayGame.imageUrl} 
                            alt={todayGame.name} 
                            className="rounded-lg w-full h-auto object-cover"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <h3 className="text-xl font-bold mb-2">{todayGame.name}</h3>
                          <div className="flex items-center mb-2">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              {todayGame.difficulty.toUpperCase()}
                            </span>
                            <span className="ml-2 text-sm">Earn up to {todayGame.rewardPoints} Aroma Points</span>
                          </div>
                          <p className="text-gray-700 mb-4">{todayGame.description}</p>
                          <Button 
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={handlePlayGame}
                          >
                            Play Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="space-y-8">
                {/* Coffee Avatar Customization */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
                    <h2 className="text-2xl font-bold text-white">Your Coffee Avatar</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="md:w-1/3 flex justify-center">
                        <div className="relative">
                          <Avatar className="w-32 h-32 border-4 border-nescafe-red">
                            <AvatarImage src={persona.image} />
                            <AvatarFallback>{personaName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-2 -right-2 bg-nescafe-red text-white rounded-full w-10 h-10 flex items-center justify-center text-lg">
                            {persona.icon}
                          </div>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-xl font-bold mb-4">Customize Your Avatar</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Hair Style</label>
                            <select 
                              className="w-full p-2 border rounded-md"
                              value={avatarCustomization.hairStyle}
                              onChange={(e) => setAvatarCustomization({...avatarCustomization, hairStyle: e.target.value})}
                            >
                              {/* Options would come from avatarCustomizations.hairStyles */}
                              <option value="short">Short</option>
                              <option value="long">Long</option>
                              <option value="curly">Curly</option>
                              <option value="wavy">Wavy</option>
                              <option value="bald">Bald</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Outfit</label>
                            <select 
                              className="w-full p-2 border rounded-md"
                              value={avatarCustomization.outfit}
                              onChange={(e) => setAvatarCustomization({...avatarCustomization, outfit: e.target.value})}
                            >
                              <option value="casual">Casual</option>
                              <option value="business">Business</option>
                              <option value="sporty">Sporty</option>
                              <option value="creative">Creative</option>
                              <option value="relaxed">Relaxed</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Accessory</label>
                            <select 
                              className="w-full p-2 border rounded-md"
                              value={avatarCustomization.accessory}
                              onChange={(e) => setAvatarCustomization({...avatarCustomization, accessory: e.target.value})}
                            >
                              <option value="coffee cup">Coffee Cup</option>
                              <option value="laptop">Laptop</option>
                              <option value="book">Book</option>
                              <option value="headphones">Headphones</option>
                              <option value="plant">Plant</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        
                        <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                          Save Avatar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badges Collection */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6">
                    <h2 className="text-2xl font-bold text-white">Your Achievement Badges</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {achievementBadges.map(badge => {
                        const isEarned = earnedBadges.includes(badge.id);
                        
                        return (
                          <div 
                            key={badge.id} 
                            className={`border rounded-lg p-4 text-center ${isEarned ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-gray-50 opacity-60'}`}
                          >
                            <div className="text-4xl mb-2">{badge.image}</div>
                            <h3 className="font-bold">{badge.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                            <div className="text-xs font-semibold text-yellow-600">
                              {isEarned ? 'EARNED' : 'LOCKED'} • {badge.points} Points
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-700 p-6">
                    <h2 className="text-2xl font-bold text-white">Your Coffee Journey</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-teal-600">{currentStreak}</div>
                        <div className="text-sm text-gray-600">Day Streak</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-teal-600">{earnedBadges.length}</div>
                        <div className="text-sm text-gray-600">Badges Earned</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-teal-600">350</div>
                        <div className="text-sm text-gray-600">Aroma Points</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-teal-600">5</div>
                        <div className="text-sm text-gray-600">Recipes Tried</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="mb-4">Keep engaging with NESCAFÉ to grow your coffee journey!</p>
                      <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                        View Full Stats
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Share Results Button (always visible) */}
            <div className="text-center mt-8">
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
