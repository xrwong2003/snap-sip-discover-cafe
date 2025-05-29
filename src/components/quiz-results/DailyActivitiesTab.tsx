import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BeanHuntGame from '@/components/games/BeanHuntGame';
import PodMatchGame from '@/components/games/PodMatchGame';
import BrewMasterGame from '@/components/games/BrewMasterGame';

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
  const { toast } = useToast();
  const [weeklyStreak, setWeeklyStreak] = useState([true, true, false, true, true, false, false]); // Sun-Sat
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [moodQuizAnswers, setMoodQuizAnswers] = useState<string[]>([]);
  const [factQuizAnswers, setFactQuizAnswers] = useState<string[]>([]);
  const [hasBrewedToday, setHasBrewedToday] = useState(false);
  const [currentMoodQuizResult, setCurrentMoodQuizResult] = useState<string>("");
  
  // Game states
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const moodQuizQuestions = [
    { question: "How are you feeling today?", options: ["Energetic", "Relaxed", "Focused", "Creative", "Social"] },
    { question: "What's your energy level?", options: ["Very Low", "Low", "Medium", "High", "Very High"] },
    { question: "How social are you feeling?", options: ["Want to be alone", "Small group", "Party ready", "Online hangout", "Big gathering"] },
    { question: "What's your pace today?", options: ["Slow morning", "Steady rhythm", "Fast-paced", "Rush mode", "Chill vibes"] },
    { question: "What flavor profile appeals to you?", options: ["Rich & bold", "Smooth & creamy", "Sweet & indulgent", "Fresh & light", "Exotic & adventurous"] }
  ];

  const factQuizQuestions = [
    { 
      question: "Which country produces the most coffee?", 
      options: ["Colombia", "Brazil", "Ethiopia", "Vietnam"], 
      correct: 1,
      explanation: "Brazil is the world's largest coffee producer, accounting for about 40% of global coffee production."
    },
    { 
      question: "What does 'espresso' mean in Italian?", 
      options: ["Strong", "Fast", "Pressed out", "Dark"], 
      correct: 2,
      explanation: "Espresso means 'pressed out' in Italian, referring to how the coffee is made by forcing hot water through finely ground coffee."
    },
    { 
      question: "How many coffee beans are typically in one coffee cherry?", 
      options: ["1", "2", "3", "4"], 
      correct: 1,
      explanation: "A coffee cherry typically contains two coffee beans, though sometimes there's only one (called a peaberry)."
    },
    { 
      question: "When was instant coffee invented?", 
      options: ["1901", "1910", "1920", "1930"], 
      correct: 0,
      explanation: "Instant coffee was invented in 1901 by Japanese scientist Satori Kato."
    },
    { 
      question: "Which coffee brewing method extracts the most caffeine?", 
      options: ["Espresso", "French Press", "Drip Coffee", "Cold Brew"], 
      correct: 3,
      explanation: "Cold brew typically extracts the most caffeine due to the long steeping time, despite using cold water."
    }
  ];

  const handleBrewToday = () => {
    setHasBrewedToday(true);
    toast({
      title: "Brewed Today! ☕",
      description: "+50 Aroma Points • Keep your streak alive!",
    });
  };

  const handleMoodQuizAnswer = (answer: string) => {
    const newAnswers = [...moodQuizAnswers, answer];
    setMoodQuizAnswers(newAnswers);
    
    if (currentQuizQuestion < moodQuizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      // Quiz completed - analyze mood
      setCurrentMoodQuizResult("Feeling Relaxed");
      toast({
        title: "Coffee Mood Quiz Complete!",
        description: "Perfect match found! +25 Aroma Points earned.",
      });
      setCurrentQuizQuestion(0);
      setMoodQuizAnswers([]);
    }
  };

  const handleFactQuizAnswer = (answerIndex: number) => {
    const currentQuestion = factQuizQuestions[factQuizAnswers.length];
    const isCorrect = answerIndex === currentQuestion.correct;
    
    const newAnswers = [...factQuizAnswers, answerIndex.toString()];
    setFactQuizAnswers(newAnswers);
    
    // Show explanation
    toast({
      title: isCorrect ? "Correct! +10 Aroma Points" : "Incorrect",
      description: currentQuestion.explanation,
      duration: 4000,
    });
    
    if (newAnswers.length < factQuizQuestions.length) {
      setTimeout(() => {
        setCurrentQuizQuestion((prev) => (prev + 1) % factQuizQuestions.length);
      }, 2000);
    } else {
      // Quiz completed
      const correctAnswers = newAnswers.filter((answer, index) => 
        parseInt(answer) === factQuizQuestions[index].correct
      ).length;
      
      setTimeout(() => {
        toast({
          title: "Quiz Completed!",
          description: `You got ${correctAnswers}/5 correct! Come back tomorrow for a new quiz. Total earned: +${correctAnswers * 10} Aroma Points.`,
          duration: 5000,
        });
        setFactQuizAnswers([]);
        setCurrentQuizQuestion(0);
      }, 2000);
    }
  };

  const playableGames = [
    { 
      id: 'bean-hunt',
      name: "Bean Hunt", 
      difficulty: "Easy", 
      time: "2 min", 
      points: 15, 
      description: "Catch falling coffee beans to earn points!",
      icon: "☕",
      color: "bg-orange-500"
    },
    { 
      id: 'pod-match',
      name: "Pod Match", 
      difficulty: "Medium", 
      time: "3 min", 
      points: 20, 
      description: "Match coffee pod pairs",
      icon: "🍀",
      color: "bg-green-500"
    },
    { 
      id: 'brew-master',
      name: "Brew Master", 
      difficulty: "Hard", 
      time: "5 min", 
      points: 30, 
      description: "Perfect the brewing process",
      icon: "🔥",
      color: "bg-blue-500"
    }
  ];

  const handleStartGame = (gameId: string) => {
    setActiveGame(gameId);
  };

  const handleGameEnd = (points: number) => {
    // Handle points earned from game
    console.log(`Game ended, earned ${points} points`);
  };

  const handleCloseGame = () => {
    setActiveGame(null);
  };

  return (
    <div className="space-y-8">
      {/* Game Components */}
      {activeGame === 'bean-hunt' && (
        <BeanHuntGame onGameEnd={handleGameEnd} onClose={handleCloseGame} />
      )}
      {activeGame === 'pod-match' && (
        <PodMatchGame onGameEnd={handleGameEnd} onClose={handleCloseGame} />
      )}
      {activeGame === 'brew-master' && (
        <BrewMasterGame onGameEnd={handleGameEnd} onClose={handleCloseGame} />
      )}

      {/* Daily Brew Streak */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-6">
          <h2 className="text-2xl font-bold text-white">Daily Brew Streak</h2>
        </div>
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              {daysOfWeek.map((day, index) => {
                const isToday = index === 4; // Thursday as example
                return (
                  <div key={day} className="text-center">
                    <div className="text-xs text-gray-600 mb-1">{day}</div>
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                      weeklyStreak[index] 
                        ? isToday 
                          ? 'bg-orange-500 border-orange-500 text-white shadow-lg' 
                          : 'bg-amber-500 border-amber-500 text-white'
                        : 'bg-gray-100 border-gray-300'
                    }`}>
                      {weeklyStreak[index] ? '☕' : '○'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">{currentStreak} days</div>
            
            {hasBrewedToday ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="text-green-600 font-semibold mb-2">✅ Brewed Today</div>
                <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full inline-block">
                  ⭐ +50 Aroma Points • Keep your streak alive!
                </div>
                <p className="text-green-600 mt-2 text-sm">Come back tomorrow to continue your brewing journey!</p>
              </div>
            ) : (
              <>
                <p className="mb-4">Keep your streak alive!</p>
                <Button 
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg"
                  onClick={handleBrewToday}
                >
                  Brew Today
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Coffee Mood Quiz */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6">
          <h2 className="text-2xl font-bold text-white">Coffee Mood Quiz</h2>
          <p className="text-purple-100">Personalized Match</p>
        </div>
        <div className="p-6">
          {currentMoodQuizResult ? (
            <div className="text-center">
              <div className="mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="text-4xl">😌</div>
                  <div>
                    <h3 className="text-xl font-bold">Feeling Relaxed</h3>
                    <p className="text-gray-600">Perfect match found</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl">
                    ☕
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-lg mb-1">NESCAFÉ Smooth Latte</h4>
                    <p className="text-gray-600 mb-3">A creamy, soothing latte that complements your calm state while providing gentle warmth.</p>
                    <div className="flex gap-2">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Smooth</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Comforting</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Balanced</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                  Try This Recipe (+25 Points)
                </Button>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => {setCurrentMoodQuizResult(""); setMoodQuizAnswers([]); setCurrentQuizQuestion(0);}}
                className="w-full"
              >
                Retake Quiz
              </Button>
            </div>
          ) : moodQuizAnswers.length < moodQuizQuestions.length ? (
            <div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Question {currentQuizQuestion + 1} of {moodQuizQuestions.length}</div>
                <h3 className="text-lg font-semibold mb-4">{moodQuizQuestions[currentQuizQuestion].question}</h3>
                <div className="space-y-2">
                  {moodQuizQuestions[currentQuizQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleMoodQuizAnswer(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">Take today's mood quiz to get your personalized coffee recommendation!</p>
              <Button 
                className="bg-purple-500 hover:bg-purple-600 text-white"
                onClick={() => {setCurrentQuizQuestion(0); setMoodQuizAnswers([]);}}
              >
                Start Mood Quiz
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Daily Coffee Fact Quiz */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6">
          <h2 className="text-2xl font-bold text-white">Daily Coffee Fact Quiz</h2>
        </div>
        <div className="p-6">
          {factQuizAnswers.length < factQuizQuestions.length ? (
            <div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Question {factQuizAnswers.length + 1} of {factQuizQuestions.length}</div>
                <h3 className="text-lg font-semibold mb-4">{factQuizQuestions[factQuizAnswers.length].question}</h3>
                <div className="space-y-2">
                  {factQuizQuestions[factQuizAnswers.length].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleFactQuizAnswer(index)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">Test your coffee knowledge with today's quiz!</p>
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => {setCurrentQuizQuestion(0); setFactQuizAnswers([]);}}
              >
                Start Knowledge Quiz
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Today's Mini Games */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-700 p-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🏆 Daily Mini-Games
          </h2>
          <p className="text-green-100">Play games to earn aroma points!</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {playableGames.map((game, index) => (
              <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${game.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                    {game.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{game.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        game.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                        game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {game.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{game.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        🕐 {game.time}
                      </span>
                      <span className="flex items-center gap-1 text-orange-600 font-semibold">
                        🏆 +{game.points} Points
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  className={`${game.color} hover:opacity-90 text-white px-6`}
                  onClick={() => handleStartGame(game.id)}
                >
                  ▶ Play Now
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Complete daily games to boost your leaderboard ranking!
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyActivitiesTab;
