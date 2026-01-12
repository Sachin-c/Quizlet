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
      <div className="max-w-4xl mx-auto space-y-6">
        <FilterSection words={allWords} onFilterChange={setFilteredWords} />
        <div className="text-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-lg p-10 border border-indigo-100">
          <div className="text-5xl mb-4 opacity-60">🔍</div>
          <p className="text-gray-700 text-lg font-semibold mb-2">
            No words match your filters
          </p>
          <p className="text-gray-500 text-sm">
            Try adjusting your difficulty level or category selection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <FilterSection words={allWords} onFilterChange={handleFilterChange} />

      {/* Study Container */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/80">
        {/* Progress Bar */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-sm text-gray-600">
              Card{" "}
              <span className="text-gradient font-black">
                {currentIndex + 1}
              </span>{" "}
              of {filteredWords.length}
            </h3>
            <span className="text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 px-2.5 py-1 rounded-full">
              {Math.round(((currentIndex + 1) / filteredWords.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
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

      {/* Navigation Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() =>
            setCurrentIndex(
              (prev) =>
                (prev - 1 + filteredWords.length) % filteredWords.length
            )
          }
          className="flex-1 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all active:scale-95 border border-gray-200 shadow-sm hover:shadow-md"
        >
          ← Previous
        </button>

        <button
          onClick={() =>
            setCurrentIndex(Math.floor(Math.random() * filteredWords.length))
          }
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-md hover:shadow-lg"
        >
          🔀 Random
        </button>

        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev + 1) % filteredWords.length)
          }
          className="flex-1 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all active:scale-95 border border-gray-200 shadow-sm hover:shadow-md"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
