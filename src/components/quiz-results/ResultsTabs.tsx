
import React from 'react';
import { Button } from "@/components/ui/button";

interface ResultsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ResultsTabs = ({ activeTab, setActiveTab }: ResultsTabsProps) => {
  return (
    <div className="mb-8 flex justify-center">
      <div className="bg-white rounded-full p-1 shadow-md inline-flex">
        <Button 
          className={`px-5 py-2 rounded-full transition-colors ${activeTab === 'profile' ? 'bg-nescafe-red text-white' : 'hover:bg-gray-100'}`}
          onClick={() => setActiveTab('profile')}
          variant="ghost"
        >
          My Profile
        </Button>
        <Button 
          className={`px-5 py-2 rounded-full transition-colors ${activeTab === 'daily' ? 'bg-nescafe-red text-white' : 'hover:bg-gray-100'}`}
          onClick={() => setActiveTab('daily')}
          variant="ghost"
        >
          Daily Activities
        </Button>
        <Button 
          className={`px-5 py-2 rounded-full transition-colors ${activeTab === 'achievements' ? 'bg-nescafe-red text-white' : 'hover:bg-gray-100'}`}
          onClick={() => setActiveTab('achievements')}
          variant="ghost"
        >
          Achievements
        </Button>
      </div>
    </div>
  );
};

export default ResultsTabs;
