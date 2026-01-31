import { useState, useEffect } from "react";
import type { VocabularyWord } from "../types";
import { StorageManager } from "../utils/storage";
import { GamificationManager } from "../utils/gamification";
import { getFrenchPhonetics } from "../utils/phonetics";
import { QuizUtils, type QuizQuestion } from "../utils/quiz";

interface SRSStudyProps {
  allWords: VocabularyWord[];
  onProgressUpdate?: () => void;
}

export const SRSStudy: React.FC<SRSStudyProps> = ({ allWords, onProgressUpdate }) => {
  const [studyQueue, setStudyQueue] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });
  const [showComplete, setShowComplete] = useState(false);
  
  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [canAdvance, setCanAdvance] = useState(false);

  const SESSION_KEY = "srs_session_state";

  // Save session state to sessionStorage
  const saveSessionState = (queue: VocabularyWord[], index: number, stats: { correct: number; incorrect: number }) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
      queueIds: queue.map(w => w.id),
      currentIndex: index,
      sessionStats: stats,
      timestamp: Date.now()
    }));
  };

  // Restore session from sessionStorage on mount
  useEffect(() => {
    if (allWords.length === 0) return;
    
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      try {
        const { queueIds, currentIndex: savedIndex, sessionStats: savedStats, timestamp } = JSON.parse(saved);
        // Only restore if session is less than 1 hour old
        if (Date.now() - timestamp < 60 * 60 * 1000 && queueIds.length > 0) {
          const wordMap = new Map(allWords.map(w => [w.id, w]));
          const restoredQueue = queueIds.map((id: string) => wordMap.get(id)).filter(Boolean) as VocabularyWord[];
          if (restoredQueue.length > 0 && savedIndex < restoredQueue.length) {
            setStudyQueue(restoredQueue);
            setCurrentIndex(savedIndex);
            setSessionStats(savedStats);
            return;
          }
        }
      } catch (e) {
        console.warn("Failed to restore session:", e);
      }
    }
    // No valid saved session, start fresh
    refreshQueue();
  }, [allWords]);

  // Save state whenever queue, index, or stats change
  useEffect(() => {
    if (studyQueue.length > 0) {
      saveSessionState(studyQueue, currentIndex, sessionStats);
    }
  }, [studyQueue, currentIndex, sessionStats]);

  // Generate question when index changes
  useEffect(() => {
    if (studyQueue.length > 0 && currentIndex < studyQueue.length) {
      const word = studyQueue[currentIndex];
      const question = QuizUtils.generateQuestion(word, allWords);
      setCurrentQuestion(question);
      setSelectedOption(null);
      setUserInput("");
      setFeedback(null);
      setIsProcessing(false);
      setShowXP(false);
      
      // Auto-play audio
      // const timer = setTimeout(() => speak(word.french), 500);
      // return () => clearTimeout(timer);
    }
  }, [currentIndex, studyQueue]);

  const refreshQueue = () => {
    const progress = StorageManager.getProgress();
    const queue = StorageManager.getSRSStudyQueue(allWords, progress, 10); // Smaller batch for engagement
    setStudyQueue(queue);
    setCurrentIndex(0);
    setShowComplete(false);
    setSessionStats({ correct: 0, incorrect: 0 });
    // Clear old session when starting fresh
    sessionStorage.removeItem(SESSION_KEY);
  };

  const speak = (text: string, lang: string = "fr-FR") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const checkAnswer = (answer: string) => {
    if (isProcessing) {
        console.log("Ignored checkAnswer: Processing already");
        return;
    }
    if (!currentQuestion) return;

    console.log("Checking answer:", answer, "Correct:", currentQuestion.correctAnswer);
    setIsProcessing(true);

    const isCorrect = answer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
    console.log("Result:", isCorrect ? "CORRECT" : "INCORRECT");
    
    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
       setShowXP(true);
    }

    // Update Logic
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

    // Next Card Logic
    if (isCorrect) {
      console.log("Auto-advancing (Correct)...");
      setTimeout(() => {
        advanceCard("auto-correct");
      }, 1500); 
    } else {
      console.log("Pausing for feedback (Incorrect)...");
      // Set canAdvance after 500ms
      setTimeout(() => {
          console.log("canAdvance set to TRUE");
          setCanAdvance(true);
      }, 500);
    }
  };

  const advanceCard = (reason: string = "unknown") => {
      console.log("Advancing card. Reason:", reason);
      if (currentIndex < studyQueue.length - 1) {
        setCanAdvance(false);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setShowComplete(true);
      }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If feedback is showing, Enter advances only if permitted
      if (feedback && e.key === "Enter") {
         e.preventDefault(); 
         if (canAdvance) advanceCard("enter-key");
         return;
      }

      if (isProcessing || !currentQuestion || feedback) return;

      if (currentQuestion.type === "multiple-choice" && currentQuestion.options) {
        const num = parseInt(e.key);
        if (!isNaN(num) && num >= 1 && num <= currentQuestion.options.length) {
            const option = currentQuestion.options[num - 1];
            setSelectedOption(option);
            checkAnswer(option);
        }
      } else if (currentQuestion.type === "typing" && e.key === "Enter") {
        checkAnswer(userInput);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestion, userInput, isProcessing, feedback, canAdvance]);


  // ------------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------------
  
  if (showComplete) {
    const accuracy = Math.round((sessionStats.correct / (sessionStats.correct + sessionStats.incorrect)) * 100) || 0;
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-slide-up">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Session Complete!</h2>
          <div className="flex justify-center gap-4 my-6">
            <div className="text-center">
                <div className="text-3xl font-bold text-amber-500">+{sessionStats.correct * GamificationManager.XP_PER_CORRECT}</div>
                <div className="text-xs text-gray-500 uppercase font-bold">XP Earned</div>
            </div>
            <div className="text-center md:border-l md:border-gray-100 md:pl-4">
                 <div className="text-3xl font-bold text-purple-600">{accuracy}%</div>
                 <div className="text-xs text-gray-500 uppercase font-bold">Accuracy</div>
            </div>
          </div>
          <button
            onClick={refreshQueue}
            className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 transition-all"
          >
            Continue Learning
          </button>
        </div>
      </div>
    );
  }

  if (studyQueue.length === 0) {
    return (
       <div className="max-w-md mx-auto mt-8 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-6xl mb-4">😴</div>
            <h2 className="text-xl font-bold mb-2">No words due!</h2>
            <p className="text-gray-500 mb-6">You've mastered everything for now.</p>
            <button
                onClick={refreshQueue}
                className="px-6 py-2 border-2 border-purple-100 text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-all"
            >
                Practice Anyway
            </button>
        </div>
       </div>
    );
  }

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
            className="bg-green-500 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${(currentIndex / studyQueue.length) * 100}%` }}
        />
      </div>

      {/* Card Content */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 min-h-[400px] flex flex-col items-center justify-between relative overflow-hidden transition-all border border-slate-100 dark:border-slate-700">
        
        {/* +10 XP Animation */}
        {showXP && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-black text-amber-500 dark:text-amber-400 animate-float-up z-50 drop-shadow-lg pointer-events-none">
                +{GamificationManager.XP_PER_CORRECT} XP
            </div>
        )}

        {/* Question Area */}
        <div className="w-full text-center space-y-4">
            <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider">How do you say this in English?</p>
            
            <div className="py-8">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100">{currentQuestion.word.french}</h1>
                    <button 
                        onClick={() => speak(currentQuestion.word.french)}
                        className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
                        title="Play Audio"
                    >
                        🔊
                    </button>
                </div>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-serif active:blur-none">
                   /{getFrenchPhonetics(currentQuestion.word.french)}/
                </p>
                {/* Image hint if available */}
                {currentQuestion.word.imageUrl && (
                    <div className="text-6xl mt-4">{currentQuestion.word.imageUrl}</div>
                )}
            </div>
        </div>

        {/* Answer Area */}
        <div className="w-full space-y-3">
            {currentQuestion.type === "multiple-choice" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentQuestion.options?.map((option, idx) => {
                        let buttonClass = "border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm";
                        
                        // Feedback Styling
                        if (feedback && option === currentQuestion.correctAnswer) {
                            buttonClass = "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 shadow-md";
                        } else if (feedback === "incorrect" && option === selectedOption) {
                             buttonClass = "border-2 border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300";
                        } else if (feedback && option !== currentQuestion.correctAnswer) {
                            buttonClass = "opacity-50 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-600";
                        }

                        return (
                            <button
                                key={idx}
                                disabled={isProcessing}
                                onClick={() => {
                                    setSelectedOption(option);
                                    checkAnswer(option);
                                }}
                                className={`w-full p-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 ${buttonClass}`}
                            >
                                <span className="mr-2 opacity-50 text-sm font-normal">{idx + 1}.</span>
                                {option}
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div className="w-full max-w-md mx-auto">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Type meaning..."
                        disabled={isProcessing}
                        className={`w-full p-4 text-xl text-center border-2 rounded-xl outline-none transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 ${
                            feedback === "correct" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" :
                            feedback === "incorrect" ? "border-red-500 bg-red-50 dark:bg-red-900/20" :
                            "border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30"
                        }`}
                        autoFocus
                    />
                    {feedback === "incorrect" && (
                         <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg text-center animate-shake border border-red-100 dark:border-red-800">
                            <p className="text-sm font-bold uppercase">Correct Answer:</p>
                            <p className="text-lg font-bold">{currentQuestion.correctAnswer}</p>
                         </div>
                    )}
                    {!feedback && (
                        <button
                            onClick={() => checkAnswer(userInput)}
                            className="w-full mt-4 p-4 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg disabled:opacity-50"
                            disabled={!userInput.trim()}
                        >
                            Check Answer
                        </button>
                    )}
                </div>
            )}
        </div>
      </div>
    
       {/* Feedback Footer Bar */}
       {feedback && (
            <div className={`fixed bottom-0 left-0 right-0 p-6 ${
                 feedback === "correct" ? "bg-green-100 border-t-4 border-green-500" : "bg-red-100 border-t-4 border-red-500"
             } animate-slide-up z-[100] shadow-2xl`}>
                 <div className="max-w-4xl mx-auto flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm ${
                            feedback === "correct" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                        }`}>
                            {feedback === "correct" ? "✓" : "✗"}
                        </div>
                        <div>
                            <h3 className={`text-xl font-black ${
                                feedback === "correct" ? "text-emerald-900 dark:text-emerald-100" : "text-red-900 dark:text-red-100"
                            }`}>
                                {feedback === "correct" ? "Nicely Done!" : "Correct solution:"}
                            </h3>
                            {feedback === "incorrect" && (
                                <p className="text-red-800 dark:text-red-200 font-bold text-lg">{currentQuestion.correctAnswer}</p>
                            )}
                        </div>
                     </div>
                     <button 
                         className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                             feedback === "correct" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
                         } disabled:opacity-50 disabled:transform-none`}
                         onClick={() => advanceCard("manual-click")}
                         disabled={!canAdvance}
                     >
                        Continue
                     </button>
                 </div>
             </div>
       )}
    </div>
  );
};
