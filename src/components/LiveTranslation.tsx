import { useState, useRef, useCallback, useEffect } from "react";
import { translate, type TranslationResult } from "../utils/translationApi";
import { GenderBadge } from "./GenderBadge";
import { getGender, getArticle } from "../utils/genderData";

interface TranslationEntry {
  id: string;
  originalText: string;
  translatedText: string;
  from: string;
  to: string;
  match: number;
  source: "api" | "cache";
  timestamp: number;
}

export const LiveTranslation: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [direction, setDirection] = useState<"en-fr" | "fr-en">("en-fr");
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<TranslationEntry[]>([]);
  const [currentResult, setCurrentResult] = useState<TranslationResult | null>(null);
  const [showTip, setShowTip] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("translation_history");
      if (saved) {
        setHistory(JSON.parse(saved).slice(0, 50)); // Keep last 50
      }
    } catch { /* ignore */ }
  }, []);

  // Save history
  const saveHistory = (entries: TranslationEntry[]) => {
    try {
      localStorage.setItem("translation_history", JSON.stringify(entries.slice(0, 50)));
    } catch { /* ignore */ }
  };

  const handleTranslate = useCallback(async (text?: string, targetDirection?: "en-fr" | "fr-en") => {
    const textToTranslate = text ?? inputText;
    if (!textToTranslate.trim()) return;

    setIsTranslating(true);
    setError(null);

    const activeDir = targetDirection ?? direction;
    const from = activeDir === "en-fr" ? "en" : "fr";
    const to = activeDir === "en-fr" ? "fr" : "en";

    try {
      const result = await translate(textToTranslate.trim(), from, to);
      setCurrentResult(result);

      const entry: TranslationEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        originalText: textToTranslate.trim(),
        translatedText: result.translatedText,
        from,
        to,
        match: result.match,
        source: result.source,
        timestamp: Date.now(),
      };

      const newHistory = [entry, ...history.filter(h => h.originalText !== textToTranslate.trim())];
      setHistory(newHistory);
      saveHistory(newHistory);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed. Please try again.");
      setCurrentResult(null);
    } finally {
      setIsTranslating(false);
    }
  }, [inputText, direction, history]);

  // Auto-translate after typing stops (debounce 800ms)
  const handleInputChange = (text: string) => {
    setInputText(text);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (text.trim().length >= 2) {
      debounceTimer.current = setTimeout(() => {
        handleTranslate(text);
      }, 800);
    } else {
      setCurrentResult(null);
    }
  };

  const toggleDirection = () => {
    const newDir = direction === "en-fr" ? "fr-en" : "en-fr";
    setDirection(newDir);
    // Swap input/output
    if (currentResult) {
      const translated = currentResult.translatedText;
      setInputText(translated);
      setCurrentResult(null);
      // Auto-translate the swapped text with the NEW direction
      handleTranslate(translated, newDir);
    }
  };

  const speak = (text: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.lang = lang === "fr" ? "fr-FR" : "en-US";
    console.log(utterance,lang);
    utterance.rate = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("translation_history");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Check if current translation is a single French word for gender display
  const getGenderInfo = () => {
    if (direction === "en-fr" && currentResult) {
      const words = currentResult.translatedText.trim().split(/\s+/);
      if (words.length === 1) {
        const word = words[0].toLowerCase().replace(/[^a-zàâäéèêëïîôùûüœæç-]/g, "");
        const gender = getGender(word);
        if (gender) {
          return { word, gender, article: getArticle(word) };
        }
      }
    }
    return null;
  };

  const genderInfo = getGenderInfo();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">
          🌐 Live Translation
        </h1>
 
      </div>

  

      {/* Translation Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
        {/* Direction Toggle */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div className="flex items-center gap-3 flex-1 justify-center">
            <span className={`text-sm font-bold px-3 py-1.5 rounded-lg transition-all ${
              direction === "en-fr" 
                ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" 
                : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
            }`}>
              {direction === "en-fr" ? "🇬🇧 English" : "🇫🇷 Français"}
            </span>

            <button
              onClick={toggleDirection}
              className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg transform hover:scale-110 active:scale-95"
              title="Swap languages"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" />
              </svg>
            </button>

            <span className={`text-sm font-bold px-3 py-1.5 rounded-lg transition-all ${
              direction === "fr-en" 
                ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" 
                : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
            }`}>
              {direction === "en-fr" ? "🇫🇷 Français" : "🇬🇧 English"}
            </span>
          </div>
        </div>

        {/* Input Area */}
        <div className="px-6 pb-4">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleTranslate();
                }
              }}
              placeholder={direction === "en-fr" ? "Type in English..." : "Tapez en français..."}
              className="w-full p-4 text-lg bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-600 rounded-xl outline-none resize-none transition-all focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 text-slate-800 dark:text-slate-100 placeholder-slate-400 min-h-[100px]"
              autoFocus
            />
            
            {/* Character count & clear */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              {inputText && (
                <button
                  onClick={() => { setInputText(""); setCurrentResult(null); }}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 px-2 py-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  Clear
                </button>
              )}
              <span className="text-xs text-slate-400">{inputText.length}/500</span>
            </div>
          </div>

          {/* Translate Button */}
          <button
            onClick={() => handleTranslate()}
            disabled={!inputText.trim() || isTranslating}
            className="w-full mt-3 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isTranslating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Translating...
              </>
            ) : (
              <>
                🔄 Translate
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-slate-700" />

        {/* Result Area */}
        <div className="px-6 py-5">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-xl border border-red-100 dark:border-red-800 text-center">
              <p className="font-bold mb-1">Translation Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {currentResult && !error && (
            <div className="space-y-4 animate-fade-in">
              {/* Translated text */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                      {currentResult.translatedText}
                    </p>

                    {/* Gender Info for single words */}
                    {genderInfo && (
                      <div className="mt-3 flex items-center gap-2">
                        <GenderBadge frenchWord={genderInfo.word} size="md" />
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          → {genderInfo.article} {genderInfo.word}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => speak(
                        currentResult.translatedText,
                        direction === "en-fr" ? "fr" : "en"
                      )}
                      className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
                      title="Listen"
                    >
                      🔊
                    </button>
                    <button
                      onClick={() => copyToClipboard(currentResult.translatedText)}
                      className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      title="Copy"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>

              {/* Confidence indicator */}
              <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${
                  currentResult.source === "cache" 
                    ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400" 
                    : "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                }`}>
                  {currentResult.source === "cache" ? "⚡ Cached" : "🌐 Live"}
                </span>
                {currentResult.match > 0 && (
                  <span>Confidence: {Math.round(currentResult.match * 100)}%</span>
                )}
              </div>
            </div>
          )}

          {!currentResult && !error && !isTranslating && (
            <div className="text-center py-8">
              <div className="text-4xl mb-3 opacity-40">🔤</div>
              <p className="text-slate-400 dark:text-slate-500 text-sm">
                {direction === "en-fr" 
                  ? "Type English text above to see the French translation" 
                  : "Tapez du texte en français pour voir la traduction anglaise"}
              </p>
            </div>
          )}

          {isTranslating && !currentResult && (
            <div className="text-center py-8">
              <div className="w-10 h-10 border-3 border-indigo-200 dark:border-indigo-800 border-t-indigo-500 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-slate-400 dark:text-slate-500 text-sm">Translating...</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Phrases */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 border border-slate-100 dark:border-slate-700">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          ⚡ Quick Phrases
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            direction === "en-fr" ? "How are you?" : "Comment allez-vous ?",
            direction === "en-fr" ? "Thank you very much" : "Merci beaucoup",
            direction === "en-fr" ? "Where is the train station?" : "Où est la gare ?",
            direction === "en-fr" ? "I would like a coffee please" : "Je voudrais un café s'il vous plaît",
            direction === "en-fr" ? "What time is it?" : "Quelle heure est-il ?",
            direction === "en-fr" ? "I don't understand" : "Je ne comprends pas",
            direction === "en-fr" ? "Can you help me?" : "Pouvez-vous m'aider ?",
            direction === "en-fr" ? "The weather is nice today" : "Il fait beau aujourd'hui",
          ].map((phrase) => (
            <button
              key={phrase}
              onClick={() => {
                setInputText(phrase);
                handleTranslate(phrase);
              }}
              className="px-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>

      {/* Translation History */}
      {history.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              📜 Recent Translations
            </h3>
            <button
              onClick={clearHistory}
              className="text-xs text-red-400 hover:text-red-600 dark:hover:text-red-300 font-medium"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {history.slice(0, 15).map((entry) => (
              <button
                key={entry.id}
                onClick={() => {
                  const newDir = entry.from === "en" ? "en-fr" : "fr-en";
                  setDirection(newDir as "en-fr" | "fr-en");
                  setInputText(entry.originalText);
                  setCurrentResult({
                    translatedText: entry.translatedText,
                    match: entry.match,
                    source: "cache",
                  });
                }}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left group"
              >
                <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
                  {entry.from === "en" ? "🇬🇧→🇫🇷" : "🇫🇷→🇬🇧"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-600 dark:text-slate-300 truncate">{entry.originalText}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{entry.translatedText}</p>
                </div>
                <span className="text-xs text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
