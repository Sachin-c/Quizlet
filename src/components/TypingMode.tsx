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
  const inputRef = useRef<HTMLInputElement>(null);

  const currentWord = filteredWords[currentIndex];

  const handleFilterChange = useCallback((words: VocabularyWord[]) => {
    setFilteredWords(words);
    setCurrentIndex(0);
    resetState();
  }, []);

  const resetState = () => {
    setUserInput("");
    setShowResult(false);
    setIsCorrect(false);
  };

  // Focus input on mount and word change
  useEffect(() => {
    if (inputRef.current && !showResult) {
      inputRef.current.focus();
    }
  }, [currentIndex, showResult]);

  // Normalize text for comparison (handle accents and special chars)
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      // Replace common alternative characters
      .replace(/'/g, "'")
      .replace(/`/g, "'")
      // Normalize spaces
      .replace(/\s+/g, " ");
  };

  // Check if answer is correct (with some flexibility)
  const checkAnswer = (input: string, expected: string): boolean => {
    const normalizedInput = normalizeText(input);
    const normalizedExpected = normalizeText(expected);

    // Exact match
    if (normalizedInput === normalizedExpected) return true;

    // Check without accents (be lenient)
    const stripAccents = (str: string) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (stripAccents(normalizedInput) === stripAccents(normalizedExpected)) {
      return true;
    }

    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord || showResult) return;

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
    resetState();
    setCurrentIndex((prev) => (prev + 1) % filteredWords.length);
  };

  const handleSkip = () => {
    resetState();
    setCurrentIndex((prev) => (prev + 1) % filteredWords.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && showResult) {
      handleNext();
    }
  };

  // Speak the word
  const speak = (text: string, lang: string = "fr-FR") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  if (filteredWords.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <FilterSection words={allWords} onFilterChange={handleFilterChange} />
        <div className="text-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-lg p-10 border border-indigo-100">
          <div className="text-5xl mb-4 opacity-60">✍️</div>
          <p className="text-gray-700 text-lg font-semibold mb-2">
            No words to practice
          </p>
          <p className="text-gray-500 text-sm">
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
    <div className="max-w-4xl mx-auto space-y-5">
      <FilterSection words={allWords} onFilterChange={handleFilterChange} />

      {/* Header with Mode Toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-white/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
            ✍️
          </div>
          <div>
            <h1 className="text-xl font-black text-gradient">Typing Practice</h1>
            <p className="text-xs text-gray-500">
              Type to reinforce memory • {currentIndex + 1} of {filteredWords.length}
            </p>
          </div>
        </div>

        {/* Direction Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDirection("english-to-french")}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              direction === "english-to-french"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🇬🇧 → 🇫🇷
          </button>
          <button
            onClick={() => setDirection("french-to-english")}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              direction === "french-to-english"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🇫🇷 → 🇬🇧
          </button>
        </div>

        {/* Session Stats */}
        <div className="flex items-center gap-4 text-sm">
          {streak > 0 && (
            <div className="flex items-center gap-1 text-orange-600 font-bold animate-pulse">
              🔥 {streak}
            </div>
          )}
          <div className="text-gray-600">
            <span className="font-bold text-emerald-600">{sessionScore.correct}</span>
            <span className="mx-1">/</span>
            <span>{sessionScore.total}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / filteredWords.length) * 100}%` }}
        />
      </div>

      {/* Main Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/80">
        {/* Question */}
        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">
            {direction === "english-to-french" ? "Type in French" : "Type in English"}
          </p>

          {/* Show emoji if available */}
          {currentWord?.imageUrl && (
            <div className="text-5xl mb-3">{currentWord.imageUrl}</div>
          )}

          <p className="text-4xl font-black text-gray-900 mb-2">{questionText}</p>

          {/* Play audio button */}
          {direction === "french-to-english" && (
            <button
              onClick={() => speak(currentWord?.french || "", "fr-FR")}
              className="mt-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
            >
              🔊 Listen
            </button>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={showResult}
              placeholder={
                direction === "english-to-french"
                  ? "Tapez en français..."
                  : "Type in English..."
              }
              className={`w-full px-6 py-4 text-xl text-center rounded-xl border-2 transition-all focus:outline-none ${
                showResult
                  ? isCorrect
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-red-400 bg-red-50"
                  : "border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              }`}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />

            {/* Result Icon */}
            {showResult && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl">
                {isCorrect ? "✅" : "❌"}
              </div>
            )}
          </div>

          {/* Result Display */}
          {showResult && (
            <div
              className={`p-4 rounded-xl animate-slide-up ${
                isCorrect
                  ? "bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200"
                  : "bg-gradient-to-r from-red-50 to-orange-50 border border-red-200"
              }`}
            >
              {isCorrect ? (
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-700 mb-1">
                    🎉 Correct!
                  </p>
                  <p className="text-sm text-gray-600">
                    {answerText}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-lg font-bold text-red-700 mb-1">
                    Not quite right
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Your answer: <span className="line-through">{userInput}</span>
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    Correct: <span className="text-emerald-600">{answerText}</span>
                  </p>
                  {direction === "english-to-french" && (
                    <button
                      type="button"
                      onClick={() => speak(answerText!, "fr-FR")}
                      className="mt-2 px-3 py-1 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600"
                    >
                      🔊 Hear pronunciation
                    </button>
                  )}
                </div>
              )}

              {/* Example sentence if available */}
              {currentWord?.exampleFrench && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 uppercase mb-1">Example</p>
                  <p className="text-sm text-gray-800 italic">
                    "{currentWord.exampleFrench}"
                  </p>
                  {currentWord.exampleEnglish && (
                    <p className="text-sm text-gray-500">
                      "{currentWord.exampleEnglish}"
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Submit / Next Buttons */}
          <div className="flex gap-3">
            {!showResult ? (
              <>
                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  className="flex-[2] px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Check Answer
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                Next Word →
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Keyboard hint */}
      <div className="text-center text-xs text-gray-400">
        💡 Tip: Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">Enter</kbd> to submit or continue
      </div>
    </div>
  );
};
