import { useState, useMemo } from "react";
import type { VocabularyWord } from "../types";
import { Flashcard } from "./Flashcard";
import { SearchBar } from "./SearchBar";
import { StorageManager } from "../utils/storage";

interface VerbStudyProps {
  allWords: VocabularyWord[];
}

export const VerbStudy: React.FC<VerbStudyProps> = ({ allWords }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter only verbs and apply search
  const verbs = useMemo(() => {
    const verbsOnly = allWords.filter((word) => word.isVerb);
    if (searchTerm.trim() === "") return verbsOnly;
    return verbsOnly.filter(
      (word) =>
        word.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.english.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allWords, searchTerm]);

  // Reset index when search changes or if out of bounds
  const safeIndex = Math.min(currentIndex, Math.max(0, verbs.length - 1));

  if (verbs.length === 0) {
    return (
      <>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          resultCount={verbs.length}
        />
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-700 mb-2">
              No verbs yet
            </p>
            <p className="text-gray-500">Check back soon!</p>
          </div>
        </div>
      </>
    );
  }

  const currentVerb = verbs[safeIndex];

  const handleCorrect = () => {
    const progress = StorageManager.getProgress();
    const updated = StorageManager.updateCardProgress(
      progress,
      currentVerb.id,
      true
    );
    const withStats = StorageManager.updateDailyStats(updated, true);
    StorageManager.saveProgress(withStats);
    setCurrentIndex((prev) => (prev + 1) % verbs.length);
  };

  const handleIncorrect = () => {
    const progress = StorageManager.getProgress();
    const updated = StorageManager.updateCardProgress(
      progress,
      currentVerb.id,
      false
    );
    const withStats = StorageManager.updateDailyStats(updated, false);
    StorageManager.saveProgress(withStats);
    setCurrentIndex((prev) => (prev + 1) % verbs.length);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultCount={verbs.length}
      />

      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Verb Conjugations
        </h1>
        <p className="text-gray-600">
          Master French verb conjugations • {currentIndex + 1} of {verbs.length}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-3xl bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / verbs.length) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <Flashcard
        word={currentVerb}
        onCorrect={handleCorrect}
        onIncorrect={handleIncorrect}
      />

      {/* Navigation Buttons */}
      <div className="flex gap-3 w-full max-w-3xl">
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev - 1 + verbs.length) % verbs.length)
          }
          className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-all active:scale-95"
        >
          ← Previous
        </button>
        <button
          onClick={() =>
            setCurrentIndex(Math.floor(Math.random() * verbs.length))
          }
          className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-all active:scale-95"
        >
          🔀 Random
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % verbs.length)}
          className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-all active:scale-95"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
