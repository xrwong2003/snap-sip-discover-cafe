import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
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
import CoffeeAssistant from '@/components/CoffeeAssistant';
import WelcomePage from '@/components/WelcomePage';
import HowItWorksSection from '@/components/HowItWorksSection';
import CoffeePersonasSection from '@/components/CoffeePersonasSection';
import ProductsSection from '@/components/ProductsSection';

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
  }
};

const Index = () => {
  const { toast } = useToast();
  const [showWelcome, setShowWelcome] = useState(true);
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

  const personaName = "The Hustler";
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

    // Handle hash navigation from header - check for hash and scroll to section
    const hash = window.location.hash.substring(1);
    if (hash && !showWelcome) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [personaName, todayMood, showWelcome]);

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

  const handleGetStarted = () => {
    setShowWelcome(false);
    // Show the top of the page immediately - no scrolling animation
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAvatarSave = () => {
    // Explicitly prevent any scrolling behavior when saving avatar
    // Keep viewport completely static
    console.log('Avatar saved with customization:', avatarCustomization);
    // No scrolling, no viewport changes, no DOM manipulation that could trigger scroll
  };

  if (showWelcome) {
    return (
      <div>
        <Navbar />
        <WelcomePage onGetStarted={handleGetStarted} />
        <HowItWorksSection />
        <CoffeePersonasSection />
        <ProductsSection />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-nescafe-cream">
          <div className="section-container">
            {/* Tabs Navigation */}
            <ResultsTabs activeTab={activeTab} setActiveTab={handleTabChange} />

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
          </div>
        </section>
      </main>
      <Footer />
      
      {/* AI Coffee Assistant */}
      <CoffeeAssistant />
    </div>
  );
};

export default Index;
