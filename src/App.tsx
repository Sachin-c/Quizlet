import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { SearchBar } from "./components/SearchBar";
import { StudyView } from "./components/StudyView";
import { QuizView } from "./components/QuizView";
import { VerbStudy } from "./components/VerbStudy";
import { ProgressView } from "./components/ProgressView";
import { Settings } from "./components/Settings";
import { TypingMode } from "./components/TypingMode";
import { SRSStudy } from "./components/SRSStudy";
import { FillBlankMode } from "./components/FillBlankMode";
import { vocabularyData, commonVerbs } from "./data/vocabulary";
import { StorageManager } from "./utils/storage";
import type { UserStats } from "./types";

type ViewType = "study" | "quiz" | "verbs" | "stats" | "settings" | "typing" | "srs" | "fillblank";

function App() {
  const [currentView, setCurrentView] = useState<ViewType>("srs"); // Default to Smart Review
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
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
    // Initialize progress on app load
    refreshStats();
  }, [refreshStats]);

  const handleDataCleared = () => {
    refreshStats();
  };

  // Filter vocabulary based on search term
  const filteredVocabulary =
    searchTerm.trim() === ""
      ? vocabularyData
      : vocabularyData.filter(
          (word) =>
            word.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
            word.english.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <Navigation
        onShowStudy={() => setCurrentView("study")}
        onShowQuiz={() => setCurrentView("quiz")}
        onShowVerbs={() => setCurrentView("verbs")}
        onShowStats={() => setCurrentView("stats")}
        onShowSettings={() => setCurrentView("settings")}
        onShowTyping={() => setCurrentView("typing")}
        onShowSRS={() => setCurrentView("srs")}
        onShowFillBlank={() => setCurrentView("fillblank")}
        activeView={currentView}
        stats={userStats}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="py-6 px-4">
        {(currentView === "study" || currentView === "quiz") && (
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            resultCount={filteredVocabulary.length}
          />
        )}

        {currentView === "srs" && (
          <SRSStudy 
            allWords={vocabularyData}
            onProgressUpdate={refreshStats}
          />
        )}
        {currentView === "fillblank" && (
          <FillBlankMode
            allWords={vocabularyData}
            onProgressUpdate={refreshStats}
          />
        )}
        {currentView === "study" && (
          <StudyView
            key={`study-${refreshKey}`}
            allWords={filteredVocabulary}
          />
        )}
        {currentView === "typing" && (
          <TypingMode key={`typing-${refreshKey}`} allWords={vocabularyData} />
        )}
        {currentView === "quiz" && (
          <QuizView key={`quiz-${refreshKey}`} allWords={filteredVocabulary} />
        )}
        {currentView === "verbs" && (
          <VerbStudy key={`verbs-${refreshKey}`} allWords={commonVerbs} />
        )}
        {currentView === "stats" && (
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
