import { useState } from "react";
import { StreakDisplay } from "./StreakDisplay";
import { XPDisplay } from "./XPDisplay";
import type { UserStats } from "../types";
import { GamificationManager } from "../utils/gamification";

export interface NavigationProps {
  onShowStats: () => void;
  onShowStudy: () => void;
  onShowQuiz: () => void;
  onShowVerbs: () => void;
  onShowSettings: () => void;
  onShowTyping: () => void;
  onShowSRS: () => void;
  onShowFillBlank: () => void;
  activeView: string;
  stats: UserStats;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onShowStats,
  onShowStudy,
  onShowQuiz,
  onShowVerbs,
  onShowSettings,
  onShowTyping,
  onShowSRS,
  onShowFillBlank,
  activeView,
  stats,
  theme,
  onToggleTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const levelProgress = GamificationManager.getLevelProgress(stats.xp);

  const isActive = (view: string) => activeView === view;

  const navItems = [
    { key: "srs", label: "Smart", icon: "🧠", onClick: onShowSRS, highlight: true },
    { key: "study", label: "Study", icon: "📚", onClick: onShowStudy },
    { key: "typing", label: "Type", icon: "✍️", onClick: onShowTyping },
    { key: "fillblank", label: "Sentences", icon: "📝", onClick: onShowFillBlank },
    { key: "quiz", label: "Quiz", icon: "❓", onClick: onShowQuiz },
    { key: "verbs", label: "Verbs", icon: "🔤", onClick: onShowVerbs },
    { key: "stats", label: "Stats", icon: "📊", onClick: onShowStats },
    { key: "settings", label: "⚙️", icon: "", onClick: onShowSettings },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Gamification Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                🇫🇷
              </span>
              <div className="hidden lg:block">
                <span className="text-xl font-bold tracking-tight text-white dark:text-slate-100">
                  FrenchVocab
                </span>
              </div>
            </div>

            {/* Gamification Stats (Visible on desktop) */}
            <div className="hidden md:flex items-center gap-4 pl-4 border-l border-slate-700">
              <StreakDisplay days={stats.currentStreak} />
              <XPDisplay 
                xp={stats.xp} 
                level={stats.level} 
                progressPercent={levelProgress.percent} 
              />
              
              {/* Theme Toggle */}
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all duration-200 border border-slate-700 hover:border-slate-600"
                title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={item.onClick}
                className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  isActive(item.key)
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : item.highlight
                    ? "bg-slate-800 text-slate-200 hover:bg-slate-700 ring-1 ring-slate-700"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button + Stats Preview */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="md:hidden">
              <StreakDisplay days={stats.currentStreak} />
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-200 transition-colors text-xl"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-3 flex flex-col gap-1 animate-slide-down bg-slate-900 border-t border-slate-800">
            {/* Stats in mobile menu */}
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg mb-2 mx-1 border border-slate-800">
                 <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-200">Lvl {stats.level}</span>
                    <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all" style={{width: `${levelProgress.percent}%`}} />
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">{stats.xp} XP</span>
                     <button
                        onClick={onToggleTheme}
                        className="p-1 rounded bg-slate-700 text-lg"
                      >
                        {theme === 'light' ? '🌙' : '☀️'}
                      </button>
                 </div>
            </div>

            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                  isActive(item.key)
                    ? "bg-blue-600 text-white shadow-md mx-1"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white mx-1"
                }`}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
