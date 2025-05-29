
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface BrewStep {
  id: number;
  name: string;
  icon: string;
  description: string;
  completed: boolean;
}

interface BrewMasterGameProps {
  onGameEnd: (points: number) => void;
  onClose: () => void;
}

const BrewMasterGame = ({ onGameEnd, onClose }: BrewMasterGameProps) => {
  const { toast } = useToast();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<BrewStep[]>([
    { id: 1, name: 'Grind Beans', icon: '⚙️', description: 'Grind coffee beans to the perfect consistency', completed: false },
    { id: 2, name: 'Pour Water', icon: '💧', description: 'Pour hot water over the grounds', completed: false },
    { id: 3, name: 'Stir', icon: '🥄', description: 'Stir gently to extract flavors', completed: false },
    { id: 4, name: 'Serve', icon: '☕', description: 'Serve your perfect cup of coffee', completed: false }
  ]);
  const [mistakes, setMistakes] = useState(0);

  const startGame = () => {
    setGameStarted(true);
    setCurrentStep(0);
    setMistakes(0);
    setTimeLeft(300);
    setSteps(prev => prev.map(step => ({ ...step, completed: false })));
  };

  const endGame = (completed = false) => {
    setGameEnded(true);
    const completedSteps = steps.filter(step => step.completed).length;
    let earnedPoints = 0;
    
    if (completed && mistakes === 0) {
      earnedPoints = 30; // Perfect completion
    } else if (completed) {
      earnedPoints = 25; // Completed with mistakes
    } else {
      earnedPoints = Math.floor(completedSteps * 5); // 5 points per completed step
    }
    
    onGameEnd(earnedPoints);
    
    if (completed) {
      toast({
        title: mistakes === 0 ? "Perfect Brew! +30 Aroma Points!" : "Good Brew! +25 Aroma Points!",
        description: mistakes === 0 ? "Flawless brewing technique!" : `Completed with ${mistakes} mistake(s)`,
      });
    } else {
      toast({
        title: "Time's Up!",
        description: `Completed ${completedSteps}/4 steps. +${earnedPoints} Aroma Points earned!`,
      });
    }
  };

  const performStep = (stepId: number) => {
    if (stepId === steps[currentStep].id) {
      // Correct step
      const newSteps = steps.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      );
      setSteps(newSteps);
      
      if (currentStep === steps.length - 1) {
        // All steps completed
        setTimeout(() => endGame(true), 1000);
      } else {
        setCurrentStep(prev => prev + 1);
        toast({
          title: "Great!",
          description: `${steps[currentStep].name} completed successfully!`,
        });
      }
    } else {
      // Wrong step
      setMistakes(prev => prev + 1);
      toast({
        title: "Oops!",
        description: `That's not the right step. Follow the brewing sequence!`,
        variant: "destructive",
      });
    }
  };

  // Game timer
  useEffect(() => {
    if (gameStarted && !gameEnded && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      endGame(false);
    }
  }, [gameStarted, gameEnded, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!gameStarted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
          <div className="text-6xl mb-4">🔥</div>
          <h2 className="text-2xl font-bold mb-4">Brew Master</h2>
          <p className="text-gray-600 mb-4">
            Follow the correct coffee brewing sequence to create the perfect cup!
          </p>
          <div className="text-left mb-6 space-y-2">
            <div className="text-sm font-semibold">Brewing Steps:</div>
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2 text-sm">
                <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-xs">
                  {index + 1}
                </span>
                <span>{step.icon} {step.name}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <Button onClick={startGame} className="w-full bg-blue-500 hover:bg-blue-600">
              Start Brewing
            </Button>
            <Button onClick={onClose} variant="outline" className="w-full">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameEnded) {
    const completedSteps = steps.filter(step => step.completed).length;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
          <div className="text-6xl mb-4">{completedSteps === 4 ? '🏆' : '⏰'}</div>
          <h2 className="text-2xl font-bold mb-4">
            {completedSteps === 4 ? (mistakes === 0 ? 'Perfect Brew!' : 'Good Brew!') : "Time's Up!"}
          </h2>
          <p className="text-gray-600 mb-4">
            Completed <span className="font-bold text-blue-600">{completedSteps}</span> out of 4 steps
            {mistakes > 0 && <span className="block text-sm">with {mistakes} mistake(s)</span>}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {completedSteps === 4 
              ? (mistakes === 0 ? "+30 Aroma Points earned!" : "+25 Aroma Points earned!")
              : `+${Math.floor(completedSteps * 5)} Aroma Points earned!`
            }
          </p>
          <Button onClick={onClose} className="w-full bg-blue-500 hover:bg-blue-600">
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col z-50">
      {/* Game Header */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-lg font-bold">Brew Master</div>
        <div className="flex gap-4 items-center">
          <div className="text-sm">Step: {currentStep + 1}/4</div>
          <div className="text-sm">Mistakes: {mistakes}</div>
          <div className="text-lg font-bold">Time: {formatTime(timeLeft)}</div>
          <Button onClick={() => endGame(false)} variant="outline" size="sm">
            End Game
          </Button>
        </div>
      </div>

      {/* Current Step Indicator */}
      <div className="bg-blue-50 p-4 border-b">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">
            Next Step: {steps[currentStep]?.name}
          </h3>
          <p className="text-gray-600 text-sm">
            {steps[currentStep]?.description}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-4">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center text-xl
                ${step.completed 
                  ? 'bg-green-500 text-white' 
                  : index === currentStep 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }
              `}>
                {step.icon}
              </div>
              <div className="text-xs mt-1 text-center">{step.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-6 max-w-md">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => performStep(step.id)}
              className={`
                p-6 rounded-xl border-2 flex flex-col items-center gap-2
                transition-all duration-300 transform hover:scale-105
                ${step.completed
                  ? 'bg-green-100 border-green-400 text-green-700 cursor-default'
                  : 'bg-white border-blue-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                }
              `}
              disabled={step.completed}
            >
              <div className="text-3xl">{step.icon}</div>
              <div className="font-semibold text-sm text-center">{step.name}</div>
              {step.completed && (
                <div className="text-xs text-green-600">✓ Completed</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrewMasterGame;
