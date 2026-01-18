
import React from 'react';

interface StreakProps {
  days: number;
}

export const StreakDisplay: React.FC<StreakProps> = ({ days }) => {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full border border-orange-200 cursor-help" title={`You are on a ${days} day streak!`}>
      <span className="text-lg animate-pulse-slow">🔥</span>
      <span className="font-bold text-orange-600">{days}</span>
    </div>
  );
};
