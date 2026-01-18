import { useState, useEffect, useRef, useCallback } from "react";
import type { VocabularyWord } from "../types";
import { StorageManager } from "../utils/storage";
import { FilterSection } from "./FilterSection";

interface TypingModeProps {
  allWords: VocabularyWord[];
}

type TypingDirection = "english-to-french" | "french-to-english";

export const TypingMode: React.FC<TypingModeProps> = ({ allWords }) => {
  const [filteredWords, setFilteredWords] = useState(allWords);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [direction, setDirection] = useState<TypingDirection>("english-to-french");
  const [streak, setStreak] = useState(0);
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 });
  const [showComplete, setShowComplete] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const currentWord = filteredWords[currentIndex];

  const resetState = () => {
    setUserInput("");
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleFilterChange = useCallback((words: VocabularyWord[]) => {
    setFilteredWords(words);
    setCurrentIndex(0);
    resetState();
    setShowComplete(false);
    setSessionScore({ correct: 0, total: 0 });
  }, []);

  // End session if all words done
  useEffect(() => {
     if (sessionScore.total > 0 && sessionScore.total >= filteredWords.length) {
         setShowComplete(true);
     }
  }, [sessionScore.total, filteredWords.length]);


  // Focus input on mount and word change
  useEffect(() => {
    if (inputRef.current && !showResult && !showComplete) {
      inputRef.current.focus();
    }
  }, [currentIndex, showResult, showComplete]);

  // Normalize text for comparison
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/'/g, "'")
      .replace(/`/g, "'")
      .replace(/\s+/g, " ");
  };

  // Check if answer is correct
  const checkAnswer = (input: string, expected: string): boolean => {
    const normalizedInput = normalizeText(input);
    const normalizedExpected = normalizeText(expected);

    if (normalizedInput === normalizedExpected) return true;

    const stripAccents = (str: string) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return stripAccents(normalizedInput) === stripAccents(normalizedExpected);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord || showResult) return;

    // Use current settings
    const expectedAnswer =
      direction === "english-to-french"
        ? currentWord.french
        : currentWord.english;

    const correct = checkAnswer(userInput, expectedAnswer);
    setIsCorrect(correct);
    setShowResult(true);

    // Update progress
    const progress = StorageManager.getProgress();
    const updated = StorageManager.updateCardProgress(
      progress,
      currentWord.id,
      correct
    );
    const withStats = StorageManager.updateDailyStats(updated, correct);
    StorageManager.saveProgress(withStats);

    // Update session stats
    setSessionScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));

    if (correct) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex >= filteredWords.length - 1) {
        setShowComplete(true);
    } else {
        resetState();
        setCurrentIndex((prev) => prev + 1);
    }
  };
  
  const resetSession = () => {
      setSessionScore({ correct: 0, total: 0 });
      setShowComplete(false);
      setCurrentIndex(0);
      resetState();
      setStreak(0);
  };

  const handleSkip = () => {
    handleNext();
  };





  // --------------------------------------------------------------------------
  // RENDER: Completion Screen
  // --------------------------------------------------------------------------
  if (showComplete) {
    const accuracy = sessionScore.total > 0 
        ? Math.round((sessionScore.correct / sessionScore.total) * 100) 
        : 0;
        
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center animate-slide-up border border-slate-200 dark:border-slate-700">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100">Practice Complete!</h2>
          <div className="flex justify-center gap-4 my-6">
            <div className="text-center">
                <div className="text-3xl font-bold text-amber-500 dark:text-amber-400">+{sessionScore.correct * 10}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">XP Earned</div>
            </div>
            <div className="text-center md:border-l md:border-slate-100 dark:md:border-slate-700 md:pl-4">
                 <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{accuracy}%</div>
                 <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Accuracy</div>
            </div>
          </div>
          <button
            onClick={resetSession}
            className="w-full py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all"
          >
            Practice Again
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: Empty State
  // --------------------------------------------------------------------------
  if (filteredWords.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <FilterSection words={allWords} onFilterChange={handleFilterChange} />
        <div className="text-center bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-10 border border-slate-200 dark:border-slate-700">
          <div className="text-5xl mb-4 opacity-60">✍️</div>
          <p className="text-slate-700 dark:text-slate-200 text-lg font-semibold mb-2">
            No words to practice
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Try adjusting your filters.
          </p>
        </div>
      </div>
    );
  }

  const questionText =
    direction === "english-to-french"
      ? currentWord?.english
      : currentWord?.french;

  const answerText =
    direction === "english-to-french"
      ? currentWord?.french
      : currentWord?.english;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <FilterSection words={allWords} onFilterChange={handleFilterChange} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-lg shadow-sm">
            ✍️
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">Typing Practice</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {direction === "english-to-french" ? "English → French" : "French → English"} • {currentIndex + 1} of {filteredWords.length}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
           {streak > 0 && (
            <div className="flex items-center gap-1 text-orange-500 font-bold animate-pulse">
              🔥 {streak}
            </div>
          )}
          <div className="flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
             <span className="font-bold text-emerald-600 dark:text-emerald-400">{sessionScore.correct}</span>
             <span className="text-slate-400">/</span>
             <span className="text-slate-600 dark:text-slate-300">{sessionScore.total}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-emerald-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / filteredWords.length) * 100}%` }}
        />
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 transition-colors">
        {/* Question */}
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-wide">
            {direction === "english-to-french" ? "Type in French" : "Type in English"}
          </p>

          <p className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 mb-4">{questionText}</p>

          {/* Toggle Direction (Small link) */}
          <button 
            onClick={() => {
                setDirection(prev => prev === "english-to-french" ? "french-to-english" : "english-to-french");
                resetState();
            }}
            className="text-xs text-blue-500 hover:underline"
          >
            Switch Direction
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={showResult}
              placeholder={
                direction === "english-to-french"
                  ? "Tapez en français..."
                  : "Type in English..."
              }
              className={`w-full px-6 py-4 text-xl text-center rounded-xl border-2 transition-all outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 ${
                showResult
                  ? isCorrect
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              }`}
              autoComplete="off"
            />
          </div>

          {/* Result Display */}
          {showResult && (
            <div className={`p-4 rounded-xl animate-scale-in text-center ${
                isCorrect 
                ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800" 
                : "bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800"
            }`}>
              {isCorrect ? (
                <div>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                    🎉 Correct!
                  </p>
                </div>
              ) : (
                <div>
                   <p className="text-red-500 dark:text-red-400 font-bold mb-1">Incorrect</p>
                   <p className="text-sm text-slate-500 dark:text-slate-400">The answer was:</p>
                   <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{answerText}</p>
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            {!showResult ? (
              <>
                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 font-bold rounded-xl transition-all"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  className="flex-[2] px-4 py-3 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
                >
                  Check Answer
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                ref={(btn) => btn?.focus()} 
                className="w-full px-4 py-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
              >
                {currentIndex >= filteredWords.length - 1 ? "Finish" : "Next Word →"}
              </button>
            )}
          </div>
        </form>
        
        {/* Hint */}
        {showResult && (
             <p className="text-center text-xs text-slate-400 mt-4 animate-pulse">
                Press Enter ↵ to continue
             </p>
        )}
      </div>
    </div>
  );
};
