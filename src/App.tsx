import { useState, useEffect } from "react";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { StudyView } from "./components/StudyView";
import { QuizView } from "./components/QuizView";
import { ProgressView } from "./components/ProgressView";
import { Settings } from "./components/Settings";
import { vocabularyData } from "./data/vocabulary";
import { StorageManager } from "./utils/storage";

type ViewType = "study" | "quiz" | "stats" | "settings";

function App() {
  const [currentView, setCurrentView] = useState<ViewType>("study");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Initialize progress on app load
    StorageManager.getProgress();
  }, []);

  const handleDataCleared = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation
        onShowStudy={() => setCurrentView("study")}
        onShowQuiz={() => setCurrentView("quiz")}
        onShowStats={() => setCurrentView("stats")}
        onShowSettings={() => setCurrentView("settings")}
        activeView={currentView}
      />

      <main className="py-8 px-4">
        {currentView === "study" && (
          <StudyView key={`study-${refreshKey}`} allWords={vocabularyData} />
        )}
        {currentView === "quiz" && (
          <QuizView key={`quiz-${refreshKey}`} allWords={vocabularyData} />
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
