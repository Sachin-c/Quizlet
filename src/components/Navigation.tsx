import { useState } from "react";
import { StreakDisplay } from "./StreakDisplay";
import { XPDisplay } from "./XPDisplay";
import type { UserStats } from "../types";
import { GamificationManager } from "../utils/gamification";

export interface NavigationProps {
  onShowLearn: () => void;
  onShowPractice: () => void;
  onShowExpress: () => void;
  onShowProgress: () => void;
  onShowSettings: () => void;
  activeView: string;
  stats: UserStats;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

interface NavItem {
  key: string;
  label: string;
  icon: string;
  sublabel: string;
  onClick: () => void;
  gradient: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  onShowLearn,
  onShowPractice,
  onShowExpress,
  onShowProgress,
  onShowSettings,
  activeView,
  stats,
  theme,
  onToggleTheme,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const levelProgress = GamificationManager.getLevelProgress(stats.xp);

  const isActive = (view: string) => activeView === view;

  const navItems: NavItem[] = [
    {
      key: "learn",
      label: "Learn",
      icon: "🧠",
      sublabel: "Study & Acquire",
      onClick: onShowLearn,
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      key: "practice",
      label: "Practice",
      icon: "📝",
      sublabel: "Exam Drills",
      onClick: onShowPractice,
      gradient: "from-cyan-600 to-blue-600",
    },
    {
      key: "express",
      label: "Express",
      icon: "💬",
      sublabel: "Speak & Write",
      onClick: onShowExpress,
      gradient: "from-rose-600 to-pink-600",
    },
    {
      key: "progress",
      label: "Progress",
      icon: "📊",
      sublabel: "Your Stats",
      onClick: onShowProgress,
      gradient: "from-emerald-600 to-teal-600",
    },
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
                <span className="text-xl font-bold tracking-tight text-white">
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
            </div>
          </div>

          {/* Desktop Navigation — Clean 4-item layout */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={item.onClick}
                className={`relative px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
                  isActive(item.key)
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-${item.key === "learn" ? "indigo" : item.key === "practice" ? "cyan" : item.key === "express" ? "rose" : "emerald"}-500/20 scale-105`
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}

            {/* Divider */}
            <div className="w-px h-6 bg-slate-700 mx-1" />

            {/* Settings */}
            <button
              onClick={onShowSettings}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isActive("settings")
                  ? "bg-slate-700 text-white"
                  : "text-slate-500 hover:text-white hover:bg-slate-800"
              }`}
              title="Settings"
            >
              ⚙️
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all duration-200 border border-slate-700 hover:border-slate-600"
              title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>

          {/* Mobile Menu Button + Stats Preview */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="md:hidden">
              <StreakDisplay days={stats.currentStreak} />
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-200 transition-colors text-xl"
            >
              {isMobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden pb-4 flex flex-col gap-2 animate-slide-down bg-slate-900 border-t border-slate-800">
            {/* Stats in mobile menu */}
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg mb-1 mx-1 border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-200">Lvl {stats.level}</span>
                <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${levelProgress.percent}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">{stats.xp} XP</span>
                <button onClick={onToggleTheme} className="p-1 rounded bg-slate-700 text-lg">
                  {theme === "light" ? "🌙" : "☀️"}
                </button>
              </div>
            </div>

            {/* Nav items as cards */}
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  item.onClick();
                  setIsMobileOpen(false);
                }}
                className={`w-full text-left px-4 py-3.5 rounded-xl font-semibold transition-all mx-1 ${
                  isActive(item.key)
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-md`
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <span className="block text-sm font-bold">{item.label}</span>
                    <span className={`block text-xs ${isActive(item.key) ? "text-white/70" : "text-slate-500"}`}>
                      {item.sublabel}
                    </span>
                  </div>
                </div>
              </button>
            ))}

            {/* Settings on mobile */}
            <button
              onClick={() => {
                onShowSettings();
                setIsMobileOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all mx-1 ${
                isActive("settings")
                  ? "bg-slate-700 text-white shadow-md"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="mr-2">⚙️</span>
              Settings
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
