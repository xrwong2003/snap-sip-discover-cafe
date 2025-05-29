
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Bean {
  id: number;
  x: number;
  y: number;
  speed: number;
}

interface BeanHuntGameProps {
  onGameEnd: (points: number) => void;
  onClose: () => void;
}

const BeanHuntGame = ({ onGameEnd, onClose }: BeanHuntGameProps) => {
  const { toast } = useToast();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [score, setScore] = useState(0);
  const [beans, setBeans] = useState<Bean[]>([]);
  const [nextBeanId, setNextBeanId] = useState(1);

  const spawnBean = useCallback(() => {
    const newBean: Bean = {
      id: nextBeanId,
      x: Math.random() * 90, // 0-90% to keep beans in bounds
      y: -5,
      speed: 1 + Math.random() * 2 // Random speed between 1-3
    };
    setBeans(prev => [...prev, newBean]);
    setNextBeanId(prev => prev + 1);
  }, [nextBeanId]);

  const catchBean = (beanId: number) => {
    setBeans(prev => prev.filter(bean => bean.id !== beanId));
    setScore(prev => prev + 1);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setBeans([]);
    setTimeLeft(120);
  };

  const endGame = () => {
    setGameEnded(true);
    const earnedPoints = score >= 10 ? 15 : Math.floor(score / 2); // Minimum threshold logic
    onGameEnd(earnedPoints);
    
    if (score >= 10) {
      toast({
        title: "You earned +15 Aroma Points!",
        description: `Great job! You caught ${score} beans!`,
      });
    } else {
      toast({
        title: `You earned +${earnedPoints} Aroma Points!`,
        description: `You caught ${score} beans. Try again to earn more points!`,
      });
    }
  };

  // Game timer
  useEffect(() => {
    if (gameStarted && !gameEnded && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      endGame();
    }
  }, [gameStarted, gameEnded, timeLeft]);

  // Bean spawning
  useEffect(() => {
    if (gameStarted && !gameEnded) {
      const spawnInterval = setInterval(() => {
        if (Math.random() < 0.6) { // 60% chance to spawn a bean
          spawnBean();
        }
      }, 1500);
      return () => clearInterval(spawnInterval);
    }
  }, [gameStarted, gameEnded, spawnBean]);

  // Bean movement
  useEffect(() => {
    if (gameStarted && !gameEnded) {
      const moveInterval = setInterval(() => {
        setBeans(prev => prev
          .map(bean => ({ ...bean, y: bean.y + bean.speed }))
          .filter(bean => bean.y < 100) // Remove beans that fell off screen
        );
      }, 50);
      return () => clearInterval(moveInterval);
    }
  }, [gameStarted, gameEnded]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!gameStarted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
          <div className="text-6xl mb-4">☕</div>
          <h2 className="text-2xl font-bold mb-4">Bean Hunt</h2>
          <p className="text-gray-600 mb-6">
            Catch falling coffee beans before they hit the bottom! 
            You have 2 minutes to catch as many as possible.
          </p>
          <div className="space-y-4">
            <Button onClick={startGame} className="w-full bg-orange-500 hover:bg-orange-600">
              Start Game
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
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          <p className="text-gray-600 mb-4">
            You caught <span className="font-bold text-orange-600">{score}</span> beans!
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {score >= 10 ? "Excellent work! +15 Aroma Points earned!" : `+${Math.floor(score / 2)} Aroma Points earned. Try again for more!`}
          </p>
          <Button onClick={onClose} className="w-full bg-orange-500 hover:bg-orange-600">
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-200 to-sky-400 flex flex-col z-50">
      {/* Game Header */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-lg font-bold">Bean Hunt</div>
        <div className="flex gap-4 items-center">
          <div className="text-lg font-bold">Score: {score}</div>
          <div className="text-lg font-bold">Time: {formatTime(timeLeft)}</div>
          <Button onClick={endGame} variant="outline" size="sm">
            End Game
          </Button>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 relative overflow-hidden">
        {beans.map(bean => (
          <button
            key={bean.id}
            onClick={() => catchBean(bean.id)}
            className="absolute w-8 h-8 text-2xl hover:scale-110 transition-transform cursor-pointer"
            style={{ 
              left: `${bean.x}%`, 
              top: `${bean.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            ☕
          </button>
        ))}
        
        {/* Ground indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-amber-600"></div>
      </div>
    </div>
  );
};

export default BeanHuntGame;
