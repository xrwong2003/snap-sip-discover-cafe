
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface BrewMasterGameProps {
  onGameEnd: (points: number) => void;
  onClose: () => void;
}

const BrewMasterGame = ({ onGameEnd, onClose }: BrewMasterGameProps) => {
  const { toast } = useToast();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(100);
  const [stepScores, setStepScores] = useState<number[]>([]);
  
  // Game state for each step
  const [selectedBean, setSelectedBean] = useState<string>('');
  const [grindLevel, setGrindLevel] = useState([50]);
  const [waterTemp, setWaterTemp] = useState(70);
  const [brewMethod, setBrewMethod] = useState<string>('');
  const [isHoldingBrew, setIsHoldingBrew] = useState(false);
  const [brewTime, setBrewTime] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [isPouring, setIsPouring] = useState(false);

  const beans = [
    { id: 'arabica', name: 'Arabica', icon: '🌱', description: 'Smooth, sweet flavor', points: 20 },
    { id: 'robusta', name: 'Robusta', icon: '💪', description: 'Strong, bold taste', points: 15 },
    { id: 'blend', name: 'Premium Blend', icon: '⭐', description: 'Balanced perfection', points: 25 }
  ];

  const brewMethods = [
    { id: 'espresso', name: 'Espresso', icon: '☕', description: 'Quick & intense', grindRequired: 'fine', tempRange: [90, 96] },
    { id: 'drip', name: 'Drip Coffee', icon: '💧', description: 'Classic brewing', grindRequired: 'medium', tempRange: [92, 96] },
    { id: 'french', name: 'French Press', icon: '🫖', description: 'Full-bodied', grindRequired: 'coarse', tempRange: [92, 94] }
  ];

  const extras = [
    { id: 'milk', name: 'Milk', icon: '🥛' },
    { id: 'foam', name: 'Foam', icon: '☁️' },
    { id: 'syrup', name: 'Syrup', icon: '🍯' },
    { id: 'sugar', name: 'Sugar', icon: '🍬' }
  ];

  const steps = [
    'Select Beans',
    'Adjust Grind',
    'Set Temperature', 
    'Choose Method',
    'Brew Timing',
    'Add Extras',
    'Pour & Serve'
  ];

  const startGame = () => {
    setGameStarted(true);
    setCurrentStep(0);
    setScore(100);
    setStepScores([]);
    setTimeLeft(120);
    // Reset all selections
    setSelectedBean('');
    setGrindLevel([50]);
    setWaterTemp(70);
    setBrewMethod('');
    setBrewTime(0);
    setSelectedExtras([]);
  };

  const endGame = () => {
    setGameEnded(true);
    const finalScore = Math.max(0, score);
    const earnedPoints = finalScore >= 90 ? 30 : finalScore >= 70 ? 25 : Math.floor(finalScore / 4);
    onGameEnd(earnedPoints);
    
    toast({
      title: `Brew Score: ${finalScore}/100`,
      description: `+${earnedPoints} Aroma Points earned!`,
      duration: 3000,
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      endGame();
    }
  };

  const evaluateStep = (points: number) => {
    setStepScores(prev => [...prev, points]);
    setScore(prev => Math.max(0, prev + points - 15)); // Slight penalty for time
    nextStep();
  };

  // Bean selection logic
  const handleBeanSelect = (beanId: string) => {
    setSelectedBean(beanId);
    const bean = beans.find(b => b.id === beanId);
    if (bean) {
      evaluateStep(bean.points);
      toast({
        title: "Great Choice!",
        description: `${bean.name} selected. +${bean.points} points`,
        duration: 2000,
      });
    }
  };

  // Grind level evaluation
  const handleGrindSubmit = () => {
    const grindValue = grindLevel[0];
    let points = 0;
    let feedback = "";
    
    if (grindValue <= 30) {
      points = 20;
      feedback = "Perfect fine grind!";
    } else if (grindValue <= 60) {
      points = 15;
      feedback = "Good medium grind!";
    } else {
      points = 10;
      feedback = "Coarse grind works!";
    }
    
    evaluateStep(points);
    toast({
      title: feedback,
      description: `+${points} points`,
      duration: 2000,
    });
  };

  // Temperature evaluation
  const handleTempSubmit = () => {
    let points = 0;
    let feedback = "";
    
    if (waterTemp >= 92 && waterTemp <= 96) {
      points = 25;
      feedback = "Perfect temperature!";
    } else if (waterTemp >= 88 && waterTemp <= 100) {
      points = 15;
      feedback = "Good temperature!";
    } else {
      points = 5;
      feedback = "Temperature could be better!";
      setScore(prev => prev - 10); // Penalty for bad temp
    }
    
    evaluateStep(points);
    toast({
      title: feedback,
      description: `${waterTemp}°C - +${points} points`,
      duration: 2000,
    });
  };

  // Brew method evaluation
  const handleMethodSelect = (methodId: string) => {
    setBrewMethod(methodId);
    const method = brewMethods.find(m => m.id === methodId);
    if (method) {
      evaluateStep(20);
      toast({
        title: "Method Selected!",
        description: `${method.name} brewing selected. +20 points`,
        duration: 2000,
      });
    }
  };

  // Brew timing (hold for 5 seconds)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHoldingBrew) {
      interval = setInterval(() => {
        setBrewTime(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isHoldingBrew]);

  const handleBrewStart = () => {
    setIsHoldingBrew(true);
    setBrewTime(0);
  };

  const handleBrewEnd = () => {
    setIsHoldingBrew(false);
    let points = 0;
    let feedback = "";
    
    if (brewTime >= 4.5 && brewTime <= 5.5) {
      points = 30;
      feedback = "Perfect timing!";
    } else if (brewTime >= 3.5 && brewTime <= 6.5) {
      points = 20;
      feedback = "Good timing!";
    } else {
      points = 10;
      feedback = "Timing needs work!";
    }
    
    evaluateStep(points);
    toast({
      title: feedback,
      description: `${brewTime.toFixed(1)}s - +${points} points`,
      duration: 2000,
    });
  };

  // Extras handling
  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(e => e !== extraId)
        : [...prev, extraId]
    );
  };

  const handleExtrasSubmit = () => {
    const points = selectedExtras.length * 5; // 5 points per extra
    evaluateStep(points);
    toast({
      title: "Extras Added!",
      description: `${selectedExtras.length} extras selected. +${points} points`,
      duration: 2000,
    });
  };

  // Pour & serve
  const handlePour = () => {
    setIsPouring(true);
    setTimeout(() => {
      setIsPouring(false);
      evaluateStep(15);
      toast({
        title: "Beautifully Served!",
        description: "Perfect presentation! +15 points",
        duration: 2000,
      });
    }, 2000);
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
            Master the complete coffee brewing process through 7 interactive steps!
          </p>
          <div className="text-left mb-6 space-y-2">
            <div className="text-sm font-semibold">Brewing Challenge:</div>
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-xs">
                  {index + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <Button onClick={startGame} className="w-full bg-blue-500 hover:bg-blue-600">
              Start Brewing Challenge
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
    const finalScore = Math.max(0, score);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
          <div className="text-6xl mb-4">{finalScore >= 90 ? '🏆' : finalScore >= 70 ? '⭐' : '☕'}</div>
          <h2 className="text-2xl font-bold mb-4">
            {finalScore >= 90 ? 'Master Brewer!' : finalScore >= 70 ? 'Good Brew!' : 'Keep Practicing!'}
          </h2>
          <p className="text-gray-600 mb-4">
            Brew Score: <span className="font-bold text-blue-600">{finalScore}</span>/100
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {finalScore >= 90 ? "+30 Aroma Points earned!" : 
             finalScore >= 70 ? "+25 Aroma Points earned!" : 
             `+${Math.floor(finalScore / 4)} Aroma Points earned!`}
          </p>
          <div className="space-y-2">
            <Button onClick={onClose} className="w-full bg-blue-500 hover:bg-blue-600">
              Close
            </Button>
            <Button onClick={startGame} variant="outline" className="w-full">
              Try Again
            </Button>
          </div>
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
          <div className="text-sm">Step: {currentStep + 1}/7</div>
          <div className="text-sm">Score: {Math.max(0, score)}</div>
          <div className="text-lg font-bold">Time: {formatTime(timeLeft)}</div>
          <Button onClick={endGame} variant="outline" size="sm">
            End Game
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-4 border-b">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                ${index < currentStep 
                  ? 'bg-green-500 text-white' 
                  : index === currentStep 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }
              `}>
                {index + 1}
              </div>
              <div className="text-xs mt-1 text-center max-w-16">{step}</div>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Step 0: Select Beans */}
        {currentStep === 0 && (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">🌱 Select Your Coffee Beans</h3>
            <p className="text-gray-600 mb-6">Choose the perfect beans for your brew</p>
            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
              {beans.map(bean => (
                <button
                  key={bean.id}
                  onClick={() => handleBeanSelect(bean.id)}
                  className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="text-3xl mb-2">{bean.icon}</div>
                  <div className="font-bold">{bean.name}</div>
                  <div className="text-sm text-gray-600">{bean.description}</div>
                  <div className="text-xs text-blue-600 mt-1">+{bean.points} points</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Adjust Grind */}
        {currentStep === 1 && (
          <div className="text-center max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4">⚙️ Adjust Grind Level</h3>
            <p className="text-gray-600 mb-6">Set the perfect grind consistency</p>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Fine</span>
                <span>Medium</span>
                <span>Coarse</span>
              </div>
              <Slider
                value={grindLevel}
                onValueChange={setGrindLevel}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="text-lg font-bold mt-2">
                {grindLevel[0] <= 30 ? 'Fine' : grindLevel[0] <= 60 ? 'Medium' : 'Coarse'} Grind
              </div>
            </div>
            <Button onClick={handleGrindSubmit} className="bg-blue-500 hover:bg-blue-600">
              Set Grind Level
            </Button>
          </div>
        )}

        {/* Step 2: Set Temperature */}
        {currentStep === 2 && (
          <div className="text-center max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4">🌡️ Set Water Temperature</h3>
            <p className="text-gray-600 mb-6">Optimal range: 92-96°C</p>
            <div className="mb-6">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <div 
                  className="absolute inset-0 rounded-full border-8 border-gray-300 cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
                    const normalizedAngle = (angle + Math.PI) / (2 * Math.PI);
                    const temp = Math.round(60 + normalizedAngle * 40);
                    setWaterTemp(Math.min(100, Math.max(60, temp)));
                  }}
                >
                  <div 
                    className="absolute w-2 h-20 bg-blue-500 origin-bottom transform -rotate-90"
                    style={{ 
                      left: '50%',
                      bottom: '50%',
                      transformOrigin: 'bottom center',
                      transform: `translateX(-50%) rotate(${((waterTemp - 60) / 40) * 360 - 90}deg)`
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{waterTemp}°C</div>
                      <div className="text-sm text-gray-600">
                        {waterTemp >= 92 && waterTemp <= 96 ? 'Perfect!' : 'Adjust temp'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={handleTempSubmit} className="bg-blue-500 hover:bg-blue-600">
              Set Temperature
            </Button>
          </div>
        )}

        {/* Step 3: Choose Method */}
        {currentStep === 3 && (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">☕ Choose Brewing Method</h3>
            <p className="text-gray-600 mb-6">Select your preferred brewing style</p>
            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
              {brewMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => handleMethodSelect(method.id)}
                  className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="text-3xl mb-2">{method.icon}</div>
                  <div className="font-bold">{method.name}</div>
                  <div className="text-sm text-gray-600">{method.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Brew Timing */}
        {currentStep === 4 && (
          <div className="text-center max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4">⏱️ Perfect Brew Timing</h3>
            <p className="text-gray-600 mb-6">Hold the button for exactly 5 seconds</p>
            <div className="mb-6">
              <div className="text-4xl font-bold mb-4">
                {brewTime.toFixed(1)}s
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className="bg-blue-500 h-4 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (brewTime / 5) * 100)}%` }}
                ></div>
              </div>
              {!isHoldingBrew ? (
                <Button 
                  onMouseDown={handleBrewStart}
                  onTouchStart={handleBrewStart}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg"
                >
                  Hold to Brew
                </Button>
              ) : (
                <Button 
                  onMouseUp={handleBrewEnd}
                  onTouchEnd={handleBrewEnd}
                  onMouseLeave={handleBrewEnd}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
                >
                  Release when ready!
                </Button>
              )}
            </div>
            <p className="text-sm text-gray-500">Target: 4.5 - 5.5 seconds for perfect extraction</p>
          </div>
        )}

        {/* Step 5: Add Extras */}
        {currentStep === 5 && (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">✨ Add Extras (Optional)</h3>
            <p className="text-gray-600 mb-6">Customize your perfect cup</p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
              {extras.map(extra => (
                <button
                  key={extra.id}
                  onClick={() => toggleExtra(extra.id)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedExtras.includes(extra.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{extra.icon}</div>
                  <div className="font-bold text-sm">{extra.name}</div>
                  {selectedExtras.includes(extra.id) && (
                    <div className="text-xs text-blue-600 mt-1">✓ Added</div>
                  )}
                </button>
              ))}
            </div>
            <Button onClick={handleExtrasSubmit} className="bg-blue-500 hover:bg-blue-600">
              Continue ({selectedExtras.length} extras selected)
            </Button>
          </div>
        )}

        {/* Step 6: Pour & Serve */}
        {currentStep === 6 && (
          <div className="text-center max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4">🫗 Pour & Serve</h3>
            <p className="text-gray-600 mb-6">Present your masterpiece</p>
            <div className="mb-6">
              <div className="text-6xl mb-4">
                {isPouring ? '🌊' : '☕'}
              </div>
              {isPouring ? (
                <div className="text-lg font-bold text-blue-600">
                  Pouring... ✨
                </div>
              ) : (
                <Button 
                  onClick={handlePour}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg"
                >
                  Pour Coffee
                </Button>
              )}
            </div>
            <p className="text-sm text-gray-500">Perfect presentation earns bonus points!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrewMasterGame;
