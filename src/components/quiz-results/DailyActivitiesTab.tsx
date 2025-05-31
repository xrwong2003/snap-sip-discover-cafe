import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Calendar, TrendingUp, Star, Trophy, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DailyActivitiesTabProps {
  currentStreak: number;
  dailyFact: string;
  todayMood: string;
  moodRecipe: any;
  todayGame: any;
  handleUpdateMood: (mood: string) => void;
  handlePlayGame: () => void;
  moodCoffeeMatches: any;
  setCurrentStreak: (streak: number) => void;
  setEarnedBadges: (badges: string[]) => void;
  earnedBadges: string[];
}

const DailyActivitiesTab = ({ 
  currentStreak, 
  dailyFact, 
  todayMood, 
  moodRecipe, 
  todayGame, 
  handleUpdateMood, 
  handlePlayGame, 
  moodCoffeeMatches,
  setCurrentStreak,
  setEarnedBadges,
  earnedBadges
}: DailyActivitiesTabProps) => {
  const { toast } = useToast();
  const [brewedDays, setBrewedDays] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const [hasBrewedToday, setHasBrewedToday] = useState(false);

  // Get current day of week (0 = Sunday, 1 = Monday, etc.)
  const getCurrentDayIndex = () => {
    const today = new Date();
    return today.getDay();
  };

  const getDayName = (index: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[index];
  };

  useEffect(() => {
    // Load saved brew data from localStorage
    const savedBrewData = localStorage.getItem('brewedDays');
    const savedTodayBrew = localStorage.getItem('hasBrewedToday');
    const today = new Date().toDateString();
    const lastBrewDate = localStorage.getItem('lastBrewDate');

    if (savedBrewData) {
      setBrewedDays(JSON.parse(savedBrewData));
    }

    // Check if user has brewed today
    if (lastBrewDate === today) {
      setHasBrewedToday(true);
    } else {
      setHasBrewedToday(false);
    }
  }, []);

  const calculateConsecutiveStreak = (brewArray: boolean[]) => {
    const currentDayIndex = getCurrentDayIndex();
    let streak = 0;
    
    // Count backwards from today
    for (let i = 0; i <= 6; i++) {
      const dayIndex = (currentDayIndex - i + 7) % 7;
      if (brewArray[dayIndex]) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const handleBrewToday = () => {
    if (hasBrewedToday) {
      toast({
        title: "Already Brewed Today!",
        description: "You've already completed your daily brew. Come back tomorrow!",
      });
      return;
    }

    const currentDayIndex = getCurrentDayIndex();
    const newBrewedDays = [...brewedDays];
    newBrewedDays[currentDayIndex] = true;
    
    setBrewedDays(newBrewedDays);
    setHasBrewedToday(true);
    
    // Calculate new streak
    const newStreak = calculateConsecutiveStreak(newBrewedDays);
    setCurrentStreak(newStreak);
    
    // Save to localStorage
    localStorage.setItem('brewedDays', JSON.stringify(newBrewedDays));
    localStorage.setItem('hasBrewedToday', 'true');
    localStorage.setItem('lastBrewDate', new Date().toDateString());
    localStorage.setItem('coffeeStreak', newStreak.toString());
    
    // Award badges based on streak
    if (newStreak >= 3 && !earnedBadges.includes("streak-3")) {
      const updatedBadges = [...earnedBadges, "streak-3"];
      setEarnedBadges(updatedBadges);
      toast({
        title: "New Badge Earned!",
        description: "Coffee Enthusiast: 3-day streak achieved!",
      });
    } else if (newStreak >= 7 && !earnedBadges.includes("streak-7")) {
      const updatedBadges = [...earnedBadges, "streak-7"];
      setEarnedBadges(updatedBadges);
      toast({
        title: "New Badge Earned!",
        description: "Week Warrior: 7-day streak achieved!",
      });
    }
    
    const points = Math.floor(Math.random() * 20) + 10;
    toast({
      title: "Brew Complete! ☕",
      description: `You've earned ${points} Aroma Points and maintained your streak!`,
    });
  };

  const brewedCount = brewedDays.filter(day => day).length;
  const consecutiveStreak = calculateConsecutiveStreak(brewedDays);

  return (
    <div className="space-y-6">
      {/* Daily Brew Streak */}
      <Card className="border-nescafe-red/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-nescafe-brown">
            <Coffee className="w-5 h-5" />
            Daily Brew Streak
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-nescafe-red">{brewedCount}</p>
              <p className="text-sm text-gray-600">Brewed Days</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-nescafe-red">{consecutiveStreak}</p>
              <p className="text-sm text-gray-600">Consecutive Streak</p>
            </div>
          </div>
          
          {/* Week Calendar */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {brewedDays.map((brewed, index) => {
              const isToday = index === getCurrentDayIndex();
              return (
                <div key={index} className="text-center">
                  <p className="text-xs text-gray-600 mb-1">{getDayName(index)}</p>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    brewed 
                      ? 'bg-orange-500 text-white' 
                      : isToday 
                        ? 'bg-gray-200 border-2 border-nescafe-red text-nescafe-red'
                        : 'bg-gray-200 text-gray-400'
                  }`}>
                    {brewed ? '☕' : index + 1}
                  </div>
                  {isToday && <p className="text-xs text-nescafe-red mt-1">Today</p>}
                </div>
              );
            })}
          </div>
          
          <Button 
            onClick={handleBrewToday}
            disabled={hasBrewedToday}
            className={`w-full ${hasBrewedToday ? 'bg-gray-300' : 'bg-nescafe-red hover:bg-nescafe-brown'}`}
          >
            {hasBrewedToday ? '✅ Brewed Today' : 'Brew Today'}
          </Button>
        </CardContent>
      </Card>

      {/* Daily Coffee Fact */}
      <Card className="border-nescafe-red/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-nescafe-brown">
            <Calendar className="w-5 h-5" />
            Daily Coffee Fact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">{dailyFact}</p>
        </CardContent>
      </Card>

      {/* Today's Mood */}
      <Card className="border-nescafe-red/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-nescafe-brown">
            <TrendingUp className="w-5 h-5" />
            Today's Mood
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-nescafe-brown">
              How are you feeling today?
            </p>
            <Badge className="bg-nescafe-cream text-nescafe-brown">{todayMood}</Badge>
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {Object.keys(moodCoffeeMatches).map((mood) => (
              <Button
                key={mood}
                variant="outline"
                className={`rounded-full text-sm ${todayMood === mood ? 'bg-nescafe-red text-white' : 'text-nescafe-brown'}`}
                onClick={() => handleUpdateMood(mood)}
              >
                {mood}
              </Button>
            ))}
          </div>
          {moodRecipe && (
            <div className="mt-4 p-3 rounded-md bg-nescafe-cream">
              <p className="text-sm font-semibold text-nescafe-brown">
                Try this: <span className="font-bold">{moodRecipe.name}</span>
              </p>
              <p className="text-xs text-gray-600">{moodRecipe.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Today's Mini-Game */}
      <Card className="border-nescafe-red/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-nescafe-brown">
            <Gamepad2 className="w-5 h-5" />
            Today's Mini-Game
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-semibold text-nescafe-brown">
            {todayGame.name}
          </p>
          <p className="text-sm text-gray-700">
            {todayGame.description}
          </p>
          <div className="flex items-center justify-between">
            <Badge className="bg-nescafe-cream text-nescafe-brown">
              Reward: {todayGame.rewardPoints} Aroma Points
            </Badge>
            <Button onClick={handlePlayGame} className="bg-nescafe-red hover:bg-nescafe-brown text-white">
              Play Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyActivitiesTab;
