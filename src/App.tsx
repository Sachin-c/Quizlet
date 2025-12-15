import { useState, useEffect } from "react";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { SearchBar } from "./components/SearchBar";
import { StudyView } from "./components/StudyView";
import { QuizView } from "./components/QuizView";
import { VerbStudy } from "./components/VerbStudy";
import { ProgressView } from "./components/ProgressView";
import { Settings } from "./components/Settings";
import { vocabularyData, commonVerbs } from "./data/vocabulary";
import { StorageManager } from "./utils/storage";

type ViewType = "study" | "quiz" | "verbs" | "stats" | "settings";

function App() {
  const [currentView, setCurrentView] = useState<ViewType>("study");
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Initialize progress on app load
    StorageManager.getProgress();
  }, []);

  const handleDataCleared = () => {
    setRefreshKey((prev) => prev + 1);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation
        onShowStudy={() => setCurrentView("study")}
        onShowQuiz={() => setCurrentView("quiz")}
        onShowVerbs={() => setCurrentView("verbs")}
        onShowStats={() => setCurrentView("stats")}
        onShowSettings={() => setCurrentView("settings")}
        activeView={currentView}
      />

      <main className="py-8 px-4">
        {(currentView === "study" || currentView === "quiz") && (
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            resultCount={filteredVocabulary.length}
          />
        )}

        {currentView === "study" && (
          <StudyView
            key={`study-${refreshKey}`}
            allWords={filteredVocabulary}
          />
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
