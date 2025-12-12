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
    </div>
  );
};
