
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
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds
  const [score, setScore] = useState(0);
  const [beans, setBeans] = useState<Bean[]>([]);
  const [nextBeanId, setNextBeanId] = useState(1);
  const [basketPosition, setBasketPosition] = useState(50); // Percentage from left

  const spawnBean = useCallback(() => {
    const newBean: Bean = {
      id: nextBeanId,
      x: Math.random() * 85 + 5, // 5-90% to keep beans in bounds
      y: -5,
      speed: 1.2 + Math.random() * 1.5 // Smoother speed between 1.2-2.7
    };
    setBeans(prev => [...prev, newBean]);
    setNextBeanId(prev => prev + 1);
  }, [nextBeanId]);

  const handleBasketDrag = (e: React.MouseEvent | React.TouchEvent) => {
    const gameArea = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newPosition = ((clientX - gameArea.left) / gameArea.width) * 100;
    setBasketPosition(Math.max(10, Math.min(90, newPosition)));
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setBeans([]);
    setTimeLeft(30);
    setBasketPosition(50);
  };

  const endGame = () => {
    setGameEnded(true);
    const earnedPoints = score >= 5 ? 15 : Math.floor(score * 2); // Minimum threshold logic
    onGameEnd(earnedPoints);
    
    toast({
      title: `You caught ${score} beans!`,
      description: `+${earnedPoints} Aroma Points earned!`,
      duration: 3000,
    });
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
        if (Math.random() < 0.65) { // 65% chance to spawn a bean
          spawnBean();
        }
      }, 1200); // Slightly longer interval for smoother gameplay
      return () => clearInterval(spawnInterval);
    }
  }, [gameStarted, gameEnded, spawnBean]);

  // Bean movement and collision detection - optimized for 60fps
  useEffect(() => {
    if (gameStarted && !gameEnded) {
      const moveInterval = setInterval(() => {
        setBeans(prev => prev
          .map(bean => {
            const newY = bean.y + bean.speed;
            
            // Check collision with basket (enlarged hit area)
            if (newY >= 78 && newY <= 95) {
              const distance = Math.abs(bean.x - basketPosition);
              if (distance <= 14) { // Slightly larger collision area
                setScore(s => s + 1);
                return null; // Remove caught bean
              }
            }
            
            return { ...bean, y: newY };
          })
          .filter((bean): bean is Bean => bean !== null && bean.y < 100) // Remove beans that fell off screen
        );
      }, 16); // 60fps animation (1000/60 ≈ 16ms)
      return () => clearInterval(moveInterval);
    }
  }, [gameStarted, gameEnded, basketPosition]);

  if (!gameStarted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
          <div className="text-6xl mb-4">☕</div>
          <h2 className="text-2xl font-bold mb-4">Bean Hunt</h2>
          <p className="text-gray-600 mb-6">
            Drag your basket to catch falling coffee beans! 
            You have 30 seconds to catch as many as possible.
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
            {score >= 5 ? "+15 Aroma Points earned!" : `+${Math.floor(score * 2)} Aroma Points earned. Try again for more!`}
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
          <div className="text-lg font-bold">Time: {timeLeft}s</div>
          <Button onClick={endGame} variant="outline" size="sm">
            End Game
          </Button>
        </div>
      </div>

      {/* Game Area */}
      <div 
        className="flex-1 relative overflow-hidden cursor-crosshair select-none"
        onMouseMove={handleBasketDrag}
        onTouchMove={handleBasketDrag}
        style={{ touchAction: 'none' }}
      >
        {beans.map(bean => (
          <div
            key={bean.id}
            className="absolute w-8 h-8 text-xl pointer-events-none"
            style={{ 
              left: `${bean.x}%`, 
              top: `${bean.y}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'none', // Remove any CSS transitions for smoother animation
              willChange: 'transform' // Optimize for animations
            }}
          >
            ☕
          </div>
        ))}
        
        {/* Enlarged Movable Basket */}
        <div 
          className="absolute bottom-4 w-24 h-16 bg-amber-600 rounded-lg flex items-center justify-center text-3xl shadow-lg pointer-events-none"
          style={{ 
            left: `${basketPosition}%`,
            transform: 'translateX(-50%)',
            transition: 'none', // Remove transitions for instant response
            willChange: 'transform'
          }}
        >
          🧺
        </div>
        
        {/* Instructions */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-lg px-4 py-2">
          <p className="text-sm font-medium text-gray-700">Drag to move basket • Catch falling beans!</p>
        </div>
        
        {/* Ground indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-amber-600"></div>
      </div>
    </div>
  );
};

export default BeanHuntGame;
