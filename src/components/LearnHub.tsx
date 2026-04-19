import { useState } from "react";
import { SRSStudy } from "./SRSStudy";
import { StudyView } from "./StudyView";
import { VerbTenseStudy } from "./VerbTenseStudy";
import { VerbStudy } from "./VerbStudy";
import { SearchBar } from "./SearchBar";
import type { VocabularyWord } from "../types";
import { commonVerbs } from "../data/vocabulary";

/**
 * LearnHub — Consolidated "Study" mode
 * Maps to: Pre-exam preparation / Acquisition phase
 * 
 * Combines:
 *  - Smart Review (SRS flashcards)
 *  - Vocabulary Browse (flashcards with search)
 *  - Verb Tenses (A2→B2 tense modules)
 *  - Verb Conjugations (present tense drills)
 */

interface LearnHubProps {
  allWords: VocabularyWord[];
  onProgressUpdate: () => void;
  refreshKey: number;
}

type LearnTab = "smart" | "vocabulary" | "tenses" | "conjugations";

const TABS: { key: LearnTab; label: string; icon: string; description: string }[] = [
  { key: "smart", label: "Smart Review", icon: "🧠", description: "SRS-powered spaced repetition" },
  { key: "vocabulary", label: "Vocabulary", icon: "📖", description: "Browse & study flashcards" },
  { key: "tenses", label: "Verb Tenses", icon: "📚", description: "A2→B2 tense progression" },
  { key: "conjugations", label: "Conjugations", icon: "🔤", description: "Present tense drills" },
];

export const LearnHub: React.FC<LearnHubProps> = ({ allWords, onProgressUpdate, refreshKey }) => {
  const [activeTab, setActiveTab] = useState<LearnTab>("smart");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWords = searchTerm.trim() === ""
    ? allWords
    : allWords.filter(
        (w) =>
          w.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
          w.english.toLowerCase().includes(searchTerm.toLowerCase())
      );

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
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-[1.02]"
                : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Description */}
      <div className="mb-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          {TABS.find((t) => t.key === activeTab)?.description}
        </p>
      </div>

      {/* Search bar for vocabulary tab */}
      {activeTab === "vocabulary" && (
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          resultCount={filteredWords.length}
        />
      )}

      {/* Content */}
      {activeTab === "smart" && (
        <SRSStudy allWords={allWords} onProgressUpdate={onProgressUpdate} />
      )}
      {activeTab === "vocabulary" && (
        <StudyView key={`study-${refreshKey}`} allWords={filteredWords} />
      )}
      {activeTab === "tenses" && <VerbTenseStudy />}
      {activeTab === "conjugations" && (
        <VerbStudy key={`verbs-${refreshKey}`} allWords={commonVerbs} />
      )}
    </div>
  );
};
