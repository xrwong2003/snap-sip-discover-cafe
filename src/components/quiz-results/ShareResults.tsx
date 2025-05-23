
import React from 'react';
import { Link } from 'react-router-dom';
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareResultsProps {
  handleShare: () => void;
}

const ShareResults = ({ handleShare }: ShareResultsProps) => {
  return (
    <>
      <div className="text-center mt-8">
        <p className="text-lg mb-4">Share your results with friends!</p>
        <Button 
          variant="outline" 
          className="border-nescafe-red text-nescafe-red hover:bg-nescafe-red hover:text-white"
          onClick={handleShare}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Results
        </Button>
      </div>

      {/* Back to Home */}
      <div className="text-center mt-10">
        <Link to="/">
          <Button variant="ghost" className="text-nescafe-brown hover:text-nescafe-red">
            ← Back to Home
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ShareResults;
