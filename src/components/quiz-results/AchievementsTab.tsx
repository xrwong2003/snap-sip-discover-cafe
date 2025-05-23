
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface AchievementsTabProps {
  persona: any;
  personaName: string;
  currentStreak: number;
  earnedBadges: string[];
  avatarCustomization: {
    hairStyle: string;
    facialFeature: string;
    outfit: string;
    accessory: string;
  };
  setAvatarCustomization: React.Dispatch<React.SetStateAction<{
    hairStyle: string;
    facialFeature: string;
    outfit: string;
    accessory: string;
  }>>;
  achievementBadges: any[];
}

const leaderboardData = [
  { rank: 1, name: "Coffee Master", persona: "The Zen Master", points: 1250, avatar: "🧘" },
  { rank: 2, name: "Bean Hunter", persona: "The Adventurer", points: 980, avatar: "🌍" },
  { rank: 3, name: "Brew Expert", persona: "The Hustler", points: 740, avatar: "💼" },
  { rank: 4, name: "You", persona: "Your Persona", points: 350, avatar: "☕", highlight: true },
  { rank: 5, name: "Sip Savvy", persona: "The Dreamer", points: 310, avatar: "✨" },
];

const AchievementsTab = ({ 
  persona, 
  personaName, 
  currentStreak, 
  earnedBadges, 
  avatarCustomization,
  setAvatarCustomization,
  achievementBadges
}: AchievementsTabProps) => {
  return (
    <div className="space-y-8">
      {/* Coffee Avatar Customization */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
          <h2 className="text-2xl font-bold text-white">Your Coffee Avatar</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-nescafe-red">
                  <AvatarImage src={persona.image} />
                  <AvatarFallback>{personaName[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-nescafe-red text-white rounded-full w-10 h-10 flex items-center justify-center text-lg">
                  {persona.icon}
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-4">Customize Your Avatar</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Hair Style</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={avatarCustomization.hairStyle}
                    onChange={(e) => setAvatarCustomization({...avatarCustomization, hairStyle: e.target.value})}
                  >
                    <option value="short">Short</option>
                    <option value="long">Long</option>
                    <option value="curly">Curly</option>
                    <option value="wavy">Wavy</option>
                    <option value="bald">Bald</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Outfit</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={avatarCustomization.outfit}
                    onChange={(e) => setAvatarCustomization({...avatarCustomization, outfit: e.target.value})}
                  >
                    <option value="casual">Casual</option>
                    <option value="business">Business</option>
                    <option value="sporty">Sporty</option>
                    <option value="creative">Creative</option>
                    <option value="relaxed">Relaxed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Accessory</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={avatarCustomization.accessory}
                    onChange={(e) => setAvatarCustomization({...avatarCustomization, accessory: e.target.value})}
                  >
                    <option value="coffee cup">Coffee Cup</option>
                    <option value="laptop">Laptop</option>
                    <option value="book">Book</option>
                    <option value="headphones">Headphones</option>
                    <option value="plant">Plant</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              
              <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                Save Avatar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
          <h2 className="text-2xl font-bold text-white">Coffee Masters Leaderboard</h2>
        </div>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Coffee Master</TableHead>
                <TableHead>Persona</TableHead>
                <TableHead className="text-right">Aroma Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user, index) => (
                <TableRow key={index} className={user.highlight ? "bg-amber-50" : ""}>
                  <TableCell className="font-medium">
                    {user.rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="mr-2 text-xl">{user.avatar}</div>
                      <div className={user.highlight ? "font-bold text-amber-700" : ""}>
                        {user.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.persona}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {user.points}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 text-center text-sm text-gray-500">
            Keep engaging to earn more Aroma Points and climb the leaderboard!
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6">
          <h2 className="text-2xl font-bold text-white">Your Achievement Badges</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievementBadges.map(badge => {
              const isEarned = earnedBadges.includes(badge.id);
              
              return (
                <div 
                  key={badge.id} 
                  className={`border rounded-lg p-4 text-center ${isEarned ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-gray-50 opacity-60'}`}
                >
                  <div className="text-4xl mb-2">{badge.image}</div>
                  <h3 className="font-bold">{badge.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                  <div className="text-xs font-semibold text-yellow-600">
                    {isEarned ? 'EARNED' : 'LOCKED'} • {badge.points} Points
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-teal-700 p-6">
          <h2 className="text-2xl font-bold text-white">Your Coffee Journey</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-teal-600">{currentStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-teal-600">{earnedBadges.length}</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-teal-600">350</div>
              <div className="text-sm text-gray-600">Aroma Points</div>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-teal-600">5</div>
              <div className="text-sm text-gray-600">Recipes Tried</div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="mb-4">Keep engaging with NESCAFÉ to grow your coffee journey!</p>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              View Full Stats
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsTab;
