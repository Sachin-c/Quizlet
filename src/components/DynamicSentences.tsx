import { useState, useEffect, useCallback, useRef } from "react";
import type { VocabularyWord } from "../types";
import { StorageManager } from "../utils/storage";
import { GamificationManager } from "../utils/gamification";
import { GenderBadge } from "./GenderBadge";

interface DynamicSentencesProps {
  allWords: VocabularyWord[];
  onProgressUpdate?: () => void;
}

interface SentenceData {
  frenchSentence: string;
  englishTranslation: string;
  blankSentence: string;
  answer: string;
}

// ─── Persistent cache: word → array of fetched sentences ───
const CACHE_KEY = "tatoeba_sentence_cache";

function loadCache(): Record<string, SentenceData[]> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCache(cache: Record<string, SentenceData[]>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Storage full — silently fail
  }
}

// Track which sentence index we've shown per word (so we cycle through them)
const usedIndexes = new Map<string, number>();

// Circuit breaker for API calls
let consecutiveApiFailures = 0;
const MAX_API_FAILURES = 3;

// ─── Fetch real sentences from MyMemory (Direct API, No Proxy) ───
async function fetchSentencesFromTatoeba(
  frenchWord: string
): Promise<SentenceData[]> {
  const cache = loadCache();

  // Return cached if we already have sentences for this word
  if (cache[frenchWord] && cache[frenchWord].length > 0) {
    return cache[frenchWord];
  }

  // Circuit breaker: if API is failing, stop hammering it
  if (consecutiveApiFailures >= MAX_API_FAILURES) {
    return [];
  }

  try {
    // MyMemory API supports CORS directly, so no proxy needed!
    // We search for the French word to get French -> English examples
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      frenchWord
    )}&langpair=fr|en`;
    
    // Create a timeout promise (10 seconds - give it time!)
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), 10000)
    );

    const response = await Promise.race([
      fetch(url),
      timeoutPromise
    ]);

    if (!response.ok) throw new Error(`MyMemory fetch failed: ${response.status}`);

    const data = await response.json();
    const results: SentenceData[] = [];

    // MyMemory returns a 'matches' array with various translation pairs
    let validCount = 0;
    for (const match of data.matches || []) {
      const frenchText = match.segment;
      const englishText = match.translation;

      // Validate content
      if (!frenchText || !englishText) continue;

      // Only use sentences that actually contain the word (case-insensitive)
      const wordRegex = new RegExp(`\\b${frenchWord}(e|s|x|es)?\\b`, "i");
      const matchResult = frenchText.match(wordRegex);
      
      if (!matchResult) {
        continue;
      }
      
      const actualMatchedWord = matchResult[0]; // e.g., "pommes" instead of "pomme"

      // Skip very short (< 3 words) or very long (> 25 words) sentences
      const wordCount = frenchText.split(/\s+/).length;
      if (wordCount < 3 || wordCount > 25) continue;

      // Create the blank version
      const blankSentence = frenchText.replace(wordRegex, "_____");

      results.push({
        frenchSentence: frenchText,
        englishTranslation: englishText,
        blankSentence,
        answer: actualMatchedWord, // Use the actual word from the sentence so context is correct
      });
      validCount++;
    }

    // console.log(`MyMemory for "${frenchWord}": Found ${data.matches?.length || 0}, Valid: ${validCount}`);

    // Cache the results if we found any
    if (results.length > 0) {
      cache[frenchWord] = results;
      saveCache(cache);
      consecutiveApiFailures = 0; // Reset on success
    }

    return results;
  } catch (err) {
    consecutiveApiFailures++; // Increment failure count
    return [];
  }
}

// ─── Fallback: use existing example sentence from vocabulary data ───
function getFallbackSentence(word: VocabularyWord): SentenceData | null {
  if (!word.exampleFrench || !word.exampleEnglish) return null;

  const wordRegex = new RegExp(`\\b${word.french}\\b`, "i");
  if (!wordRegex.test(word.exampleFrench)) return null;

  return {
    frenchSentence: word.exampleFrench,
    englishTranslation: word.exampleEnglish,
    blankSentence: word.exampleFrench.replace(wordRegex, "_____"),
    answer: word.french,
  };
}

// ─── Pick one sentence for a word (cycles through available ones) ───
function pickSentence(
  sentences: SentenceData[],
  frenchWord: string
): SentenceData {
  const idx = usedIndexes.get(frenchWord) || 0;
  const sentence = sentences[idx % sentences.length];
  usedIndexes.set(frenchWord, idx + 1);
  return sentence;
}

// ─── Component ───
export const DynamicSentences: React.FC<DynamicSentencesProps> = ({
  allWords,
  onProgressUpdate,
}) => {
  const [currentWord, setCurrentWord] = useState<VocabularyWord | null>(null);
  const [currentSentence, setCurrentSentence] = useState<SentenceData | null>(null);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, total: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  // Pool of non-verb words to pull from
  const wordPool = useRef(
    allWords.filter((w) => !w.isVerb && w.french.length > 2)
  );

  // Pick a random word that we haven't used recently
  const recentWords = useRef<string[]>([]);

  const pickRandomWord = useCallback((): VocabularyWord => {
    const pool = wordPool.current.filter(
      (w) => !recentWords.current.includes(w.french)
    );
    const candidates = pool.length > 0 ? pool : wordPool.current;
    const word = candidates[Math.floor(Math.random() * candidates.length)];

    // Track last 20 words shown
    recentWords.current.push(word.french);
    if (recentWords.current.length > 20) recentWords.current.shift();

    return word;
  }, []);

  // Pick a word known to have a static example
  const pickSafeWord = useCallback((): VocabularyWord => {
    const safePool = allWords.filter(w => w.exampleFrench && w.exampleEnglish);
    if (safePool.length === 0) return allWords[Math.floor(Math.random() * allWords.length)];
    return safePool[Math.floor(Math.random() * safePool.length)];
  }, [allWords]);

  // Load a new sentence for a new word
  const loadNextSentence = useCallback(async (recursionDepth = 0) => {
    setIsLoading(true);
    setFeedback(null);
    setUserInput("");
    setShowHint(false);

    // If we are recursing too much, force a safe word to break the loop
    const useSafeMode = recursionDepth >= 3;
    const word = useSafeMode ? pickSafeWord() : pickRandomWord();
    
    setCurrentWord(word);

    // Try Tatoeba first (unless we are in safe mode loop, then skip api to save time)
    const sentences = await fetchSentencesFromTatoeba(word.french);

    if (sentences.length > 0) {
      setCurrentSentence(pickSentence(sentences, word.french));
    } else {
      // Fallback to the word's own example sentence
      const fallback = getFallbackSentence(word);
      if (fallback) {
        setCurrentSentence(fallback);
      } else {
        // Last resort — skip this word and try another
        // Limit recursion to avoid infinite loops and API spam
        if (recursionDepth < 10) {
          setIsLoading(false);
          loadNextSentence(recursionDepth + 1);
          return;
        } else {
          // If we hit depth 10, just stop trying to avoid crash
          console.error("Failed to find a sentence after 10 attempts");
        }
      }
    }

    setIsLoading(false);

    // Focus input after loading
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [pickRandomWord, pickSafeWord]);

  // Load first sentence on mount
  useEffect(() => {
    loadNextSentence();
  }, []);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const normalizeAnswer = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/'/g, "'")
      .replace(/`/g, "'");
  };

  const checkAnswer = () => {
    if (!currentSentence || !userInput.trim()) return;

    const userNorm = normalizeAnswer(userInput);
    const answerNorm = normalizeAnswer(currentSentence.answer);

    // Also accept without accents
    const stripAccents = (s: string) =>
      s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const isCorrect =
      userNorm === answerNorm ||
      stripAccents(userNorm) === stripAccents(answerNorm);

    setFeedback(isCorrect ? "correct" : "incorrect");

    // Update progress
    if (currentWord) {
      const progress = StorageManager.getProgress();
      const updated = StorageManager.updateCardProgress(
        progress,
        currentWord.id,
        isCorrect,
        false
      );
      const finalProgress = StorageManager.updateDailyStats(updated, isCorrect);
      StorageManager.saveProgress(finalProgress);
      if (onProgressUpdate) onProgressUpdate();
    }

    setSessionStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      setTimeout(() => loadNextSentence(), 1400);
    }
  };

  // Keyboard shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) {
        if (e.key === "Enter") {
          e.preventDefault();
          if (!feedback) {
            checkAnswer();
          } else if (feedback === "incorrect") {
            loadNextSentence();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [feedback, userInput, currentSentence]);

  const accuracy =
    sessionStats.total > 0
      ? Math.round((sessionStats.correct / sessionStats.total) * 100)
      : 0;

  // ─── Loading State ───
  if (isLoading || !currentSentence || !currentWord) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-10 text-center border border-slate-100 dark:border-slate-700">
          <div className="flex justify-center mb-6">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-600" />
              <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Loading next sentence...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100">
            Sentence Practice
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Fill in the missing word from real sentences
          </p>
        </div>
        {sessionStats.total > 0 && (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {sessionStats.correct} correct
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 dark:text-slate-400">
              {accuracy}%
            </span>
          </div>
        )}
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
        {/* English Translation */}
        <div className="px-8 pt-8 pb-4">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
            What does this mean?
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-300 italic leading-relaxed">
            &ldquo;{currentSentence.englishTranslation}&rdquo;
          </p>
        </div>

        {/* Sentence with Blank */}
        <div className="mx-6 py-8 px-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800/50 rounded-xl my-2">
          <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed text-center">
            {currentSentence.blankSentence.split("_____").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="inline-block min-w-[100px] mx-1.5 px-3 py-1.5 border-b-4 border-dashed border-indigo-400 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded text-center">
                    {feedback ? currentSentence.answer : userInput || "?"}
                  </span>
                )}
              </span>
            ))}
          </p>

          {/* Gender + Word info */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <GenderBadge frenchWord={currentWord.french} showArticle={true} size="md" />
            <span className="text-sm text-slate-400 dark:text-slate-500">
              ({currentWord.english})
            </span>
          </div>
        </div>

        {/* Hint */}
        <div className="px-8 pt-2">
          {!showHint && !feedback && (
            <button
              onClick={() => setShowHint(true)}
              className="text-sm text-indigo-500 dark:text-indigo-400 hover:underline transition-colors"
            >
              Need a hint?
            </button>
          )}
          {showHint && !feedback && (
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-lg text-sm border border-amber-100 dark:border-amber-800">
              The word starts with: <strong>{currentSentence.answer.slice(0, 3)}...</strong>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-8 pt-4 space-y-4">
          <div className="flex gap-3">
            <input
              ref={inputRef}
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
                  : "border-slate-200 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30"
              }`}
              autoFocus
            />
            <button
              onClick={() => speak(currentSentence.frenchSentence)}
              className="p-4 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              title="Listen to the full sentence"
            >
              🔊
            </button>
          </div>

          {!feedback && (
            <div className="flex gap-3">
              <button
                onClick={() => loadNextSentence()}
                className="flex-1 py-3.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Skip
              </button>
              <button
                onClick={checkAnswer}
                disabled={!userInput.trim()}
                className="flex-[2] py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check Answer
              </button>
            </div>
          )}
        </div>

        {/* Feedback */}
        {feedback === "correct" && (
          <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 border-t border-emerald-100 dark:border-emerald-800 text-center">
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
              Correct! +{GamificationManager.XP_PER_CORRECT} XP
            </div>
            <p className="text-sm text-emerald-500 dark:text-emerald-400/70">
              Loading next...
            </p>
          </div>
        )}

        {feedback === "incorrect" && (
          <div className="p-5 bg-red-50 dark:bg-red-900/20 border-t border-red-100 dark:border-red-800">
            <div className="text-center mb-3">
              <p className="text-red-500 dark:text-red-400 font-bold mb-1">
                Not quite!
              </p>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                The answer was: <span className="text-indigo-600 dark:text-indigo-400">{currentSentence.answer}</span>
              </p>
            </div>
            <button
              onClick={() => loadNextSentence()}
              className="w-full py-3 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors"
            >
              Next Sentence →
            </button>
          </div>
        )}
      </div>

      {/* Keyboard hint */}
      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs font-mono">Enter</kbd> to submit
      </p>
    </div>
  );
};
