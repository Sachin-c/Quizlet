import { useState, useMemo, useRef, useEffect } from "react";
import { conversationScenarios } from "../data/conversations";
import type { ConversationScenario, CEFRLevel } from "../types";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export const ConversationPractice: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ConversationScenario | null>(null);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [revealedLines, setRevealedLines] = useState<number[]>([]);
  const [results, setResults] = useState<Record<number, { correct: boolean; userAnswer: string }>>({});
  const [showHints, setShowHints] = useState(false);
  const [filterLevel, setFilterLevel] = useState<CEFRLevel | "all">("all");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredScenarios = useMemo(() => {
    if (filterLevel === "all") return conversationScenarios;
    return conversationScenarios.filter((s) => s.cefr === filterLevel);
  }, [filterLevel]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [revealedLines]);

  useEffect(() => {
    if (selectedScenario) {
      inputRef.current?.focus();
    }
  }, [currentLineIdx, selectedScenario]);

  const currentLine = selectedScenario?.dialogue[currentLineIdx];
  const isComplete = selectedScenario && currentLineIdx >= selectedScenario.dialogue.length;

  const handleSubmit = () => {
    if (!selectedScenario || !currentLine || currentLine.speaker !== "user") return;

    const normalize = (s: string) =>
      s.toLowerCase().trim().replace(/[.,!?;:]/g, "").replace(/\s+/g, " ");

    const isCorrect =
      normalize(userInput) === normalize(currentLine.french) ||
      (currentLine.alternatives &&
        currentLine.alternatives.some((alt) => normalize(userInput) === normalize(alt)));

    // Also check partial correctness (at least 70% word match)
    const userWords = normalize(userInput).split(" ");
    const targetWords = normalize(currentLine.french).split(" ");
    const matchCount = userWords.filter((w) => targetWords.includes(w)).length;
    const partialMatch = targetWords.length > 0 && matchCount / targetWords.length >= 0.7;

    setResults((prev) => ({
      ...prev,
      [currentLineIdx]: { correct: isCorrect || partialMatch, userAnswer: userInput },
    }));
    setRevealedLines((prev) => [...prev, currentLineIdx]);
    setUserInput("");

    // Move to next line
    setTimeout(() => {
      const nextIdx = currentLineIdx + 1;
      if (nextIdx < selectedScenario.dialogue.length) {
        if (selectedScenario.dialogue[nextIdx].speaker === "system") {
          // Auto-reveal system lines
          setRevealedLines((prev) => [...prev, nextIdx]);
          setCurrentLineIdx(nextIdx + 1);
        } else {
          setCurrentLineIdx(nextIdx);
        }
      } else {
        setCurrentLineIdx(nextIdx);
      }
    }, 800);
  };

  const handleSkip = () => {
    if (!selectedScenario || !currentLine) return;
    setResults((prev) => ({
      ...prev,
      [currentLineIdx]: { correct: false, userAnswer: "(skipped)" },
    }));
    setRevealedLines((prev) => [...prev, currentLineIdx]);
    setUserInput("");

    setTimeout(() => {
      const nextIdx = currentLineIdx + 1;
      if (nextIdx < selectedScenario.dialogue.length) {
        if (selectedScenario.dialogue[nextIdx].speaker === "system") {
          setRevealedLines((prev) => [...prev, nextIdx]);
          setCurrentLineIdx(nextIdx + 1);
        } else {
          setCurrentLineIdx(nextIdx);
        }
      } else {
        setCurrentLineIdx(nextIdx);
      }
    }, 800);
  };

  const resetScenario = () => {
    setCurrentLineIdx(0);
    setRevealedLines([]);
    setResults({});
    setUserInput("");
    // Auto-reveal first system line
    if (selectedScenario && selectedScenario.dialogue[0].speaker === "system") {
      setRevealedLines([0]);
      setCurrentLineIdx(1);
    }
  };

  const startScenario = (scenario: ConversationScenario) => {
    setSelectedScenario(scenario);
    setCurrentLineIdx(0);
    setRevealedLines([]);
    setResults({});
    setUserInput("");
    setShowHints(false);
    // Auto-reveal first system line
    if (scenario.dialogue[0].speaker === "system") {
      setRevealedLines([0]);
      setCurrentLineIdx(1);
    }
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // COMPLETION SCREEN
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (isComplete && selectedScenario) {
    const userLines = selectedScenario.dialogue.filter((l) => l.speaker === "user");
    const correctCount = Object.values(results).filter((r) => r.correct).length;
    const accuracy = userLines.length > 0 ? Math.round((correctCount / userLines.length) * 100) : 0;

    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setSelectedScenario(null)}
          className="mb-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          ← Back to Scenarios
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">{accuracy >= 80 ? "🎉" : accuracy >= 50 ? "👍" : "💪"}</div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white">
              Conversation Complete!
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {selectedScenario.title}
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{accuracy}%</p>
              <p className="text-xs text-slate-500">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-green-600 dark:text-green-400">{correctCount}</p>
              <p className="text-xs text-slate-500">Correct</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-slate-600 dark:text-slate-400">{userLines.length}</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
          </div>

          {/* Review */}
          <div className="space-y-3 mb-6">
            <h3 className="font-bold text-slate-700 dark:text-slate-200">Review</h3>
            {selectedScenario.dialogue
              .filter((l) => l.speaker === "user")
              .map((line, i) => {
                const lineIdx = selectedScenario.dialogue.indexOf(line);
                const result = results[lineIdx];
                return (
                  <div key={i} className={`p-3 rounded-xl border ${result?.correct ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10" : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10"}`}>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{line.english}</p>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      Expected: {line.french}
                    </p>
                    {result && !result.correct && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                        Your answer: {result.userAnswer}
                      </p>
                    )}
                    {line.correction && (
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 italic">
                        💡 {line.correction}
                      </p>
                    )}
                  </div>
                );
              })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetScenario}
              className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all active:scale-95"
            >
              🔄 Try Again
            </button>
            <button
              onClick={() => setSelectedScenario(null)}
              className="flex-1 px-4 py-3 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-bold rounded-xl border border-slate-200 dark:border-slate-600 transition-all active:scale-95"
            >
              📋 All Scenarios
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ACTIVE CONVERSATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (selectedScenario) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setSelectedScenario(null)}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            ← Back
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHints(!showHints)}
              className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all ${
                showHints
                  ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
              }`}
            >
              {showHints ? "💡 Hints ON" : "💡 Hints"}
            </button>
            <span className="text-xs text-slate-400">
              {currentLineIdx}/{selectedScenario.dialogue.length}
            </span>
          </div>
        </div>

        {/* Scenario Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 mb-4 text-white">
          <h2 className="text-lg font-bold">{selectedScenario.titleFr}</h2>
          <p className="text-sm text-indigo-100">{selectedScenario.description}</p>
        </div>

        {/* Vocabulary Hints */}
        {showHints && (
          <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-300 mb-1">Key vocabulary:</p>
            <div className="flex flex-wrap gap-1">
              {selectedScenario.vocabularyHints.map((hint, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 bg-amber-200 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200 rounded-full"
                >
                  {hint}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
            {selectedScenario.dialogue.map((line, idx) => {
              if (!revealedLines.includes(idx)) return null;
              const result = results[idx];

              return (
                <div
                  key={idx}
                  className={`flex ${line.speaker === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      line.speaker === "system"
                        ? "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-tl-sm"
                        : result?.correct
                        ? "bg-green-500 text-white rounded-tr-sm"
                        : "bg-red-400 text-white rounded-tr-sm"
                    }`}
                  >
                    <p className="text-sm font-semibold">{line.french}</p>
                    <p className={`text-xs mt-1 ${
                      line.speaker === "system"
                        ? "text-slate-500 dark:text-slate-400"
                        : "text-white/80"
                    }`}>
                      {line.english}
                    </p>
                    {result && !result.correct && result.userAnswer !== "(skipped)" && (
                      <p className="text-xs mt-1 text-white/70 italic">
                        You said: {result.userAnswer}
                      </p>
                    )}
                    {line.correction && revealedLines.includes(idx) && (
                      <p className={`text-xs mt-1 italic ${
                        line.speaker === "system"
                          ? "text-indigo-500 dark:text-indigo-400"
                          : "text-white/80"
                      }`}>
                        💡 {line.correction}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          {currentLine && currentLine.speaker === "user" && (
            <div className="border-t border-slate-200 dark:border-slate-700 p-4">
              <div className="mb-2">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Respond in French: <span className="italic">{currentLine.english}</span>
                </p>
                <span className={`inline-block text-xs mt-1 px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[currentLine.difficulty]}`}>
                  {currentLine.difficulty}
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && userInput.trim()) handleSubmit();
                  }}
                  placeholder="Type your response..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
                <button
                  onClick={handleSubmit}
                  disabled={!userInput.trim()}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white font-bold rounded-xl transition-all active:scale-95"
                >
                  Send
                </button>
                <button
                  onClick={handleSkip}
                  className="px-3 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-xl transition-all text-sm"
                  title="Skip this line"
                >
                  Skip
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SCENARIO BROWSER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">
          💬
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">
            Conversation Practice
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {conversationScenarios.length} scenarios · Practice real dialogues
          </p>
        </div>
      </div>

      {/* Level Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["all", "A2", "B1"] as const).map((level) => (
          <button
            key={level}
            onClick={() => setFilterLevel(level)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              filterLevel === level
                ? "bg-slate-800 dark:bg-white text-white dark:text-slate-800"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
          >
            {level === "all" ? "All Levels" : level}
          </button>
        ))}
      </div>

      {/* Scenario Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredScenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => startScenario(scenario)}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 text-left hover:shadow-lg transition-all hover:border-rose-300 dark:hover:border-rose-600 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  {scenario.title}
                </h3>
                <p className="text-sm text-rose-500 dark:text-rose-400 font-medium">
                  {scenario.titleFr}
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                {scenario.cefr}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              {scenario.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {scenario.vocabularyHints.slice(0, 3).map((hint, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full"
                  >
                    {hint}
                  </span>
                ))}
              </div>
              <span className="text-xs text-slate-400">
                {scenario.dialogue.length} lines →
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
