import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProfileTabProps {
  persona: any;
  personaName: string;
  currentStreak: number;
  earnedBadges: string[];
  avatarCustomization: {
    personalityStyle: string;
    background: string;
    accessories: string;
    frameStyle: string;
    avatarSize: string;
    rotation: string;
    animationStyle: string;
  };
  setAvatarCustomization: React.Dispatch<React.SetStateAction<{
    personalityStyle: string;
    background: string;
    accessories: string;
    frameStyle: string;
    avatarSize: string;
    rotation: string;
    animationStyle: string;
  }>>;
  onAvatarSave: () => void;
}

const ProfileTab = ({ 
  persona, 
  currentStreak,
  earnedBadges,
  avatarCustomization,
  setAvatarCustomization,
  onAvatarSave
}: ProfileTabProps) => {
  const { toast } = useToast();
  const [showCustomization, setShowCustomization] = useState(false);

  const handleSaveAvatar = (e: React.MouseEvent) => {
    // Prevent any default behavior that might cause scrolling
    e.preventDefault();
    e.stopPropagation();
    
    // Store current scroll position to restore if needed
    const currentScrollY = window.scrollY;
    
    toast({
      title: "Avatar Saved!",
      description: "+50 Aroma Points earned for customizing your avatar!",
    });
    setShowCustomization(false);
    
    // Ensure scroll position doesn't change
    requestAnimationFrame(() => {
      if (window.scrollY !== currentScrollY) {
        window.scrollTo({ top: currentScrollY, behavior: 'auto' });
      }
    });
    
    // Call the parent callback without any scrolling side effects
    onAvatarSave();
  };

  return (
    <>
      <div className="text-center mb-8">
        <div className="mb-4 inline-block p-4 rounded-full bg-white">
          <div className="text-5xl">{persona.icon}</div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Coffee Profile</h1>
        <p className="text-lg text-nescafe-brown max-w-xl mx-auto">{persona.description}</p>
      </div>

      {/* Your Coffee Avatar */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
          <h2 className="text-2xl font-bold text-white">Your Coffee Avatar</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className={`relative w-32 h-32 ${avatarCustomization.background === 'cream' ? 'bg-nescafe-cream' : avatarCustomization.background === 'brown' ? 'bg-nescafe-brown' : 'bg-white'} ${avatarCustomization.frameStyle === 'rounded' ? 'rounded-full' : avatarCustomization.frameStyle === 'square' ? 'rounded-lg' : 'rounded-xl'} border-4 border-nescafe-red flex items-center justify-center`}>
                <div className={`text-6xl ${avatarCustomization.animationStyle === 'bounce' ? 'animate-bounce' : avatarCustomization.animationStyle === 'pulse' ? 'animate-pulse' : ''}`} style={{ transform: `rotate(${avatarCustomization.rotation}deg)` }}>
                  {avatarCustomization.personalityStyle}
                </div>
                {avatarCustomization.accessories !== 'none' && (
                  <div className="absolute -bottom-2 -right-2 bg-nescafe-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                    {avatarCustomization.accessories === 'hat' ? '🎩' : avatarCustomization.accessories === 'glasses' ? '🕶️' : '⭐'}
                  </div>
                )}
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-4">Coffee Avatar</h3>
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => setShowCustomization(!showCustomization)}
              >
                Customize Your Avatar
              </Button>
              
              {showCustomization && (
                <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                  <h4 className="font-semibold mb-4">Avatar Customization</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Personality Style</label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        value={avatarCustomization.personalityStyle}
                        onChange={(e) => setAvatarCustomization({...avatarCustomization, personalityStyle: e.target.value})}
                      >
                        <option value="☕">☕</option>
                        <option value="🥛">🥛</option>
                        <option value="🍫">🍫</option>
                        <option value="🧊">🧊</option>
                        <option value="🫘">🫘</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Background</label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        value={avatarCustomization.background}
                        onChange={(e) => setAvatarCustomization({...avatarCustomization, background: e.target.value})}
                      >
                        <option value="cream">Cream</option>
                        <option value="brown">Brown</option>
                        <option value="white">White</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Accessories</label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        value={avatarCustomization.accessories}
                        onChange={(e) => setAvatarCustomization({...avatarCustomization, accessories: e.target.value})}
                      >
                        <option value="none">None</option>
                        <option value="hat">Hat</option>
                        <option value="glasses">Glasses</option>
                        <option value="star">Star</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Frame Style</label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        value={avatarCustomization.frameStyle}
                        onChange={(e) => setAvatarCustomization({...avatarCustomization, frameStyle: e.target.value})}
                      >
                        <option value="rounded">Rounded</option>
                        <option value="square">Square</option>
                        <option value="hexagon">Hexagon</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Animation Style</label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        value={avatarCustomization.animationStyle}
                        onChange={(e) => setAvatarCustomization({...avatarCustomization, animationStyle: e.target.value})}
                      >
                        <option value="none">None</option>
                        <option value="bounce">Bounce</option>
                        <option value="pulse">Pulse</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button 
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white w-full"
                    onClick={handleSaveAvatar}
                    type="button"
                    onFocus={(e) => e.preventDefault()}
                  >
                    Save Avatar (+50 Aroma Points)
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-teal-700 p-6">
          <h2 className="text-2xl font-bold text-white">Your Coffee Journey Summary</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-4xl font-bold text-teal-600 mb-2">{currentStreak}</div>
              <div className="text-lg font-semibold">Day Streak</div>
              <div className="text-sm text-gray-600">Current brewing streak</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-4xl font-bold text-teal-600 mb-2">12</div>
              <div className="text-lg font-semibold">Recipes Tried</div>
              <div className="text-sm text-gray-600">Coffee recipes explored</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-4xl font-bold text-teal-600 mb-2">{earnedBadges.length}</div>
              <div className="text-lg font-semibold">Achievements</div>
              <div className="text-sm text-gray-600">Badges earned</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTab;
