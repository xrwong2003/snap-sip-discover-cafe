
import React from 'react';
import { Button } from "@/components/ui/button";

interface DailyActivitiesTabProps {
  currentStreak: number;
  dailyFact: string;
  todayMood: string;
  moodRecipe: any;
  todayGame: any;
  handleUpdateMood: (mood: string) => void;
  handlePlayGame: () => void;
  moodCoffeeMatches: Record<string, any>;
}

const DailyActivitiesTab = ({ 
  currentStreak, 
  dailyFact, 
  todayMood, 
  moodRecipe, 
  todayGame,
  handleUpdateMood,
  handlePlayGame,
  moodCoffeeMatches
}: DailyActivitiesTabProps) => {
  return (
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
  );
};

export default DailyActivitiesTab;
