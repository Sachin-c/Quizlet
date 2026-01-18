import React from 'react';

interface XPProps {
  xp: number;
  level: number;
  progressPercent: number;
}

export const XPDisplay: React.FC<XPProps> = ({ xp, level, progressPercent }) => {
  return (
    <div className="flex items-center gap-3">
        {/* Level Badge */}
      <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full border border-violet-200">
        <span className="text-sm font-bold text-violet-700">Lvl {level}</span>
      </div>

      {/* Progress Bar (Hidden on mobile) */}
      <div className="hidden sm:block w-24 h-2.5 bg-violet-100 rounded-full overflow-hidden border border-violet-100 relative group">
        <div 
          className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
        {/* Tooltip */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
           {xp} Total XP
        </div>
      </div>
    </div>
  );
};
