import { useState, useEffect, useCallback } from "react";
import type { VocabularyWord } from "../types";
import { StorageManager } from "../utils/storage";
import { FilterSection } from "./FilterSection";

interface QuizViewProps {
  allWords: VocabularyWord[];
}

interface QuizQuestion {
  correct: VocabularyWord;
  options: VocabularyWord[]; // 4 options including the correct one
}

export const QuizView: React.FC<QuizViewProps> = ({ allWords }) => {
  const [filteredWords, setFilteredWords] = useState(allWords);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  // Generate quiz questions
  useEffect(() => {
    if (filteredWords.length < 2) return;

    // Shuffle filtered words and pick random 10
    const shuffled = [...filteredWords].sort(() => Math.random() - 0.5);
    const selectedWords = shuffled.slice(0, Math.min(10, shuffled.length));

    const newQuestions: QuizQuestion[] = selectedWords.map((word) => {
      // Get wrong answers from same category for increased complexity
      let wrongAnswers = filteredWords
        .filter((w) => w.id !== word.id && w.category === word.category)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      // If not enough same-category words, fill with random words
      if (wrongAnswers.length < 3) {
        const remaining = 3 - wrongAnswers.length;
        const additionalAnswers = filteredWords
          .filter(
            (w) =>
              w.id !== word.id &&
              w.category !== word.category &&
              !wrongAnswers.includes(w)
          )
          .sort(() => Math.random() - 0.5)
          .slice(0, remaining);
        wrongAnswers = [...wrongAnswers, ...additionalAnswers];
      }

      // Shuffle options
      const options = [word, ...wrongAnswers].sort(() => Math.random() - 0.5);

      return { correct: word, options };
    });

    // setQuestions in effect is acceptable for quiz initialization
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
  }, [filteredWords]);

  const handleFilterChange = useCallback((words: VocabularyWord[]) => {
    setFilteredWords(words);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (selectedWord: VocabularyWord) => {
    setSelectedAnswer(selectedWord.id);
    setAnswered(true);

    if (selectedWord.id === currentQuestion.correct.id) {
      setScore(score + 1);
      // Record correct answer in progress
      const currentProgress = StorageManager.getProgress();
      const updatedProgress = StorageManager.updateCardProgress(
        currentProgress,
        currentQuestion.correct.id,
        true
      );
      const updatedProgress2 = StorageManager.updateDailyStats(
        updatedProgress,
        true
      );
      StorageManager.saveProgress(updatedProgress2);
    } else {
      // Record incorrect answer
      const currentProgress = StorageManager.getProgress();
      const updatedProgress = StorageManager.updateCardProgress(
        currentProgress,
        currentQuestion.correct.id,
        false
      );
      const updatedProgress2 = StorageManager.updateDailyStats(
        updatedProgress,
        false
      );
      StorageManager.saveProgress(updatedProgress2);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      // Quiz complete
      alert(
        `Quiz Complete! You scored ${score}/${questions.length} (${Math.round(
          (score / questions.length) * 100
        )}%)`
      );
      setCurrentQuestionIndex(0);
      setScore(0);
      setAnswered(false);
      setSelectedAnswer(null);
    }
  };

  if (questions.length === 0 || !currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <FilterSection words={allWords} onFilterChange={handleFilterChange} />
        <div className="text-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-12 border border-indigo-200">
          <div className="text-6xl mb-4 opacity-60">📝</div>
          <p className="text-gray-700 text-xl font-semibold mb-2">
            No words to quiz on
          </p>
          <p className="text-gray-600">
            Select some filters or try adding more words.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <FilterSection words={allWords} onFilterChange={handleFilterChange} />

      {/* Quiz Container */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-black text-lg text-gradient dark:text-slate-100">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h3>
            </div>
            <span className="text-sm font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-lg badge-secondary">
              Score: {score}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200 dark:from-slate-700 dark:to-slate-800 dark:border-slate-600">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wide">
              What is the English translation?
            </p>
            <div className="flex items-center justify-center gap-4">
              <p className="text-5xl font-black text-slate-900 dark:text-slate-100">
                {currentQuestion.correct.french}
              </p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
              Difficulty: {currentQuestion.correct.cefr} •{" "}
              {currentQuestion.correct.category}
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => !answered && handleAnswer(option)}
              disabled={answered}
              className={`p-6 rounded-xl font-semibold text-lg transition-all ${
                selectedAnswer === option.id
                  ? option.id === currentQuestion.correct.id
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105"
                    : "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg scale-105"
                  : answered && option.id === currentQuestion.correct.id
                  ? "bg-gradient-to-r from-green-100 to-emerald-100 text-slate-900 dark:text-slate-100 border-2 border-green-500"
                  : "bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-200 border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
              } ${
                answered
                  ? "cursor-default"
                  : "hover:shadow-md active:scale-95 cursor-pointer"
              }`}
            >
              {option.english}
            </button>
          ))}
        </div>

        {/* Next Button */}
        {answered && (
          <div className="flex gap-4 animate-slide-up">
            <button
              onClick={handleNext}
              className="flex-1 btn-primary py-4 px-6 rounded-lg font-bold"
            >
              {currentQuestionIndex < questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
