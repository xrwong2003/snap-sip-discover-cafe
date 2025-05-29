
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  const [weeklyStreak, setWeeklyStreak] = useState([true, true, false, true, false, false, false]); // Sun-Sat
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [moodQuizAnswers, setMoodQuizAnswers] = useState<string[]>([]);
  const [factQuizAnswers, setFactQuizAnswers] = useState<string[]>([]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const moodQuizQuestions = [
    { question: "How energetic do you feel today?", options: ["Very Low", "Low", "Medium", "High", "Very High"] },
    { question: "What's your current stress level?", options: ["Zen", "Calm", "Moderate", "Stressed", "Overwhelmed"] },
    { question: "How social are you feeling?", options: ["Hermit Mode", "Quiet", "Normal", "Social", "Party Ready"] },
    { question: "What's your pace today?", options: ["Slow & Steady", "Relaxed", "Normal", "Fast", "Lightning Speed"] },
    { question: "How adventurous are you feeling?", options: ["Safe Zone", "Cautious", "Open", "Adventurous", "Daredevil"] }
  ];

  const factQuizQuestions = [
    { question: "Which country produces the most coffee?", options: ["Colombia", "Brazil", "Ethiopia", "Vietnam"], correct: 1 },
    { question: "What does 'espresso' mean in Italian?", options: ["Strong", "Fast", "Pressed out", "Dark"], correct: 2 },
    { question: "How many coffee beans are in one coffee cherry?", options: ["1", "2", "3", "4"], correct: 1 },
    { question: "What is the most expensive coffee in the world?", options: ["Blue Mountain", "Kopi Luwak", "Black Ivory", "Geisha"], correct: 2 },
    { question: "When was instant coffee invented?", options: ["1901", "1910", "1920", "1930"], correct: 0 }
  ];

  const handleBrewToday = () => {
    toast({
      title: "Brewed Today!",
      description: "Great job maintaining your streak! +10 Aroma Points earned.",
    });
  };

  const handleMoodQuizAnswer = (answer: string) => {
    const newAnswers = [...moodQuizAnswers, answer];
    setMoodQuizAnswers(newAnswers);
    
    if (currentQuizQuestion < moodQuizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      // Quiz completed
      toast({
        title: "Coffee Mood Quiz Complete!",
        description: "Your mood has been analyzed. Check your coffee recommendation! +25 Aroma Points earned.",
      });
      setCurrentQuizQuestion(0);
      setMoodQuizAnswers([]);
    }
  };

  const handleFactQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...factQuizAnswers, answerIndex.toString()];
    setFactQuizAnswers(newAnswers);
    
    const isCorrect = answerIndex === factQuizQuestions[currentQuizQuestion].correct;
    
    if (newAnswers.length < factQuizQuestions.length) {
      setCurrentQuizQuestion((prev) => (prev + 1) % factQuizQuestions.length);
    } else {
      // Quiz completed
      const correctAnswers = newAnswers.filter((answer, index) => 
        parseInt(answer) === factQuizQuestions[index].correct
      ).length;
      
      toast({
        title: "Coffee Knowledge Quiz Complete!",
        description: `You got ${correctAnswers}/5 correct! +${correctAnswers * 5} Aroma Points earned.`,
      });
      setFactQuizAnswers([]);
      setCurrentQuizQuestion(0);
    }
  };

  const playableGames = [
    { name: "Bean Hunt", difficulty: "Easy", time: "2 min", points: 15, description: "Find hidden coffee beans in AR!" },
    { name: "Pod Match", difficulty: "Medium", time: "3 min", points: 20, description: "Match coffee pods in this memory game!" },
    { name: "Brew Master", difficulty: "Hard", time: "5 min", points: 30, description: "Master the perfect brewing technique!" }
  ];

  return (
    <div className="space-y-8">
      {/* Daily Brew Streak */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-6">
          <h2 className="text-2xl font-bold text-white">Daily Brew Streak</h2>
        </div>
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              {daysOfWeek.map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-gray-600 mb-1">{day}</div>
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${weeklyStreak[index] ? 'bg-amber-500 border-amber-500 text-white' : 'bg-gray-100 border-gray-300'}`}>
                    {weeklyStreak[index] ? '☕' : '○'}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">{currentStreak} days</div>
            <p className="mb-4">Keep your streak alive!</p>
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg"
              onClick={handleBrewToday}
            >
              Brew Today
            </Button>
          </div>
        </div>
      </div>

      {/* Coffee Mood Quiz */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6">
          <h2 className="text-2xl font-bold text-white">Coffee Mood Quiz</h2>
        </div>
        <div className="p-6">
          {moodQuizAnswers.length < moodQuizQuestions.length ? (
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
          
          {moodRecipe && (
            <div className="mt-6 border rounded-lg p-4 bg-purple-50">
              <h4 className="font-bold text-lg mb-2">Your Mood Coffee: {moodRecipe.recipe}</h4>
              <p className="text-sm mb-4">{moodRecipe.description}</p>
              <div className="mb-4">
                <h5 className="font-semibold mb-1">Ingredients:</h5>
                <ul className="list-disc pl-5">
                  {moodRecipe.ingredients.map((ingredient: string, i: number) => (
                    <li key={i} className="text-sm">{ingredient}</li>
                  ))}
                </ul>
              </div>
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
                <h3 className="text-lg font-semibold mb-4">{factQuizQuestions[currentQuizQuestion].question}</h3>
                <div className="space-y-2">
                  {factQuizQuestions[currentQuizQuestion].options.map((option, index) => (
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
          <h2 className="text-2xl font-bold text-white">Today's Mini Games</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {playableGames.map((game, index) => (
              <div key={index} className="border rounded-lg p-4 text-center">
                <h3 className="font-bold text-lg mb-2">{game.name}</h3>
                <div className="flex justify-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded ${game.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {game.difficulty}
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">
                    {game.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{game.description}</p>
                <div className="text-sm font-semibold text-green-600 mb-3">
                  +{game.points} Aroma Points
                </div>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => toast({ title: `Starting ${game.name}`, description: `Get ready to earn ${game.points} points!` })}
                >
                  Play Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyActivitiesTab;
