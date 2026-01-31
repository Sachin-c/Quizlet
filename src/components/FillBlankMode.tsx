import { useState, useEffect, useCallback } from "react";
import type { VocabularyWord } from "../types";
import { StorageManager } from "../utils/storage";
import { GamificationManager } from "../utils/gamification";

interface FillBlankProps {
  allWords: VocabularyWord[];
  onProgressUpdate?: () => void;
}

interface BlankQuestion {
  word: VocabularyWord;
  sentenceWithBlank: string;
  fullSentence: string;
  answer: string;
  hint: string;
}

export const FillBlankMode: React.FC<FillBlankProps> = ({ allWords, onProgressUpdate }) => {
  const [questions, setQuestions] = useState<BlankQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });
  const [showComplete, setShowComplete] = useState(false);

  // Generate questions from words that have example sentences
  const generateQuestions = useCallback(() => {
    const wordsWithExamples = allWords.filter(
      (w) => w.exampleFrench && w.exampleFrench.toLowerCase().includes(w.french.toLowerCase())
    );

    if (wordsWithExamples.length === 0) {
      // Fallback: create simple sentences for words without examples
      const simpleWords = allWords.slice(0, 20);
      const generated = simpleWords.map((word) => {
        const templates = [
          { fr: `J'aime le/la ${word.french}.`, en: `I like the ${word.english}.` },
          { fr: `Voici un/une ${word.french}.`, en: `Here is a ${word.english}.` },
          { fr: `Je vois le/la ${word.french}.`, en: `I see the ${word.english}.` },
          { fr: `C'est un/une ${word.french}.`, en: `It's a ${word.english}.` },
        ];
        const template = templates[Math.floor(Math.random() * templates.length)];
        return {
          word,
          fullSentence: template.fr,
          sentenceWithBlank: template.fr.replace(word.french, "_____"),
          answer: word.french,
          hint: word.english,
        };
      });
      return generated.sort(() => Math.random() - 0.5).slice(0, 10);
    }

    // Use words with real example sentences
    const generated: BlankQuestion[] = wordsWithExamples.map((word) => {
      const sentence = word.exampleFrench!;
      // Create a regex to match the word (case-insensitive)
      const regex = new RegExp(`\\b${word.french}\\b`, "i");
      const sentenceWithBlank = sentence.replace(regex, "_____");
      
      return {
        word,
        fullSentence: sentence,
        sentenceWithBlank,
        answer: word.french,
        hint: word.english,
      };
    });

    return generated.sort(() => Math.random() - 0.5).slice(0, 10);
  }, [allWords]);

  useEffect(() => {
    if (allWords.length > 0 && questions.length === 0) {
      setQuestions(generateQuestions());
    }
  }, [allWords, generateQuestions, questions.length]);

  const currentQuestion = questions[currentIndex];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 0.8;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const checkAnswer = () => {
    if (!currentQuestion || !userInput.trim()) return;

    const isCorrect = userInput.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim();
    setFeedback(isCorrect ? "correct" : "incorrect");

    // Update progress
    const progress = StorageManager.getProgress();
    const updated = StorageManager.updateCardProgress(
      progress,
      currentQuestion.word.id,
      isCorrect,
      false
    );
    const finalProgress = StorageManager.updateDailyStats(updated, isCorrect);
    StorageManager.saveProgress(finalProgress);

    if (onProgressUpdate) onProgressUpdate();

    setSessionStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
    }));

    // Auto advance after correct
    if (isCorrect) {
      setTimeout(() => nextQuestion(), 1500);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserInput("");
      setFeedback(null);
      setShowHint(false);
    } else {
      setShowComplete(true);
    }
  };

  const restartSession = () => {
    setQuestions(generateQuestions());
    setCurrentIndex(0);
    setUserInput("");
    setFeedback(null);
    setShowHint(false);
    setSessionStats({ correct: 0, incorrect: 0 });
    setShowComplete(false);
  };

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !feedback) {
        e.preventDefault();
        checkAnswer();
      } else if (e.key === "Enter" && feedback === "incorrect") {
        e.preventDefault();
        nextQuestion();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [feedback, userInput]);

  // Session Complete Screen
  if (showComplete) {
    const accuracy = Math.round((sessionStats.correct / (sessionStats.correct + sessionStats.incorrect)) * 100) || 0;
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center animate-slide-up border border-slate-100 dark:border-slate-700">
          <div className="text-6xl mb-4 animate-bounce">🎯</div>
          <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100">Sentences Complete!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-4">Great job practicing words in context!</p>
          <div className="flex justify-center gap-6 my-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500">+{sessionStats.correct * GamificationManager.XP_PER_CORRECT}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">XP Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{accuracy}%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Accuracy</div>
            </div>
          </div>
          <button
            onClick={restartSession}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
          >
            Practice More Sentences
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-8 text-center">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-700">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Loading Sentences...</h2>
          <p className="text-slate-500 dark:text-slate-400">Preparing fill-in-the-blank exercises</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">
          📝 Fill in the Blank
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Complete the sentence with the missing French word</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-100 dark:border-slate-700">
        {/* English Translation (Hint) */}
        <div className="text-center mb-6">
          <p className="text-sm text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold mb-2">
            English Translation
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-300 italic">
            "{currentQuestion.word.exampleEnglish || `Fill in: ${currentQuestion.hint}`}"
          </p>
        </div>

        {/* Sentence with Blank */}
        <div className="text-center py-6 mb-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl">
          <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed px-4">
            {currentQuestion.sentenceWithBlank.split("_____")[0]}
            <span className="inline-block min-w-[120px] mx-2 px-4 py-2 border-b-4 border-dashed border-purple-400 dark:border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 rounded">
              {feedback ? currentQuestion.answer : userInput || "?"}
            </span>
            {currentQuestion.sentenceWithBlank.split("_____")[1]}
          </p>
        </div>

        {/* Hint Button */}
        {!showHint && !feedback && (
          <button
            onClick={() => setShowHint(true)}
            className="mb-4 text-sm text-blue-500 dark:text-blue-400 hover:underline"
          >
            Need a hint? 💡
          </button>
        )}
        {showHint && !feedback && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-center">
            <p className="text-sm">The word means: <strong>{currentQuestion.hint}</strong></p>
          </div>
        )}

        {/* Input Area */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type the missing French word..."
              disabled={!!feedback}
              className={`flex-1 p-4 text-xl text-center border-2 rounded-xl outline-none transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 ${
                feedback === "correct"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : feedback === "incorrect"
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-slate-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30"
              }`}
              autoFocus
            />
            <button
              onClick={() => speak(currentQuestion.fullSentence)}
              className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
              title="Hear the full sentence"
            >
              🔊
            </button>
          </div>

          {!feedback && (
            <button
              onClick={checkAnswer}
              disabled={!userInput.trim()}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-colors shadow-lg disabled:opacity-50"
            >
              Check Answer
            </button>
          )}
        </div>

        {/* Feedback */}
        {feedback === "incorrect" && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-xl border border-red-100 dark:border-red-800">
            <p className="text-red-600 dark:text-red-300 font-bold text-center mb-2">
              Correct answer: <span className="text-lg">{currentQuestion.answer}</span>
            </p>
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {feedback === "correct" && (
          <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl border border-emerald-100 dark:border-emerald-800 text-center">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              +{GamificationManager.XP_PER_CORRECT} XP
            </div>
            <p className="text-emerald-700 dark:text-emerald-300 font-bold">Parfait! 🎉</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
        <span>✓ {sessionStats.correct} correct</span>
        <span>✗ {sessionStats.incorrect} incorrect</span>
        <span>📝 {currentIndex + 1}/{questions.length}</span>
      </div>
    </div>
  );
};
