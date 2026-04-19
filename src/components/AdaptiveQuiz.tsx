import { useState, useEffect, useCallback } from "react";
import type { VocabularyWord, AdaptiveQuestion } from "../types";
import { AdaptiveQuizEngine } from "../utils/adaptiveQuiz";
import { StorageManager } from "../utils/storage";

interface AdaptiveQuizProps {
  allWords: VocabularyWord[];
  onProgressUpdate?: () => void;
}

const TYPE_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  "fill-blank": { label: "Fill in the Blank", icon: "✏️", color: "from-blue-500 to-indigo-600" },
  "translate-en-fr": { label: "Translate to French", icon: "🇫🇷", color: "from-indigo-500 to-purple-600" },
  "translate-fr-en": { label: "What does it mean?", icon: "🇬🇧", color: "from-purple-500 to-pink-600" },
  "error-correction": { label: "Fix the Error", icon: "🔍", color: "from-amber-500 to-orange-600" },
  "listening": { label: "Listening", icon: "🎧", color: "from-green-500 to-emerald-600" },
};

export const AdaptiveQuiz: React.FC<AdaptiveQuizProps> = ({ allWords, onProgressUpdate }) => {
  const [questions, setQuestions] = useState<AdaptiveQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 });
  const [quizComplete, setQuizComplete] = useState(false);
  const [state, setState] = useState(() => AdaptiveQuizEngine.getState());

  const generateQuiz = useCallback(() => {
    const newQuestions = AdaptiveQuizEngine.generateQuizQuestions(allWords, state, 10);
    setQuestions(newQuestions);
    setCurrentIdx(0);
    setSessionScore({ correct: 0, total: 0 });
    setQuizComplete(false);
    setShowResult(false);
    setUserAnswer("");
    setSelectedOption(null);
  }, [allWords, state]);

  useEffect(() => {
    generateQuiz();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Generate once on mount

  const currentQuestion = questions[currentIdx];
  const typeInfo = currentQuestion ? TYPE_LABELS[currentQuestion.type] || TYPE_LABELS["fill-blank"] : null;

  const handleSubmit = () => {
    if (!currentQuestion) return;

    const answer = selectedOption || userAnswer;
    if (!answer.trim()) return;

    const correct = currentQuestion.options
      ? answer === currentQuestion.correctAnswer
      : AdaptiveQuizEngine.checkAnswer(currentQuestion, answer);

    setIsCorrect(correct);
    setShowResult(true);

    // Update adaptive state
    const updatedState = AdaptiveQuizEngine.recordAnswer(
      state,
      correct,
      currentQuestion.category,
      currentQuestion.tense
    );
    setState(updatedState);
    AdaptiveQuizEngine.saveState(updatedState);

    // Update SRS/progress for the word if we can find it
    if (currentQuestion.category) {
      const progress = StorageManager.getProgress();
      // Find matching word
      const matchedWord = allWords.find(
        (w) =>
          w.french === currentQuestion.correctAnswer ||
          w.english === currentQuestion.correctAnswer
      );
      if (matchedWord) {
        const updated = StorageManager.updateCardProgress(progress, matchedWord.id, correct);
        const withStats = StorageManager.updateDailyStats(updated, correct);
        StorageManager.saveProgress(withStats);
        onProgressUpdate?.();
      }
    }

    setSessionScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setQuizComplete(true);
      return;
    }
    setCurrentIdx((prev) => prev + 1);
    setUserAnswer("");
    setSelectedOption(null);
    setShowResult(false);
  };

  const report = AdaptiveQuizEngine.getProgressReport(state);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // QUIZ COMPLETE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (quizComplete) {
    const accuracy = sessionScore.total > 0
      ? Math.round((sessionScore.correct / sessionScore.total) * 100)
      : 0;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">
              {accuracy >= 90 ? "🏆" : accuracy >= 70 ? "🎉" : accuracy >= 50 ? "👍" : "💪"}
            </div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white">
              Quiz Complete!
            </h2>
          </div>

          {/* Score Circle */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <div className={`text-4xl font-black ${accuracy >= 70 ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}>
                {accuracy}%
              </div>
              <p className="text-xs text-slate-500">Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">
                {report.currentLevel}
              </div>
              <p className="text-xs text-slate-500">Current Level</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-slate-600 dark:text-slate-400">
                {report.streak}
              </div>
              <p className="text-xs text-slate-500">Streak</p>
            </div>
          </div>

          {/* Level Feedback */}
          {report.readyForLevelUp && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 text-center">
              <p className="text-green-700 dark:text-green-300 font-bold">
                🚀 Ready for the next level! Your consistency is showing.
              </p>
            </div>
          )}
          {report.needsReinforcement && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 text-center">
              <p className="text-amber-700 dark:text-amber-300 font-bold">
                🔄 Let's reinforce these areas. More practice will help!
              </p>
            </div>
          )}

          {/* Weak Areas */}
          {report.weakAreas.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Areas to Focus On
              </h3>
              <div className="space-y-2">
                {report.weakAreas.slice(0, 5).map((area, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/10 rounded-lg"
                  >
                    <span className="text-sm text-slate-700 dark:text-slate-300">{area.area.replace("cat:", "").replace("tense:", "")}</span>
                    <span className="text-xs font-bold text-red-600 dark:text-red-400">{area.errorRate}% errors</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={generateQuiz}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg"
            >
              🎯 New Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // LOADING / NO QUESTIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (!currentQuestion || !typeInfo) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="text-5xl mb-4">📝</div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Generating Quiz...</h2>
        <button
          onClick={generateQuiz}
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all"
        >
          Start Adaptive Quiz
        </button>
      </div>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ACTIVE QUESTION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${typeInfo.color} rounded-xl flex items-center justify-center text-white text-lg shadow-lg`}>
            🧠
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">
              Adaptive Quiz
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Level: {report.currentLevel} · Q{currentIdx + 1}/{questions.length}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {sessionScore.correct}/{sessionScore.total}
          </p>
          <p className="text-xs text-slate-500">correct</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        {/* Question Type Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">{typeInfo.icon}</span>
          <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
            {typeInfo.label}
          </span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ml-auto ${
            currentQuestion.cefr === "A1" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
            currentQuestion.cefr === "A2" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" :
            currentQuestion.cefr === "B1" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" :
            "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
          }`}>
            {currentQuestion.cefr}
          </span>
        </div>

        {/* Prompt */}
        <p className="text-lg font-semibold text-slate-800 dark:text-white mb-6 leading-relaxed">
          {currentQuestion.prompt}
        </p>

        {/* Answer Area */}
        {currentQuestion.options ? (
          // Multiple Choice
          <div className="grid grid-cols-1 gap-2 mb-4">
            {currentQuestion.options.map((option, i) => {
              const isSelected = selectedOption === option;
              const isAnswer = showResult && option === currentQuestion.correctAnswer;
              const isWrongSelected = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={i}
                  onClick={() => !showResult && setSelectedOption(option)}
                  disabled={showResult}
                  className={`p-3 rounded-xl text-left font-semibold transition-all ${
                    isAnswer
                      ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-800 dark:text-green-200"
                      : isWrongSelected
                      ? "bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-800 dark:text-red-200"
                      : isSelected
                      ? "bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-500 text-indigo-800 dark:text-indigo-200"
                      : "bg-slate-50 dark:bg-slate-700/50 border-2 border-transparent hover:border-indigo-300 dark:hover:border-indigo-600 text-slate-700 dark:text-slate-200"
                  }`}
                >
                  <span className="text-sm text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {option}
                </button>
              );
            })}
          </div>
        ) : (
          // Text Input
          <div className="mb-4">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !showResult && userAnswer.trim()) handleSubmit();
                if (e.key === "Enter" && showResult) handleNext();
              }}
              disabled={showResult}
              placeholder="Type your answer..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
              autoFocus
            />
            {currentQuestion.hint && !showResult && (
              <p className="text-xs text-slate-400 mt-2">
                Hint: starts with "{currentQuestion.hint}..."
              </p>
            )}
          </div>
        )}

        {/* Result Feedback */}
        {showResult && (
          <div
            className={`p-4 rounded-xl mb-4 ${
              isCorrect
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
            }`}
          >
            <p className={`font-bold ${isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
              {isCorrect ? "✓ Correct!" : "✗ Not quite"}
            </p>
            {!isCorrect && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Correct answer: <span className="font-bold">{currentQuestion.correctAnswer}</span>
              </p>
            )}
            {currentQuestion.explanation && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 italic">
                💡 {currentQuestion.explanation}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={!userAnswer.trim() && !selectedOption}
              className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white font-bold rounded-xl transition-all active:scale-95 shadow-md"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all active:scale-95 shadow-md"
            >
              {currentIdx + 1 >= questions.length ? "See Results →" : "Next Question →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
