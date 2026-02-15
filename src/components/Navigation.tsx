import { useState, useRef, useEffect } from "react";
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
  onShowTranslate: () => void;
  onShowLiveSentences: () => void;
  activeView: string;
  stats: UserStats;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

interface NavItem {
  key: string;
  label: string;
  icon: string;
  onClick: () => void;
  highlight?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  onShowStats,
  onShowStudy,
  onShowQuiz,
  onShowVerbs,
  onShowSettings,
  onShowTyping,
  onShowSRS,
  onShowTranslate,
  onShowLiveSentences,
  activeView,
  stats,
  theme,
  onToggleTheme,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const levelProgress = GamificationManager.getLevelProgress(stats.xp);

  const isActive = (view: string) => activeView === view;

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Primary nav items — always visible on desktop
  const primaryItems: NavItem[] = [
    { key: "srs", label: "Smart", icon: "🧠", onClick: onShowSRS, highlight: true },
    { key: "study", label: "Study", icon: "📚", onClick: onShowStudy },
    { key: "livesentences", label: "Sentences", icon: "🌐", onClick: onShowLiveSentences },
    { key: "translate", label: "Translate", icon: "🔄", onClick: onShowTranslate },
    { key: "quiz", label: "Quiz", icon: "❓", onClick: onShowQuiz },
  ];

  // Secondary nav items — inside "More" dropdown on desktop
  const moreItems: NavItem[] = [
    { key: "typing", label: "Typing Practice", icon: "✍️", onClick: onShowTyping },
    { key: "verbs", label: "Verb Conjugation", icon: "🔤", onClick: onShowVerbs },
    { key: "stats", label: "Progress Stats", icon: "📊", onClick: onShowStats },
  ];

  // All items for mobile menu
  const allItems = [...primaryItems, ...moreItems];

  // Check if any "more" item is currently active
  const moreIsActive = moreItems.some((item) => isActive(item.key));

  const renderNavButton = (item: NavItem, compact = false) => (
    <button
      key={item.key}
      onClick={item.onClick}
      className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
        isActive(item.key)
          ? "bg-blue-600 text-white shadow-lg scale-105"
          : item.highlight
          ? "bg-slate-800 text-slate-200 hover:bg-slate-700 ring-1 ring-slate-700"
          : "text-slate-400 hover:text-white hover:bg-slate-800"
      } ${compact ? "text-xs px-2 py-1" : ""}`}
    >
      {item.icon && <span className="mr-1">{item.icon}</span>}
      {item.label}
    </button>
  );

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

              {/* Theme Toggle */}
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all duration-200 border border-slate-700 hover:border-slate-600"
                title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Primary Items */}
            {primaryItems.map((item) => renderNavButton(item))}

            {/* More Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-1 ${
                  moreIsActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span className="mr-0.5">⋯</span>
                More
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Panel */}
              {isMoreOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-slate-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden animate-slide-down z-50">
                  {moreItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        item.onClick();
                        setIsMoreOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all ${
                        isActive(item.key)
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-slate-700 hover:text-white"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-semibold text-sm">{item.label}</span>
                    </button>
                  ))}

                  {/* Divider */}
                  <div className="border-t border-slate-700" />

                  {/* Settings */}
                  <button
                    onClick={() => {
                      onShowSettings();
                      setIsMoreOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all ${
                      isActive("settings")
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">⚙️</span>
                    <span className="font-semibold text-sm">Settings</span>
                  </button>
                </div>
              )}
            </div>
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
          <div className="lg:hidden pb-3 flex flex-col gap-1 animate-slide-down bg-slate-900 border-t border-slate-800">
            {/* Stats in mobile menu */}
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg mb-2 mx-1 border border-slate-800">
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

            {/* All nav items on mobile */}
            {allItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  item.onClick();
                  setIsMobileOpen(false);
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

            {/* Settings on mobile */}
            <button
              onClick={() => {
                onShowSettings();
                setIsMobileOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                isActive("settings")
                  ? "bg-blue-600 text-white shadow-md mx-1"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white mx-1"
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
