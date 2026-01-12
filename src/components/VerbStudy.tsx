import { useState, useEffect, useMemo } from "react";
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in inputs/selects
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % verbs.length);
      }

      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + verbs.length) % verbs.length);
      }

      if (e.key === " ") {
        e.preventDefault(); // prevent page scroll
        // Optional: flip card OR mark correct
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [verbs.length]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Compact Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
            🔤
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Verb Conjugations
            </h1>
            <p className="text-xs text-gray-500">
              {currentIndex + 1} of {verbs.length} verbs
            </p>
          </div>
        </div>

        {/* Compact Search */}
        <div className="flex-1 max-w-xs">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            resultCount={verbs.length}
          />
        </div>
      </div>

      {verbs.length > 0 && (
        <>
          {/* Slim Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${((currentIndex + 1) / verbs.length) * 100}%` }}
            />
          </div>

          {/* Flashcard */}
          <Flashcard
            word={currentVerb}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        </>
      )}

      {/* Navigation Buttons - Always visible at bottom */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev - 1 + verbs.length) % verbs.length)
          }
          className="flex-1 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all active:scale-95 border border-gray-200 shadow-sm hover:shadow-md"
        >
          ← Previous
        </button>
        <button
          onClick={() =>
            setCurrentIndex(Math.floor(Math.random() * verbs.length))
          }
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-md hover:shadow-lg"
        >
          🔀 Random
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % verbs.length)}
          className="flex-1 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all active:scale-95 border border-gray-200 shadow-sm hover:shadow-md"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
