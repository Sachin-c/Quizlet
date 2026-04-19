import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import type { VocabularyWord, CEFRLevel, Category } from "../types";
import { FilterSection } from "./FilterSection";
import { StorageManager } from "../utils/storage";
import { GamificationManager } from "../utils/gamification";
import { sentenceBank, type Sentence } from "../data/sentences";

interface DynamicSentencesProps {
  allWords: VocabularyWord[];
  onProgressUpdate?: () => void;
}

type PracticeMode = "fill" | "translate" | "listen";

// ─── API sentence cache (variety booster) ───
const API_CACHE_KEY = "sentence_api_cache_v1";
const SENTENCE_PROGRESS_KEY = "sentence_practice_progress_v1";

interface SentenceProgress {
  [sentenceId: string]: { correct: number; incorrect: number; lastSeen: number };
}

function loadProgress(): SentenceProgress {
  try { return JSON.parse(localStorage.getItem(SENTENCE_PROGRESS_KEY) || "{}"); } catch { return {}; }
}
function saveProgress(p: SentenceProgress) {
  try { localStorage.setItem(SENTENCE_PROGRESS_KEY, JSON.stringify(p)); } catch { /* full */ }
}

// API cache for bonus variety
interface ApiCacheEntry { french: string; english: string; word: string; }
function loadApiCache(): ApiCacheEntry[] {
  try { return JSON.parse(localStorage.getItem(API_CACHE_KEY) || "[]"); } catch { return []; }
}
function saveApiCache(c: ApiCacheEntry[]) {
  try { localStorage.setItem(API_CACHE_KEY, JSON.stringify(c.slice(-200))); } catch { /* full */ }
}

// Convert API cached sentences to Sentence format
function apiToSentence(entry: ApiCacheEntry, idx: number): Sentence {
  return {
    id: `api_${idx}_${entry.word}`,
    french: entry.french,
    english: entry.english,
    blankWord: entry.word,
    hint: entry.word.slice(0, 3),
    category: "Conversations" as Category,
    cefr: "A2" as CEFRLevel,
    difficulty: "medium" as const,
  };
}

// Background API fetcher — never blocks UI
let apiFetchQueue: string[] = [];
let isFetching = false;
async function backgroundFetchSentence(word: string) {
  apiFetchQueue.push(word);
  if (isFetching) return;
  isFetching = true;
  while (apiFetchQueue.length > 0) {
    const w = apiFetchQueue.shift()!;
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(w)}&langpair=fr|en&de=learning@example.com`
      );
      if (!res.ok) continue;
      const data = await res.json();
      const matches = data?.matches;
      if (!matches?.length) continue;
      const cache = loadApiCache();
      for (const m of matches.slice(0, 3)) {
        if (m.segment && m.translation && m.segment.length > 10 && m.segment.length < 120) {
          const exists = cache.some(c => c.french === m.segment);
          if (!exists) {
            cache.push({ french: m.segment, english: m.translation, word: w });
          }
        }
      }
      saveApiCache(cache);
    } catch { /* silent */ }
    // Throttle: 1.5s between API calls
    await new Promise(r => setTimeout(r, 1500));
  }
  isFetching = false;
}

// ─── Component ───
export const DynamicSentences: React.FC<DynamicSentencesProps> = ({
  allWords,
  onProgressUpdate,
}) => {
  // Filter state — shared with FilterSection
  const [selectedLevels, setSelectedLevels] = useState<Set<CEFRLevel>>(() => new Set<CEFRLevel>(["A1", "A2"]));
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(new Set());
  const [_filteredWords, setFilteredWords] = useState<VocabularyWord[]>(allWords);

  // Practice state
  const [mode, setMode] = useState<PracticeMode>("fill");
  const [currentSentence, setCurrentSentence] = useState<Sentence | null>(null);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, total: 0, streak: 0, bestStreak: 0 });
  const [animateCard, setAnimateCard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recentIds = useRef<string[]>([]);
  const progress = useRef<SentenceProgress>(loadProgress());

  // ─── Combined sentence pool (offline + API cache) ───
  const allSentences = useMemo(() => {
    const apiCached = loadApiCache().map(apiToSentence);
    return [...sentenceBank, ...apiCached];
  }, []);

  // ─── Filtered pool ───
  const filteredSentences = useMemo(() => {
    let pool = allSentences;
    if (selectedLevels.size > 0) pool = pool.filter(s => selectedLevels.has(s.cefr));
    if (selectedCategories.size > 0) pool = pool.filter(s => selectedCategories.has(s.category));
    return pool;
  }, [allSentences, selectedLevels, selectedCategories]);

  // ─── Smart picker ───
  const pickNext = useCallback((): Sentence | null => {
    if (filteredSentences.length === 0) return null;
    const available = filteredSentences.filter(s => !recentIds.current.includes(s.id));
    const pool = available.length > 0 ? available : filteredSentences;
    const p = progress.current;
    const unseen: Sentence[] = [], weak: Sentence[] = [], strong: Sentence[] = [];
    pool.forEach(s => {
      const pr = p[s.id];
      if (!pr) unseen.push(s);
      else if (pr.incorrect >= pr.correct || pr.correct < 3) weak.push(s);
      else strong.push(s);
    });
    const r = Math.random();
    let pick: Sentence;
    if (r < 0.5 && unseen.length) pick = unseen[Math.floor(Math.random() * unseen.length)];
    else if (r < 0.85 && weak.length) pick = weak[Math.floor(Math.random() * weak.length)];
    else if (strong.length) pick = strong[Math.floor(Math.random() * strong.length)];
    else pick = pool[Math.floor(Math.random() * pool.length)];
    recentIds.current.push(pick.id);
    if (recentIds.current.length > Math.min(20, filteredSentences.length - 1)) recentIds.current.shift();
    return pick;
  }, [filteredSentences]);

  // ─── Load next ───
  const loadNext = useCallback(() => {
    setFeedback(null); setUserInput(""); setShowHint(false); setShowAnswer(false);
    setAnimateCard(true);
    const next = pickNext();
    setCurrentSentence(next);
    // Background: try to fetch more sentences for variety
    if (next) backgroundFetchSentence(next.blankWord);
    setTimeout(() => { setAnimateCard(false); inputRef.current?.focus(); }, 300);
  }, [pickNext]);

  useEffect(() => { loadNext(); }, []); // eslint-disable-line
  useEffect(() => { loadNext(); }, [selectedLevels, selectedCategories, mode]); // eslint-disable-line

  // ─── Speak ───
  const speak = useCallback((text: string, rate = 0.85) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR"; u.rate = rate;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }, []);

  const normalize = (t: string) => t.toLowerCase().trim().replace(/'/g, "'").replace(/`/g, "'");
  const stripAccents = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // ─── Check answer ───
  const checkAnswer = useCallback(() => {
    if (!currentSentence || !userInput.trim()) return;
    const answer = mode === "fill" ? currentSentence.blankWord : currentSentence.french;
    const uN = normalize(userInput), aN = normalize(answer);
    const isCorrect = uN === aN || stripAccents(uN) === stripAccents(aN);
    setFeedback(isCorrect ? "correct" : "incorrect");

    const p = progress.current;
    if (!p[currentSentence.id]) p[currentSentence.id] = { correct: 0, incorrect: 0, lastSeen: Date.now() };
    p[currentSentence.id].lastSeen = Date.now();
    if (isCorrect) p[currentSentence.id].correct++; else p[currentSentence.id].incorrect++;
    saveProgress(p);

    const up = StorageManager.getProgress();
    StorageManager.saveProgress(StorageManager.updateDailyStats(up, isCorrect));
    onProgressUpdate?.();

    setStats(prev => {
      const ns = isCorrect ? prev.streak + 1 : 0;
      return { correct: prev.correct + (isCorrect ? 1 : 0), incorrect: prev.incorrect + (isCorrect ? 0 : 1), total: prev.total + 1, streak: ns, bestStreak: Math.max(prev.bestStreak, ns) };
    });
    if (isCorrect) { speak(currentSentence.french, 0.9); setTimeout(() => loadNext(), 1600); }
  }, [currentSentence, userInput, mode, speak, loadNext, onProgressUpdate]);

  // ─── Keyboard ───
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement && e.key === "Enter") {
        e.preventDefault();
        if (!feedback) checkAnswer(); else if (feedback === "incorrect") loadNext();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [feedback, checkAnswer, loadNext]);

  // ─── Derived ───
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  const mastered = Object.values(progress.current).filter(p => p.correct >= 3 && p.correct > p.incorrect).length;
  const getBlank = (s: Sentence) => s.french.replace(new RegExp(`\\b${s.blankWord}\\b`, "i"), "_____");

  // Filter change handler (for FilterSection compatibility — we use levels/categories directly)
  const handleFilterChange = useCallback((filtered: VocabularyWord[]) => {
    setFilteredWords(filtered);
  }, []);

  // ─── Empty state ───
  if (filteredSentences.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <Header stats={stats} accuracy={accuracy} mode={mode} setMode={setMode} />
        <FilterSection words={allWords} onFilterChange={handleFilterChange} selectedLevels={selectedLevels} setSelectedLevels={setSelectedLevels} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
        <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-10 border border-amber-200/50 dark:border-amber-800/50">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-2">No sentences match your filters</h3>
          <p className="text-amber-700 dark:text-amber-300">Try broadening your level or category selection.</p>
        </div>
      </div>
    );
  }

  if (!currentSentence) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[40vh]">
        <button onClick={loadNext} className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl">Start Practice</button>
      </div>
    );
  }

  const blankSentence = getBlank(currentSentence);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Header stats={stats} accuracy={accuracy} mode={mode} setMode={setMode} />

      {/* Reusing existing FilterSection */}
      <FilterSection words={allWords} onFilterChange={handleFilterChange} selectedLevels={selectedLevels} setSelectedLevels={setSelectedLevels} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />

      {/* Sentence count */}
      <div className="text-xs text-right text-slate-400 dark:text-slate-500 -mt-2 pr-1">
        {filteredSentences.length} sentences available · {mastered} mastered
      </div>

      {/* Stats Bar */}
      {stats.total > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 text-sm">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ {stats.correct}</span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="text-red-500 dark:text-red-400 font-bold">✗ {stats.incorrect}</span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="text-slate-500 dark:text-slate-400">{accuracy}%</span>
          {stats.streak > 1 && <><span className="text-slate-300 dark:text-slate-600">|</span><span className="text-orange-500 font-bold">🔥 {stats.streak}</span></>}
        </div>
      )}

      {/* Main Card */}
      <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden transition-all duration-300 ${animateCard ? "opacity-0 translate-y-2 scale-[0.98]" : "opacity-100"}`}>
        {/* Badges */}
        <div className="flex items-center justify-between px-6 pt-5">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full text-white ${currentSentence.difficulty === "easy" ? "bg-emerald-500" : currentSentence.difficulty === "medium" ? "bg-amber-500" : "bg-red-500"}`}>{currentSentence.difficulty}</span>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">{currentSentence.cefr}</span>
            <span className="text-xs text-slate-400">{currentSentence.category}</span>
          </div>
          <button onClick={() => speak(currentSentence.french)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-all" title="Listen">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          </button>
        </div>

        {/* Mode: Fill */}
        {mode === "fill" && (
          <>
            <div className="px-6 pt-4 pb-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Translate this sentence</p>
              <p className="text-lg text-slate-600 dark:text-slate-300 italic">&ldquo;{currentSentence.english}&rdquo;</p>
            </div>
            <div className="mx-5 py-7 px-6 bg-gradient-to-br from-slate-50 to-indigo-50/50 dark:from-slate-700/50 dark:to-indigo-900/20 rounded-xl my-2">
              <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed text-center">
                {blankSentence.split("_____").map((part, i, arr) => (
                  <span key={i}>{part}{i < arr.length - 1 && (
                    <span className={`inline-block min-w-[80px] mx-1.5 px-3 py-1 border-b-[3px] rounded-lg text-center transition-all ${feedback === "correct" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600" : feedback === "incorrect" ? "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-600" : "border-dashed border-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20 text-indigo-600"}`}>
                      {feedback ? currentSentence.blankWord : userInput || "?"}
                    </span>
                  )}</span>
                ))}
              </p>
            </div>
          </>
        )}

        {/* Mode: Translate */}
        {mode === "translate" && (
          <>
            <div className="px-6 pt-4 pb-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Write this in French</p>
              <p className="text-xl text-slate-700 dark:text-slate-200 font-semibold">&ldquo;{currentSentence.english}&rdquo;</p>
            </div>
            <div className="mx-5 py-6 px-6 bg-gradient-to-br from-slate-50 to-purple-50/50 dark:from-slate-700/50 dark:to-purple-900/20 rounded-xl my-2 text-center">
              {feedback ? <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{currentSentence.french}</p> : <p className="text-slate-400 italic">Type the full French sentence below</p>}
            </div>
          </>
        )}

        {/* Mode: Listen */}
        {mode === "listen" && (
          <>
            <div className="px-6 pt-4 pb-3 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Listen and write what you hear</p>
              <button onClick={() => speak(currentSentence.french, 0.75)} className="mx-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95">
                <span className="flex items-center gap-3"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg><span className="font-bold text-lg">Play Audio</span></span>
              </button>
              <button onClick={() => speak(currentSentence.french, 0.55)} className="mt-2 text-sm text-indigo-400 hover:text-indigo-300">🐢 Play slower</button>
            </div>
            <div className="mx-5 py-5 px-6 bg-gradient-to-br from-slate-50 to-cyan-50/50 dark:from-slate-700/50 dark:to-cyan-900/20 rounded-xl my-2 text-center">
              {feedback ? <><p className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">{currentSentence.french}</p><p className="text-sm text-slate-500 italic">{currentSentence.english}</p></> : <p className="text-slate-400 italic">Write the French sentence you hear</p>}
            </div>
          </>
        )}

        {/* Hints */}
        <div className="px-6 pt-3">
          {!showHint && !feedback && mode === "fill" && <button onClick={() => setShowHint(true)} className="text-sm text-indigo-500 hover:underline flex items-center gap-1.5">💡 Need a hint?</button>}
          {showHint && !feedback && <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-lg text-sm border border-amber-200/50">Starts with: <strong>{currentSentence.hint}...</strong></div>}
          {!showAnswer && !feedback && mode !== "fill" && <button onClick={() => setShowAnswer(true)} className="text-sm text-amber-500 hover:underline flex items-center gap-1.5">👁 Reveal answer (won&apos;t count)</button>}
          {showAnswer && !feedback && <div className="p-3 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded-lg text-sm border border-slate-200/50"><strong>{currentSentence.french}</strong></div>}
        </div>

        {/* Input */}
        <div className="p-6 pt-4 space-y-3">
          <input ref={inputRef} type="text" value={userInput} onChange={e => setUserInput(e.target.value)} placeholder={mode === "fill" ? "Type the missing word..." : mode === "translate" ? "Type the full French sentence..." : "Write what you hear..."} disabled={!!feedback} autoComplete="off" autoCorrect="off" spellCheck={false} className={`w-full p-4 text-lg text-center border-2 rounded-xl outline-none transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 ${feedback === "correct" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : feedback === "incorrect" ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-slate-200 dark:border-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30"}`} autoFocus />
          {!feedback && (
            <div className="flex gap-3">
              <button onClick={loadNext} className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 transition-all active:scale-[0.98]">Skip</button>
              <button onClick={checkAnswer} disabled={!userInput.trim()} className="flex-[2] py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]">Check Answer</button>
            </div>
          )}
        </div>

        {/* Feedback */}
        {feedback === "correct" && (
          <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-t border-emerald-100 dark:border-emerald-800 text-center">
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center justify-center gap-2">
              ✓ Correct! +{GamificationManager.XP_PER_CORRECT} XP {stats.streak > 2 && <span className="text-orange-500">🔥 x{stats.streak}</span>}
            </div>
            <p className="text-sm text-emerald-500/80">Loading next...</p>
          </div>
        )}
        {feedback === "incorrect" && (
          <div className="p-5 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-t border-red-100 dark:border-red-800">
            <div className="text-center mb-3">
              <p className="text-red-500 font-bold mb-1">Not quite!</p>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {mode === "fill" ? <>The word was: <span className="text-indigo-600 dark:text-indigo-400">{currentSentence.blankWord}</span></> : <>Answer: <span className="text-indigo-600 dark:text-indigo-400">{currentSentence.french}</span></>}
              </p>
            </div>
            <button onClick={loadNext} className="w-full py-3 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-900 transition-all active:scale-[0.98]">Next Sentence →</button>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs font-mono">Enter</kbd> to submit
      </p>
    </div>
  );
};

// ─── Header ───
function Header({ stats, accuracy, mode, setMode }: { stats: { correct: number; total: number }; accuracy: number; mode: PracticeMode; setMode: (m: PracticeMode) => void }) {
  const modes: { key: PracticeMode; label: string; icon: string }[] = [
    { key: "fill", label: "Fill Blank", icon: "✏️" },
    { key: "translate", label: "Translate", icon: "📝" },
    { key: "listen", label: "Listen", icon: "🎧" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100">Sentence Practice</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{mode === "fill" ? "Fill in the missing word" : mode === "translate" ? "Translate English to French" : "Listen and write the French"}</p>
        </div>
        {stats.total > 0 && <div className="text-right"><div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{accuracy}%</div><div className="text-xs text-slate-400">{stats.correct}/{stats.total}</div></div>}
      </div>
      <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        {modes.map(m => (
          <button key={m.key} onClick={() => setMode(m.key)} className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${mode === m.key ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <span className="mr-1">{m.icon}</span>{m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
