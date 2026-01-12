import { useState, useEffect, useMemo } from "react";
import type { VocabularyWord } from "../types";
import { StorageManager } from "../utils/storage";
import { SRSManager } from "../utils/srs";
import { getFrenchPhonetics } from "../utils/phonetics";

interface SRSStudyProps {
  allWords: VocabularyWord[];
}

export const SRSStudy: React.FC<SRSStudyProps> = ({ allWords }) => {
  const [studyQueue, setStudyQueue] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });
  const [showComplete, setShowComplete] = useState(false);

  // Get SRS stats
  const srsStats = useMemo(() => {
    const progress = StorageManager.getProgress();
    return SRSManager.getStats(progress.wordProgress);
  }, [studyQueue.length]);

  // Initialize study queue
  useEffect(() => {
    refreshQueue();
  }, [allWords]);

  const refreshQueue = () => {
    const progress = StorageManager.getProgress();
    const queue = StorageManager.getSRSStudyQueue(allWords, progress, 20);
    setStudyQueue(queue);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowComplete(false);
    setSessionStats({ correct: 0, incorrect: 0 });
  };

  const currentWord = studyQueue[currentIndex];

  const handleAnswer = (isCorrect: boolean, wasHard: boolean = false) => {
    if (!currentWord) return;

    // Update progress with SRS
    const progress = StorageManager.getProgress();
    const updated = StorageManager.updateCardProgress(
      progress,
      currentWord.id,
      isCorrect,
      wasHard
    );
    const withStats = StorageManager.updateDailyStats(updated, isCorrect);
    StorageManager.saveProgress(withStats);

    // Update session stats
    setSessionStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
    }));

    // Move to next card
    if (currentIndex < studyQueue.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      setShowComplete(true);
    }
  };

  const speak = (text: string, lang: string = "fr-FR") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === " ") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
      if (e.key === "1" && isFlipped) handleAnswer(false);
      if (e.key === "2" && isFlipped) handleAnswer(true, true);
      if (e.key === "3" && isFlipped) handleAnswer(true, false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped, currentIndex]);

  // Session complete screen
  if (showComplete) {
    const totalCards = sessionStats.correct + sessionStats.incorrect;
    const accuracy = totalCards > 0 ? Math.round((sessionStats.correct / totalCards) * 100) : 0;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/80">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-black text-gradient mb-2">Session Complete!</h2>
          <p className="text-gray-600 mb-6">Great work on your French practice!</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
              <p className="text-3xl font-black text-emerald-600">{sessionStats.correct}</p>
              <p className="text-xs text-gray-500">Correct</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
              <p className="text-3xl font-black text-red-600">{sessionStats.incorrect}</p>
              <p className="text-xs text-gray-500">Review</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
              <p className="text-3xl font-black text-indigo-600">{accuracy}%</p>
              <p className="text-xs text-gray-500">Accuracy</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6 border border-indigo-100">
            <p className="text-sm font-semibold text-gray-600 mb-2">📊 Your Progress</p>
            <div className="flex justify-around text-sm">
              <div>
                <span className="font-bold text-orange-600">{srsStats.dueNow}</span> due now
              </div>
              <div>
                <span className="font-bold text-blue-600">{srsStats.learning}</span> learning
              </div>
              <div>
                <span className="font-bold text-emerald-600">{srsStats.mastered}</span> mastered
              </div>
            </div>
          </div>

          <button
            onClick={refreshQueue}
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  // No cards due
  if (studyQueue.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/80">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-2xl font-black text-gradient mb-2">All Caught Up!</h2>
          <p className="text-gray-600 mb-6">
            No cards are due for review right now.
          </p>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6 border border-indigo-100">
            <p className="text-sm text-gray-600">
              <span className="font-bold text-indigo-600">{srsStats.dueTomorrow}</span> cards due tomorrow •
              <span className="font-bold text-blue-600 mx-1">{srsStats.dueThisWeek}</span> this week
            </p>
          </div>

          <p className="text-sm text-gray-500">
            Come back later or try the regular Study mode to learn new words!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-white/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
            🧠
          </div>
          <div>
            <h1 className="text-xl font-black text-gradient">Smart Review</h1>
            <p className="text-xs text-gray-500">
              Spaced repetition • {currentIndex + 1} of {studyQueue.length}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-emerald-600 font-bold">{sessionStats.correct}</span>
            <span className="text-gray-400">✓</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-red-600 font-bold">{sessionStats.incorrect}</span>
            <span className="text-gray-400">✗</span>
          </div>
          <div className="px-2 py-1 bg-orange-100 rounded-full text-orange-700 text-xs font-bold">
            {srsStats.dueNow} due
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / studyQueue.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div
        onClick={() => !isFlipped && setIsFlipped(true)}
        className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 min-h-[300px] flex flex-col items-center justify-center border border-white/80 transition-all cursor-pointer ${
          !isFlipped ? "hover:shadow-2xl hover:scale-[1.01]" : ""
        }`}
      >
        {!isFlipped ? (
          // Front of card
          <div className="text-center">
            {currentWord?.imageUrl && (
              <div className="text-6xl mb-4">{currentWord.imageUrl}</div>
            )}
            <p className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">
              What's the English?
            </p>
            <p className="text-5xl font-black text-gray-900 mb-2">
              {currentWord?.french}
            </p>
            <p className="text-lg text-gray-500 italic mb-4">
              /{getFrenchPhonetics(currentWord?.french || "")}/
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                speak(currentWord?.french || "", "fr-FR");
              }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
            >
              🔊 Listen
            </button>
            <p className="text-xs text-gray-400 mt-4">
              Click or press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded">Space</kbd> to reveal
            </p>
          </div>
        ) : (
          // Back of card
          <div className="text-center w-full">
            <p className="text-sm font-semibold text-emerald-500 mb-2 uppercase tracking-wide">
              ✓ Answer
            </p>
            <p className="text-4xl font-black text-gray-900 mb-2">
              {currentWord?.english}
            </p>
            <p className="text-xl text-gray-600 mb-2">
              {currentWord?.french}
            </p>

            {/* Example sentence */}
            {currentWord?.exampleFrench && (
              <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <p className="text-sm font-semibold text-gray-600 mb-1">Example:</p>
                <p className="text-sm text-gray-800 italic">
                  "{currentWord.exampleFrench}"
                </p>
                {currentWord.exampleEnglish && (
                  <p className="text-sm text-gray-500 mt-1">
                    "{currentWord.exampleEnglish}"
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Answer Buttons */}
      {isFlipped && (
        <div className="grid grid-cols-3 gap-3 animate-slide-up">
          <button
            onClick={() => handleAnswer(false)}
            className="px-4 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            <div className="text-2xl mb-1">😅</div>
            <div className="text-sm">Again</div>
            <div className="text-xs opacity-70">Press 1</div>
          </button>
          <button
            onClick={() => handleAnswer(true, true)}
            className="px-4 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            <div className="text-2xl mb-1">🤔</div>
            <div className="text-sm">Hard</div>
            <div className="text-xs opacity-70">Press 2</div>
          </button>
          <button
            onClick={() => handleAnswer(true, false)}
            className="px-4 py-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            <div className="text-2xl mb-1">😊</div>
            <div className="text-sm">Easy</div>
            <div className="text-xs opacity-70">Press 3</div>
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-xs text-gray-400">
        💡 Cards you get wrong will appear more often. Easy cards appear less frequently.
      </div>
    </div>
  );
};
