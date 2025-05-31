import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";
import { 
  coffeeFacts, 
  miniGames,
  moodCoffeeMatches,
  achievementBadges
} from "@/utils/personaData";

// Components
import ProfileTab from '@/components/quiz-results/ProfileTab';
import DailyActivitiesTab from '@/components/quiz-results/DailyActivitiesTab';
import AchievementsTab from '@/components/quiz-results/AchievementsTab';
import ResultsTabs from '@/components/quiz-results/ResultsTabs';
import ShareResults from '@/components/quiz-results/ShareResults';
import CoffeeAssistant from '@/components/CoffeeAssistant';

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
  const [dailyFact, setDailyFact] = useState<string>("");
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [avatarCustomization, setAvatarCustomization] = useState({
    personalityStyle: "☕",
    background: "cream",
    accessories: "none",
    frameStyle: "rounded",
    avatarSize: "medium",
    rotation: "0",
    animationStyle: "none"
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

  const handleAvatarSave = () => {
    // Do not scroll or move viewport when saving avatar
    // Avatar save logic - could update user preferences, etc.
    console.log('Avatar saved with customization:', avatarCustomization);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-nescafe-cream">
          <div className="section-container">
            {/* Tabs Navigation */}
            <ResultsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <ProfileTab 
                persona={persona} 
                personaName={personaName}
                currentStreak={currentStreak}
                earnedBadges={earnedBadges}
                avatarCustomization={avatarCustomization}
                setAvatarCustomization={setAvatarCustomization}
                onAvatarSave={handleAvatarSave}
              />
            )}

            {/* Daily Activities Tab */}
            {activeTab === 'daily' && (
              <DailyActivitiesTab 
                currentStreak={currentStreak}
                dailyFact={dailyFact}
                todayMood={todayMood}
                moodRecipe={moodRecipe}
                todayGame={todayGame}
                handleUpdateMood={handleUpdateMood}
                handlePlayGame={handlePlayGame}
                moodCoffeeMatches={moodCoffeeMatches}
                setCurrentStreak={setCurrentStreak}
                setEarnedBadges={setEarnedBadges}
                earnedBadges={earnedBadges}
              />
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <AchievementsTab 
                persona={persona}
                personaName={personaName}
                currentStreak={currentStreak}
                earnedBadges={earnedBadges}
                avatarCustomization={avatarCustomization}
                setAvatarCustomization={setAvatarCustomization}
                achievementBadges={achievementBadges}
              />
            )}

            {/* Share Results Button */}
            <ShareResults handleShare={handleShare} />
          </div>
        </section>
      </main>
      <Footer />
      
      {/* AI Coffee Assistant */}
      <CoffeeAssistant />
    </div>
  );
};

export default QuizResults;
