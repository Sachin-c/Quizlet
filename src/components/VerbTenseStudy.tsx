import { useState, useMemo } from "react";
import { tenseModules } from "../data/verbTenses";
import type { TenseModule, VerbTenseEntry, CEFRLevel } from "../types";

const CEFR_COLORS: Record<string, string> = {
  A2: "from-emerald-500 to-teal-600",
  B1: "from-blue-500 to-indigo-600",
  B2: "from-purple-500 to-violet-600",
};

const CEFR_BG: Record<string, string> = {
  A2: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  B1: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  B2: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
};

export const VerbTenseStudy: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | "all">("all");
  const [selectedModule, setSelectedModule] = useState<TenseModule | null>(null);
  const [selectedVerb, setSelectedVerb] = useState<VerbTenseEntry | null>(null);
  const [showRule, setShowRule] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const filteredModules = useMemo(() => {
    if (selectedLevel === "all") return tenseModules;
    return tenseModules.filter((m) => m.cefr === selectedLevel);
  }, [selectedLevel]);

  const levels: CEFRLevel[] = ["A2", "B1", "B2"];

  // Practice Mode Logic
  const practiceVerbs = useMemo(() => {
    if (!selectedModule) return [];
    return selectedModule.verbs.flatMap((verb) =>
      verb.conjugations.map((conj) => ({ verb, conj }))
    );
  }, [selectedModule]);

  const currentPractice = practiceVerbs[practiceIdx];

  const handlePracticeCheck = () => {
    if (!currentPractice) return;
    const isCorrect =
      userInput.trim().toLowerCase() === currentPractice.conj.form.toLowerCase();
    setShowAnswer(true);
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handlePracticeNext = () => {
    setUserInput("");
    setShowAnswer(false);
    setPracticeIdx((prev) => (prev + 1) % practiceVerbs.length);
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // DETAIL VIEW: Single Verb
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (selectedVerb) {
    return (
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setSelectedVerb(null)}
          className="mb-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          ← Back to {selectedModule?.displayName}
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white">
              {selectedVerb.infinitive}
            </h2>
            <span className="text-slate-500 dark:text-slate-400 text-lg">
              — {selectedVerb.english}
            </span>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${CEFR_BG[selectedVerb.cefr] || ""}`}>
              {selectedVerb.cefr}
            </span>
          </div>

          {selectedVerb.auxiliary && (
            <div className="mb-3 text-sm text-slate-600 dark:text-slate-400">
              Auxiliary: <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedVerb.auxiliary}</span>
              {selectedVerb.isReflexive && " (reflexive)"}
            </div>
          )}

          {selectedVerb.rule && (
            <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-sm text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
              💡 {selectedVerb.rule}
            </div>
          )}

          {/* Conjugation Table */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 text-slate-700 dark:text-slate-200">Conjugations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedVerb.conjugations.map((conj, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                >
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 w-20">
                    {conj.pronoun}
                  </span>
                  <span className="text-base font-semibold text-slate-800 dark:text-white flex-1">
                    {conj.form}
                  </span>
                  {conj.phonetics && (
                    <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                      /{conj.phonetics}/
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 text-slate-700 dark:text-slate-200">Examples</h3>
            <div className="space-y-3">
              {selectedVerb.examples.map((ex, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border-l-4 border-indigo-400"
                >
                  <p className="font-semibold text-slate-800 dark:text-white">{ex.french}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{ex.english}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          {selectedVerb.commonMistakes && selectedVerb.commonMistakes.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3 text-red-600 dark:text-red-400">⚠️ Common Mistakes</h3>
              <ul className="space-y-2">
                {selectedVerb.commonMistakes.map((m, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PRACTICE MODE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (practiceMode && selectedModule && currentPractice) {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => {
            setPracticeMode(false);
            setPracticeIdx(0);
            setScore({ correct: 0, total: 0 });
            setShowAnswer(false);
            setUserInput("");
          }}
          className="mb-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          ← Exit Practice
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Practice: {selectedModule.displayName}
            </h2>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {score.correct}/{score.total} correct
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 mb-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300"
              style={{ width: `${((practiceIdx + 1) / practiceVerbs.length) * 100}%` }}
            />
          </div>

          <div className="text-center mb-6">
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
              Conjugate <span className="font-black text-indigo-600 dark:text-indigo-400">{currentPractice.verb.infinitive}</span> ({currentPractice.verb.english})
            </p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {currentPractice.conj.pronoun} ______
            </p>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !showAnswer) handlePracticeCheck();
                if (e.key === "Enter" && showAnswer) handlePracticeNext();
              }}
              placeholder="Type the conjugated form..."
              disabled={showAnswer}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
            {!showAnswer ? (
              <button
                onClick={handlePracticeCheck}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all active:scale-95"
              >
                Check
              </button>
            ) : (
              <button
                onClick={handlePracticeNext}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all active:scale-95"
              >
                Next →
              </button>
            )}
          </div>

          {showAnswer && (
            <div
              className={`p-4 rounded-xl ${
                userInput.trim().toLowerCase() === currentPractice.conj.form.toLowerCase()
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700"
                  : "bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700"
              }`}
            >
              {userInput.trim().toLowerCase() === currentPractice.conj.form.toLowerCase() ? (
                <p className="text-green-700 dark:text-green-300 font-bold">✓ Correct!</p>
              ) : (
                <div>
                  <p className="text-red-700 dark:text-red-300 font-bold mb-1">✗ Incorrect</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Correct answer: <span className="font-bold">{currentPractice.conj.pronoun} {currentPractice.conj.form}</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MODULE DETAIL VIEW
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (selectedModule) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => {
            setSelectedModule(null);
            setShowRule(false);
          }}
          className="mb-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          ← Back to All Tenses
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white">
                {selectedModule.displayName}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {selectedModule.description}
              </p>
            </div>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${CEFR_BG[selectedModule.cefr] || ""}`}>
              {selectedModule.cefr}
            </span>
          </div>

          {/* Rule Toggle */}
          <button
            onClick={() => setShowRule(!showRule)}
            className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-700 text-left transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-700 dark:text-indigo-300">📖 Grammar Rule</span>
              <span className="text-indigo-500">{showRule ? "▲" : "▼"}</span>
            </div>
          </button>

          {showRule && (
            <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <pre className="text-sm text-indigo-800 dark:text-indigo-200 whitespace-pre-wrap font-sans leading-relaxed">
                {selectedModule.ruleExplanation}
              </pre>
            </div>
          )}

          {/* Practice Button */}
          <button
            onClick={() => {
              setPracticeMode(true);
              setPracticeIdx(0);
              setScore({ correct: 0, total: 0 });
            }}
            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            🎯 Practice Conjugations
          </button>
        </div>

        {/* Verb List */}
        <div className="grid gap-3">
          {selectedModule.verbs.map((verb) => (
            <button
              key={verb.id}
              onClick={() => setSelectedVerb(verb)}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 text-left hover:shadow-md transition-all hover:border-indigo-300 dark:hover:border-indigo-600"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-slate-800 dark:text-white">
                    {verb.infinitive}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 ml-2">
                    — {verb.english}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {verb.auxiliary && (
                    <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">
                      {verb.auxiliary}
                    </span>
                  )}
                  {verb.isReflexive && (
                    <span className="text-xs px-2 py-0.5 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full">
                      reflexive
                    </span>
                  )}
                  <span className="text-slate-400">→</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {verb.conjugations.slice(0, 3).map((c) => `${c.pronoun} ${c.form}`).join(" · ")}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MAIN VIEW: Module Browser
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
          📚
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">
            Verb Tenses
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A2 → B2 progression · {tenseModules.length} modules
          </p>
        </div>
      </div>

      {/* Level Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedLevel("all")}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            selectedLevel === "all"
              ? "bg-slate-800 dark:bg-white text-white dark:text-slate-800"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
          }`}
        >
          All Levels
        </button>
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              selectedLevel === level
                ? "bg-slate-800 dark:bg-white text-white dark:text-slate-800"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Module Cards */}
      <div className="grid gap-4">
        {filteredModules.map((module, idx) => (
          <button
            key={`${module.tense}-${idx}`}
            onClick={() => setSelectedModule(module)}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 text-left hover:shadow-lg transition-all hover:border-indigo-300 dark:hover:border-indigo-600 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${CEFR_COLORS[module.cefr] || "from-gray-500 to-gray-600"} flex items-center justify-center text-white text-xl shadow-md group-hover:scale-110 transition-transform`}>
                  {module.tense === "passé_composé" ? "📝" :
                   module.tense === "imparfait" ? "🔄" :
                   module.tense === "futur_proche" ? "🔮" :
                   module.tense === "conditionnel" ? "🤝" :
                   module.tense === "subjonctif" ? "💭" :
                   module.tense === "plus_que_parfait" ? "⏪" : "📖"}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                    {module.displayName}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {module.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${CEFR_BG[module.cefr] || ""}`}>
                  {module.cefr}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {module.verbs.length} verbs
                </span>
                <span className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">
                  →
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
