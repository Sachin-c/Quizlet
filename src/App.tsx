import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { LearnHub } from "./components/LearnHub";
import { PracticeHub } from "./components/PracticeHub";
import { ExpressHub } from "./components/ExpressHub";
import { ProgressView } from "./components/ProgressView";
import { Settings } from "./components/Settings";
import { vocabularyData } from "./data/vocabulary";
import { StorageManager } from "./utils/storage";
import type { UserStats } from "./types";

/**
 * App Layout — 4 core modes mapped to TEF/TCF exam structure:
 *
 *  🧠 Learn    → Pre-exam study (SRS, Flashcards, Verb Tenses, Conjugations)
 *  📝 Practice → TCF: Lexique & Structure + Compréhension (Adaptive, Sentences, Quiz, Typing)
 *  💬 Express  → TCF: Expression Orale + Écrite (Conversations, Translation)
 *  📊 Progress → Dashboard & Stats
 */

type ViewType = "learn" | "practice" | "express" | "progress" | "settings";

function App() {
  const [currentView, setCurrentView] = useState<ViewType>("learn");
  const [refreshKey, setRefreshKey] = useState(0);
  const [userStats, setUserStats] = useState<UserStats>(() => StorageManager.getProgress().stats);

  // Theme State
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" ||
             (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
             ? "dark" : "light";
    }
    return "light";
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  // Apply Theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const refreshStats = useCallback(() => {
    setUserStats(StorageManager.getProgress().stats);
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  const handleDataCleared = () => {
    refreshStats();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <Navigation
        onShowLearn={() => setCurrentView("learn")}
        onShowPractice={() => setCurrentView("practice")}
        onShowExpress={() => setCurrentView("express")}
        onShowProgress={() => setCurrentView("progress")}
        onShowSettings={() => setCurrentView("settings")}
        activeView={currentView}
        stats={userStats}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="py-6 px-4">
        {currentView === "learn" && (
          <LearnHub
            allWords={vocabularyData}
            onProgressUpdate={refreshStats}
            refreshKey={refreshKey}
          />
        )}
        {currentView === "practice" && (
          <PracticeHub
            allWords={vocabularyData}
            onProgressUpdate={refreshStats}
            refreshKey={refreshKey}
          />
        )}
        {currentView === "express" && (
          <ExpressHub />
        )}
        {currentView === "progress" && (
          <ProgressView key={`stats-${refreshKey}`} allWords={vocabularyData} />
        )}
        {currentView === "settings" && (
          <Settings
            key={`settings-${refreshKey}`}
            onDataCleared={handleDataCleared}
          />
        )}
      </main>
    </div>
  );
}

export default App;
