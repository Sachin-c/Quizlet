import { useState } from "react";
import { ConversationPractice } from "./ConversationPractice";
import { LiveTranslation } from "./LiveTranslation";

/**
 * ExpressHub — Consolidated "Expression" mode
 * Maps to: TCF "Expression Orale" + "Expression Écrite"
 *
 * TEF/TCF tests evaluate:
 *  - Oral expression (responding in conversation)
 *  - Written expression (translation, sentence construction)
 *
 * Combines:
 *  - Conversation Practice (guided dialogue roleplay)
 *  - Translation (free translation practice)
 */

type ExpressTab = "conversations" | "translation";

const TABS: { key: ExpressTab; label: string; icon: string; description: string; examRef: string }[] = [
  {
    key: "conversations",
    label: "Conversations",
    icon: "💬",
    description: "Practice real dialogues in guided scenarios",
    examRef: "TCF: Expression Orale",
  },
  {
    key: "translation",
    label: "Translation",
    icon: "🔄",
    description: "Translate freely between French and English",
    examRef: "TEF: Expression Écrite",
  },
];

export const ExpressHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExpressTab>("conversations");

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
                ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg scale-[1.02]"
                : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-600 hover:text-rose-600 dark:hover:text-rose-400"
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
        <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
          {currentTab?.examRef}
        </span>
      </div>

      {/* Content */}
      {activeTab === "conversations" && <ConversationPractice />}
      {activeTab === "translation" && <LiveTranslation />}
    </div>
  );
};
