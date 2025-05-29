
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface PodMatchGameProps {
  onGameEnd: (points: number) => void;
  onClose: () => void;
}

const PodMatchGame = ({ onGameEnd, onClose }: PodMatchGameProps) => {
  const { toast } = useToast();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);

  const icons = ['🍀', '☕', '🥛', '🍫', '🧊', '🔥', '⭐', '💎'];

  const initializeCards = () => {
    const cardPairs = [...icons, ...icons];
    const shuffled = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffled);
  };

  const startGame = () => {
    setGameStarted(true);
    setMatches(0);
    setMoves(0);
    setFlippedCards([]);
    setTimeLeft(180);
    initializeCards();
  };

  const endGame = (completed = false) => {
    setGameEnded(true);
    const earnedPoints = completed ? 20 : Math.floor(matches * 2);
    onGameEnd(earnedPoints);
    
    if (completed) {
      toast({
        title: "Great Match! +20 Aroma Points!",
        description: `Completed in ${moves} moves!`,
      });
    } else {
      toast({
        title: "Game Over!",
        description: `You matched ${matches} pairs. +${earnedPoints} Aroma Points earned!`,
      });
    }
  };

  const flipCard = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      
      setTimeout(() => {
        const [first, second] = newFlipped;
        const firstCard = cards.find(c => c.id === first);
        const secondCard = cards.find(c => c.id === second);

        if (firstCard?.icon === secondCard?.icon) {
          // Match found
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second 
              ? { ...c, isMatched: true }
              : c
          ));
          setMatches(prev => {
            const newMatches = prev + 1;
            if (newMatches === 8) { // All pairs matched
              setTimeout(() => endGame(true), 500);
            }
            return newMatches;
          });
        } else {
          // No match, flip back
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second 
              ? { ...c, isFlipped: false }
              : c
          ));
        }
        setFlippedCards([]);
      }, 1000);
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
          <div className="text-6xl mb-4">🍀</div>
          <h2 className="text-2xl font-bold mb-4">Pod Match</h2>
          <p className="text-gray-600 mb-6">
            Find matching pairs of coffee pods by flipping cards. 
            Match all 8 pairs within 3 minutes to win!
          </p>
          <div className="space-y-4">
            <Button onClick={startGame} className="w-full bg-green-500 hover:bg-green-600">
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
          <div className="text-6xl mb-4">{matches === 8 ? '🏆' : '🎯'}</div>
          <h2 className="text-2xl font-bold mb-4">
            {matches === 8 ? 'Great Match!' : 'Game Over!'}
          </h2>
          <p className="text-gray-600 mb-4">
            You matched <span className="font-bold text-green-600">{matches}</span> out of 8 pairs
            in <span className="font-bold">{moves}</span> moves!
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {matches === 8 ? "+20 Aroma Points earned!" : `+${Math.floor(matches * 2)} Aroma Points earned!`}
          </p>
          <Button onClick={onClose} className="w-full bg-green-500 hover:bg-green-600">
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-green-100 to-green-200 flex flex-col z-50">
      {/* Game Header */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-lg font-bold">Pod Match</div>
        <div className="flex gap-4 items-center">
          <div className="text-sm">Matches: {matches}/8</div>
          <div className="text-sm">Moves: {moves}</div>
          <div className="text-lg font-bold">Time: {formatTime(timeLeft)}</div>
          <Button onClick={() => endGame(false)} variant="outline" size="sm">
            End Game
          </Button>
        </div>
      </div>

      {/* Game Grid */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-4 max-w-md">
          {cards.map(card => (
            <button
              key={card.id}
              onClick={() => flipCard(card.id)}
              className={`
                w-16 h-16 rounded-lg border-2 flex items-center justify-center text-2xl font-bold
                transition-all duration-300 transform hover:scale-105
                ${card.isMatched 
                  ? 'bg-green-200 border-green-400 text-green-700 cursor-default' 
                  : card.isFlipped 
                    ? 'bg-white border-green-500' 
                    : 'bg-green-400 border-green-600 hover:bg-green-300 cursor-pointer'
                }
              `}
              disabled={card.isMatched || flippedCards.length === 2}
            >
              {card.isFlipped || card.isMatched ? card.icon : '?'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodMatchGame;
