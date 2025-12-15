import { useState, useEffect, useCallback } from "react";
import type { VocabularyWord } from "../types";
import { StorageManager } from "../utils/storage";
import { Flashcard } from "./Flashcard";
import { FilterSection } from "./FilterSection";

interface StudyViewProps {
  allWords: VocabularyWord[];
}

export const StudyView: React.FC<StudyViewProps> = ({ allWords }) => {
  const [filteredWords, setFilteredWords] = useState(allWords);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentWord = filteredWords[currentIndex];

  useEffect(() => {
    // Component mounted, silence logs
  }, [currentIndex, currentWord, filteredWords.length]);

  const handleFilterChange = useCallback((words: VocabularyWord[]) => {
    setFilteredWords(words);
    setCurrentIndex(0);
  }, []);

  const handleCorrect = () => {
    if (currentWord) {
      const currentProgress = StorageManager.getProgress();
      const updatedProgress = StorageManager.updateCardProgress(
        currentProgress,
        currentWord.id,
        true
      );
      const updatedProgress2 = StorageManager.updateDailyStats(
        updatedProgress,
        true
      );
      StorageManager.saveProgress(updatedProgress2);
    }

    setCurrentIndex((currentIndex + 1) % filteredWords.length);
  };

  const handleIncorrect = () => {
    if (currentWord) {
      const currentProgress = StorageManager.getProgress();
      const updatedProgress = StorageManager.updateCardProgress(
        currentProgress,
        currentWord.id,
        false
      );
      const updatedProgress2 = StorageManager.updateDailyStats(
        updatedProgress,
        false
      );
      StorageManager.saveProgress(updatedProgress2);
    }

    setCurrentIndex((currentIndex + 1) % filteredWords.length);
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
        setCurrentIndex((prev) => (prev + 1) % filteredWords.length);
      }

      if (e.key === "ArrowLeft") {
        setCurrentIndex(
          (prev) => (prev - 1 + filteredWords.length) % filteredWords.length
        );
      }

      if (e.key === " ") {
        e.preventDefault(); // prevent page scroll
        // Optional: flip card OR mark correct
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredWords.length]);
  if (filteredWords.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <FilterSection words={allWords} onFilterChange={setFilteredWords} />
        <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-12 border-2 border-blue-200">
          <div className="text-6xl mb-4 opacity-50">🔍</div>
          <p className="text-gray-600 text-xl font-semibold mb-2">
            No words match your filters
          </p>
          <p className="text-gray-500">
            Try adjusting your difficulty level or category selection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <FilterSection words={allWords} onFilterChange={handleFilterChange} />

      {/* Study Container */}
      <div className="bg-white rounded-2xl shadow-lg p-8 card-shadow">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-black text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Card {currentIndex + 1} of {filteredWords.length}
              </h3>
            </div>
            <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
              {Math.round(((currentIndex + 1) / filteredWords.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full transition-all duration-500 ease-out progress-fill"
              style={{
                width: `${((currentIndex + 1) / filteredWords.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Flashcard */}
        {currentWord && (
          <Flashcard
            word={currentWord}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
            isLoading={false}
          />
        )}
      </div>
      <div className="flex justify-center mt-6">
        <div className="flex gap-3 w-full max-w-3xl">
          <button
            onClick={() =>
              setCurrentIndex(
                (prev) =>
                  (prev - 1 + filteredWords.length) % filteredWords.length
              )
            }
            className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-all active:scale-95"
          >
            ← Previous
          </button>

          <button
            onClick={() =>
              setCurrentIndex(Math.floor(Math.random() * filteredWords.length))
            }
            className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-all active:scale-95"
          >
            🔀 Random
          </button>

          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % filteredWords.length)
            }
            className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-all active:scale-95"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};
