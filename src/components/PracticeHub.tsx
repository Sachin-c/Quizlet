import { useState } from "react";
import { AdaptiveQuiz } from "./AdaptiveQuiz";
import { QuizView } from "./QuizView";
import { DynamicSentences } from "./DynamicSentences";
import { TypingMode } from "./TypingMode";
import { SearchBar } from "./SearchBar";
import type { VocabularyWord } from "../types";

/**
 * PracticeHub — Consolidated "Practice/Drill" mode
 * Maps to: TCF "Compréhension Écrite" + "Lexique & Structure"
 *
 * TEF/TCF tests evaluate:
 *  - Vocabulary comprehension (word → definition)
 *  - Grammar structure (fill-in-blank, error correction)
 *  - Sentence comprehension (reading, fill-in-blank)
 *  - Dictation / Active recall (typing)
 *
 * Combines:
 *  - Adaptive Quiz (smart, error-tracking quiz)
 *  - Sentence Practice (contextual fill-in-blank)
 *  - Classic Quiz (MC + basic typing)
 *  - Typing Drills (active recall)
 */

interface PracticeHubProps {
  allWords: VocabularyWord[];
  onProgressUpdate: () => void;
  refreshKey: number;
}

type PracticeTab = "adaptive" | "sentences" | "classic" | "typing";

const TABS: { key: PracticeTab; label: string; icon: string; description: string; examRef: string }[] = [
  {
    key: "adaptive",
    label: "Adaptive Quiz",
    icon: "🎯",
    description: "Smart quiz that tracks your weak areas and adapts difficulty",
    examRef: "TCF: Lexique & Structure",
  },
  {
    key: "sentences",
    label: "Sentences",
    icon: "📝",
    description: "Complete sentences with the missing word",
    examRef: "TCF: Compréhension Écrite",
  },
  {
    key: "classic",
    label: "Classic Quiz",
    icon: "❓",
    description: "Multiple choice and basic translation",
    examRef: "TEF: Lexique & Structure",
  },
  {
    key: "typing",
    label: "Dictation",
    icon: "✍️",
    description: "Type the French word from memory",
    examRef: "TCF: Expression Écrite (dictée)",
  },
];

export const PracticeHub: React.FC<PracticeHubProps> = ({ allWords, onProgressUpdate, refreshKey }) => {
  const [activeTab, setActiveTab] = useState<PracticeTab>("adaptive");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWords = searchTerm.trim() === ""
    ? allWords
    : allWords.filter(
        (w) =>
          w.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
          w.english.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const currentTab = TABS.find((t) => t.key === activeTab);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Tab Bar */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg scale-[1.02]"
                : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-600 hover:text-cyan-600 dark:hover:text-cyan-400"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Description + Exam Reference */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          {currentTab?.description}
        </p>
        <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 px-2 py-0.5 rounded-full border border-cyan-200 dark:border-cyan-800">
          {currentTab?.examRef}
        </span>
      </div>

      {/* Search bar for classic quiz */}
      {activeTab === "classic" && (
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          resultCount={filteredWords.length}
        />
      )}

      {/* Content */}
      {activeTab === "adaptive" && (
        <AdaptiveQuiz allWords={allWords} onProgressUpdate={onProgressUpdate} />
      )}
      {activeTab === "sentences" && (
        <DynamicSentences allWords={allWords} onProgressUpdate={onProgressUpdate} />
      )}
      {activeTab === "classic" && (
        <QuizView key={`quiz-${refreshKey}`} allWords={filteredWords} />
      )}
      {activeTab === "typing" && (
        <TypingMode key={`typing-${refreshKey}`} allWords={allWords} />
      )}
    </div>
  );
};
