import React from 'react';
import { Brain } from 'lucide-react';

const Stats = ({ level, highScore, accentColor }) => {
  return (
    <div className="flex justify-around items-center bg-gray-800 p-4 rounded-xl shadow-2xl mb-8 border border-purple-500/50">
      <div className="flex flex-col items-center">
        <div className="text-4xl font-extrabold text-orange-400">{level === 0 ? "TUT" : level}</div>
        <div className="text-sm text-gray-400">Current Level</div>
      </div>
      <div className="flex flex-col items-center">
        <Brain className={`h-6 w-6 ${accentColor}`} />
        <div className="text-4xl font-extrabold text-green-500">{highScore}</div>
        <div className="text-sm text-gray-400">High Score</div>
      </div>
    </div>
  );
};

export default Stats;