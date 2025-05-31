import React, { useState, useEffect } from 'react';
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

// Quiz Questions Data
const moodQuizQuestions = [
  {
    question: "How are you feeling about today?",
    options: ["Energetic and ready to go", "Calm and relaxed", "Creative and inspiring", "Social and engaging"]
  },
  {
    question: "What's your ideal coffee break?",
    options: ["Quick energy boost", "Peaceful moment alone", "Brainstorming session", "Chatting with friends"]
  },
  {
    question: "How do you like to start your morning?",
    options: ["Fast-paced and efficient", "Slow and mindful", "With new ideas flowing", "Connecting with others"]
  }
];

const factQuizQuestions = [
  {
    question: "Which country is the largest producer of coffee in the world?",
    options: ["Colombia", "Brazil", "Vietnam", "Ethiopia"],
    correct: 1,
    explanation: "Brazil produces about 40% of the world's coffee supply!"
  },
  {
    question: "What does 'espresso' mean in Italian?",
    options: ["Strong coffee", "Quick coffee", "Pressed out", "Morning drink"],
    correct: 2,
    explanation: "'Espresso' means 'pressed out' - referring to the brewing method!"
  },
  {
    question: "How many coffee beans does it take to make one cup of coffee?",
    options: ["25-30 beans", "50-60 beans", "70-80 beans", "100-120 beans"],
    correct: 2,
    explanation: "It takes approximately 70-80 coffee beans to make one cup!"
  },
  {
    question: "Which type of coffee bean is most commonly used worldwide?",
    options: ["Arabica", "Robusta", "Liberica", "Excelsa"],
    correct: 0,
    explanation: "Arabica beans make up about 60-70% of global coffee production!"
  },
  {
    question: "What temperature should water be for optimal coffee brewing?",
    options: ["180-185°F", "190-196°F", "200-205°F", "210-212°F"],
    correct: 1,
    explanation: "The ideal water temperature is 190-196°F for optimal extraction!"
  }
];

const playableGames = [
  {
    id: 'bean-hunt',
    name: 'Bean Hunt',
    description: 'Find hidden coffee beans in the plantation!',
    difficulty: 'Easy',
    time: '2 min',
    points: 30,
    icon: '🫘',
    color: 'bg-amber-500'
  },
  {
    id: 'pod-match',
    name: 'Pod Match',
    description: 'Match coffee pods to create perfect combinations!',
    difficulty: 'Medium',
    time: '3 min',
    points: 50,
    icon: '☕',
    color: 'bg-orange-500'
  },
  {
    id: 'brew-master',
    name: 'Brew Master',
    description: 'Test your coffee brewing skills and timing!',
    difficulty: 'Hard',
    time: '5 min',
    points: 80,
    icon: '⚡',
    color: 'bg-red-500'
  }
];

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
  
  // Daily Brew Streak State - Updated Logic
  const [weeklyStreak, setWeeklyStreak] = useState([true, true, false, true, true, false, false]); 
  const [hasBrewedToday, setHasBrewedToday] = useState(false);
  
  // Coffee Mood Quiz State
  const [moodQuizStep, setMoodQuizStep] = useState(0);
  const [moodQuizAnswers, setMoodQuizAnswers] = useState<string[]>([]);
  const [moodQuizCompleted, setMoodQuizCompleted] = useState(false);
  const [moodQuizLocked, setMoodQuizLocked] = useState(false);
  const [detectedMood, setDetectedMood] = useState("");
  const [recommendedRecipe, setRecommendedRecipe] = useState<any>(null);
  
  // Daily Coffee Fact Quiz State
  const [factQuizStep, setFactQuizStep] = useState(0);
  const [factQuizAnswers, setFactQuizAnswers] = useState<number[]>([]);
  const [factQuizCompleted, setFactQuizCompleted] = useState(false);
  const [factQuizLocked, setFactQuizLocked] = useState(false);
  const [factQuizScore, setFactQuizScore] = useState(0);
  
  // Game states
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Get current day of week (0 = Sunday, 6 = Saturday)
  const currentDayIndex = new Date().getDay();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate total brewed days this week (count orange circles)
  const getBrewedDaysCount = () => {
    let count = 0;
    // Count existing brewed days in the week
    weeklyStreak.forEach(day => {
      if (day) count++;
    });
    // Add today if brewed
    if (hasBrewedToday) count++;
    return count;
  };

  // Check daily locks on component mount
  useEffect(() => {
    const today = new Date().toDateString();
    const moodQuizDate = localStorage.getItem('moodQuizDate');
    const factQuizDate = localStorage.getItem('factQuizDate');
    const lastBrewDate = localStorage.getItem('lastBrewDate');
    
    if (moodQuizDate === today) {
      setMoodQuizLocked(true);
      setMoodQuizCompleted(true);
    }
    
    if (factQuizDate === today) {
      setFactQuizLocked(true);
      setFactQuizCompleted(true);
    }

    if (lastBrewDate === today) {
      setHasBrewedToday(true);
    }
  }, []);

  // Daily Brew Streak Functions
  const handleBrewToday = () => {
    const today = new Date().toDateString();
    
    setHasBrewedToday(true);
    localStorage.setItem('lastBrewDate', today);
    
    toast({
      title: "☑ Brewed Today!",
      description: "+50 Aroma Points • Keep your streak alive!",
    });
  };

  // Mood Quiz Functions
  const handleMoodQuizAnswer = (answer: string) => {
    const newAnswers = [...moodQuizAnswers, answer];
    setMoodQuizAnswers(newAnswers);
    
    if (moodQuizStep < moodQuizQuestions.length - 1) {
      setMoodQuizStep(moodQuizStep + 1);
    } else {
      analyzeMoodResults(newAnswers);
    }
  };

  const analyzeMoodResults = (answers: string[]) => {
    // Simple mood analysis based on answers
    const moodMap = {
      "relaxed": { emoji: "😌", mood: "Feeling Relaxed", recipe: "NESCAFÉ Smooth Latte" },
      "focused": { emoji: "🧠", mood: "Feeling Focused", recipe: "NESCAFÉ Gold Americano" },
      "energetic": { emoji: "⚡", mood: "Feeling Energetic", recipe: "NESCAFÉ 3in1 Original" },
      "creative": { emoji: "🎨", mood: "Feeling Creative", recipe: "NESCAFÉ Caramel Macchiato" },
      "social": { emoji: "😊", mood: "Feeling Social", recipe: "NESCAFÉ Iced Coffee" }
    };
    
    let dominantMood = "relaxed";
    if (answers.some(a => a.includes("energetic") || a.includes("focused"))) dominantMood = "focused";
    if (answers.some(a => a.includes("creative") || a.includes("inspiring"))) dominantMood = "creative";
    if (answers.some(a => a.includes("social") || a.includes("engaging"))) dominantMood = "social";
    
    const result = moodMap[dominantMood as keyof typeof moodMap];
    setDetectedMood(result.mood);
    setRecommendedRecipe({
      name: result.recipe,
      description: "A perfect match for your current mood and energy level.",
      emoji: result.emoji
    });
    
    setMoodQuizCompleted(true);
    
    const today = new Date().toDateString();
    localStorage.setItem('moodQuizDate', today);
    setMoodQuizLocked(true);
    
    toast({
      title: "Coffee Mood Quiz Complete!",
      description: "Perfect match found! +25 Aroma Points earned.",
    });
  };

  const resetMoodQuiz = () => {
    setMoodQuizStep(0);
    setMoodQuizAnswers([]);
    setMoodQuizCompleted(false);
  };

  // Fact Quiz Functions
  const handleFactQuizAnswer = (answerIndex: number) => {
    const currentQuestion = factQuizQuestions[factQuizStep];
    const isCorrect = answerIndex === currentQuestion.correct;
    
    const newAnswers = [...factQuizAnswers, answerIndex];
    setFactQuizAnswers(newAnswers);
    
    if (isCorrect) {
      setFactQuizScore(factQuizScore + 1);
    }
    
    toast({
      title: isCorrect ? "Correct! +10 Aroma Points" : "Incorrect",
      description: currentQuestion.explanation,
      duration: 3000,
    });
    
    if (factQuizStep < factQuizQuestions.length - 1) {
      setTimeout(() => {
        setFactQuizStep(factQuizStep + 1);
      }, 3000);
    } else {
      setTimeout(() => {
        setFactQuizCompleted(true);
        
        const today = new Date().toDateString();
        localStorage.setItem('factQuizDate', today);
        setFactQuizLocked(true);
        
        toast({
          title: "✔️ Quiz Completed!",
          description: `You got ${factQuizScore + (isCorrect ? 1 : 0)}/5 correct! Come back tomorrow for a new quiz.`,
          duration: 5000,
        });
      }, 3000);
    }
  };

  const resetFactQuiz = () => {
    setFactQuizStep(0);
    setFactQuizAnswers([]);
    setFactQuizCompleted(false);
    setFactQuizScore(0);
  };

  // Game Functions
  const handleStartGame = (gameId: string) => {
    setActiveGame(gameId);
  };

  const handleGameEnd = (points: number) => {
    console.log(`Game ended, earned ${points} points`);
  };

  const handleCloseGame = () => {
    setActiveGame(null);
  };

  const handleTryRecipe = () => {
    toast({
      title: "Recipe Tried!",
      description: "+25 Aroma Points earned! Great choice for your mood.",
    });
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

      {/* Updated Daily Brew Streak */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-6">
          <h2 className="text-2xl font-bold text-white">Daily Brew Streak</h2>
        </div>
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              {daysOfWeek.map((day, index) => {
                const isToday = index === currentDayIndex;
                const isBrewedDay = weeklyStreak[index];
                return (
                  <div key={day} className="text-center">
                    <div className="text-xs text-gray-600 mb-1">{day}</div>
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                      isToday && hasBrewedToday
                        ? 'bg-orange-600 border-orange-600 text-white shadow-lg'
                        : isBrewedDay 
                          ? 'bg-orange-400 border-orange-400 text-white'
                          : 'bg-gray-200 border-gray-300 text-gray-400'
                    }`}>
                      {isBrewedDay || (isToday && hasBrewedToday) ? '☕' : '○'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {getBrewedDaysCount()} {getBrewedDaysCount() === 1 ? 'day' : 'days'}
            </div>
            
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
          {moodQuizLocked && moodQuizCompleted ? (
            <div className="text-center">
              <div className="mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="text-4xl">{recommendedRecipe?.emoji || '😌'}</div>
                  <div>
                    <h3 className="text-xl font-bold">{detectedMood}</h3>
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
                    <h4 className="font-bold text-lg mb-1">{recommendedRecipe?.name}</h4>
                    <p className="text-gray-600 mb-3">{recommendedRecipe?.description}</p>
                    <div className="flex gap-2">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Perfect Match</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Mood-Based</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleTryRecipe}
                >
                  Try This Recipe (+25 Points)
                </Button>
              </div>
              
              <p className="text-sm text-gray-500">Come back tomorrow for a new mood quiz!</p>
            </div>
          ) : moodQuizCompleted ? (
            <div className="text-center">
              <div className="mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="text-4xl">{recommendedRecipe?.emoji || '😌'}</div>
                  <div>
                    <h3 className="text-xl font-bold">{detectedMood}</h3>
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
                    <h4 className="font-bold text-lg mb-1">{recommendedRecipe?.name}</h4>
                    <p className="text-gray-600 mb-3">{recommendedRecipe?.description}</p>
                    <div className="flex gap-2">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Perfect Match</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Mood-Based</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleTryRecipe}
                >
                  Try This Recipe (+25 Points)
                </Button>
              </div>
              
              <Button 
                variant="outline"
                onClick={resetMoodQuiz}
                className="w-full"
              >
                Retake Quiz
              </Button>
            </div>
          ) : moodQuizStep < moodQuizQuestions.length ? (
            <div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Question {moodQuizStep + 1} of {moodQuizQuestions.length}</div>
                <h3 className="text-lg font-semibold mb-4">{moodQuizQuestions[moodQuizStep].question}</h3>
                <div className="space-y-2">
                  {moodQuizQuestions[moodQuizStep].options.map((option, index) => (
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
                onClick={() => setMoodQuizStep(0)}
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
          {factQuizLocked && factQuizCompleted ? (
            <div className="text-center">
              <div className="text-6xl mb-4">✔️</div>
              <h3 className="text-xl font-bold mb-4">Quiz Completed!</h3>
              <p className="text-gray-600 mb-4">Come back tomorrow for a new coffee trivia quiz!</p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 font-semibold">Today's Score: {factQuizScore}/5 correct</p>
                <p className="text-blue-600">Total Earned: +{factQuizScore * 10} Aroma Points</p>
              </div>
            </div>
          ) : factQuizCompleted ? (
            <div className="text-center">
              <div className="text-6xl mb-4">✔️</div>
              <h3 className="text-xl font-bold mb-4">Quiz Completed!</h3>
              <p className="text-gray-600 mb-4">You got {factQuizScore}/5 correct!</p>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-blue-800 font-semibold">Total Earned: +{factQuizScore * 10} Aroma Points</p>
              </div>
              <Button 
                variant="outline"
                onClick={resetFactQuiz}
                className="w-full"
              >
                Retake Quiz
              </Button>
            </div>
          ) : factQuizStep < factQuizQuestions.length ? (
            <div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Question {factQuizStep + 1} of {factQuizQuestions.length}</div>
                <h3 className="text-lg font-semibold mb-4">{factQuizQuestions[factQuizStep].question}</h3>
                <div className="space-y-2">
                  {factQuizQuestions[factQuizStep].options.map((option, index) => (
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
                onClick={() => setFactQuizStep(0)}
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
