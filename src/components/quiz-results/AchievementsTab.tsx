
import React from 'react';
import { Button } from "@/components/ui/button";
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
  achievementBadges: any[];
}

const leaderboardData = [
  { rank: 1, name: "CoffeeExplorer", level: "Lv.18 Master", streak: 15, achievements: 12, lastActive: "May 29", points: 2180 },
  { rank: 2, name: "LatteLover", level: "Lv.16 Master", streak: 12, achievements: 10, lastActive: "May 22", points: 1980 },
  { rank: 3, name: "EspressoPro", level: "Lv.14 Expert", streak: 9, achievements: 11, lastActive: "May 27", points: 1750 },
  { rank: 4, name: "BeanMaster", level: "Lv.13 Expert", streak: 18, achievements: 9, lastActive: "May 22", points: 1650 },
  { rank: 5, name: "You", level: "Lv.12 Expert", streak: 7, achievements: 8, lastActive: "May 25", points: 1250, highlight: true },
  { rank: 6, name: "MochaQueen", level: "Lv.9 Pro", streak: 4, achievements: 5, lastActive: "May 27", points: 1180 },
  { rank: 7, name: "FrappeFan", level: "Lv.8 Pro", streak: 3, achievements: 4, lastActive: "May 23", points: 980 },
  { rank: 8, name: "ColdBrewKing", level: "Lv.7 Pro", streak: 2, achievements: 3, lastActive: "May 27", points: 850 },
];

const AchievementsTab = ({ 
  currentStreak, 
  earnedBadges, 
  achievementBadges
}: AchievementsTabProps) => {
  return (
    <div className="space-y-8">
      {/* Aroma Points Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🏆 Aroma Points Leaderboard
          </h2>
          <p className="text-amber-100 mt-1">Top coffee explorers this month</p>
        </div>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Coffee Explorer</TableHead>
                <TableHead>🔥 Streak</TableHead>
                <TableHead>🏆 Achievements</TableHead>
                <TableHead>📅 Last Active</TableHead>
                <TableHead className="text-right">⭐ Aroma Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user, index) => (
                <TableRow key={index} className={user.highlight ? "bg-amber-50 border-amber-200" : ""}>
                  <TableCell className="font-medium">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      user.rank === 1 ? 'bg-yellow-500 text-white' : 
                      user.rank === 2 ? 'bg-gray-400 text-white' : 
                      user.rank === 3 ? 'bg-amber-600 text-white' : 
                      user.highlight ? 'bg-amber-200 text-amber-800' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      #{user.rank}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        👤
                      </div>
                      <div>
                        <div className={`font-semibold ${user.highlight ? "text-amber-700" : ""}`}>
                          {user.name}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                          user.level.includes('Master') ? 'bg-purple-100 text-purple-800' :
                          user.level.includes('Expert') ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {user.level}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-orange-500">🔥</span>
                      <span className="font-semibold">{user.streak}</span>
                      <span className="text-xs text-gray-500">day streak</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">🏆</span>
                      <span className="font-semibold">{user.achievements}</span>
                      <span className="text-xs text-gray-500">achievements</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">📅</span>
                      <span className="text-sm">{user.lastActive}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-bold text-lg">{user.points.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">Aroma Points</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6 text-center">
            <p className="text-gray-500 mb-4">Earn more points by completing daily challenges, quizzes, and games!</p>
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
    </div>
  );
};

export default AchievementsTab;
