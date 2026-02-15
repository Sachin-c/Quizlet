// ============================================================
// MyMemory Translation API Service
// Free API: https://mymemory.translated.net/doc/spec.php
// - 1000 requests/day anonymous
// - 10,000 requests/day with email (optional)
// - No API key required
// ============================================================

const MYMEMORY_BASE = "https://api.mymemory.translated.net/get";

// Optional: add your email for higher rate limits (10k/day instead of 1k/day)
// Set via localStorage: localStorage.setItem("mymemory_email", "your@email.com")
const getEmail = (): string | null => {
  try {
    return localStorage.getItem("mymemory_email");
  } catch {
    return null;
  }
};

// ============================================================
// CACHE — avoid redundant API calls
// ============================================================
interface CacheEntry {
  result: string;
  timestamp: number;
}

const translationCache = new Map<string, CacheEntry>();
const sentenceCache = new Map<string, CacheEntry>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function getCached(cache: Map<string, CacheEntry>, key: string): string | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.result;
  }
  cache.delete(key);
  return null;
}

function setCache(cache: Map<string, CacheEntry>, key: string, value: string) {
  cache.set(key, { result: value, timestamp: Date.now() });
}

// Also persist to localStorage for cross-session caching
function loadPersistentCache() {
  try {
    const saved = localStorage.getItem("translation_cache");
    if (saved) {
      const data = JSON.parse(saved) as Record<string, CacheEntry>;
      Object.entries(data).forEach(([key, entry]) => {
        if (Date.now() - entry.timestamp < CACHE_TTL) {
          translationCache.set(key, entry);
        }
      });
    }
    const savedSentences = localStorage.getItem("sentence_cache");
    if (savedSentences) {
      const data = JSON.parse(savedSentences) as Record<string, CacheEntry>;
      Object.entries(data).forEach(([key, entry]) => {
        if (Date.now() - entry.timestamp < CACHE_TTL) {
          sentenceCache.set(key, entry);
        }
      });
    }
  } catch {
    // Ignore parse errors
  }
}

function savePersistentCache() {
  try {
    const translationData: Record<string, CacheEntry> = {};
    translationCache.forEach((v, k) => { translationData[k] = v; });
    localStorage.setItem("translation_cache", JSON.stringify(translationData));

    const sentenceData: Record<string, CacheEntry> = {};
    sentenceCache.forEach((v, k) => { sentenceData[k] = v; });
    localStorage.setItem("sentence_cache", JSON.stringify(sentenceData));
  } catch {
    // Storage full, ignore
  }
}

// Load cache on module init
loadPersistentCache();

// ============================================================
// TRANSLATION
// ============================================================

export interface TranslationResult {
  translatedText: string;
  match: number; // confidence 0-1
  source: "api" | "cache";
}

/**
 * Translate text between languages using MyMemory API.
 * @param text - Text to translate
 * @param from - Source language code (e.g., "en", "fr")
 * @param to - Target language code (e.g., "fr", "en")
 */
export async function translate(
  text: string,
  from: string = "en",
  to: string = "fr"
): Promise<TranslationResult> {
  const cacheKey = `${from}|${to}|${text.toLowerCase().trim()}`;

  // Check cache first
  const cached = getCached(translationCache, cacheKey);
  if (cached) {
    return { translatedText: cached, match: 1, source: "cache" };
  }

  const params = new URLSearchParams({
    q: text,
    langpair: `${from}|${to}`,
  });

  const email = getEmail();
  if (email) {
    params.set("de", email);
  }

  try {
    const response = await fetch(`${MYMEMORY_BASE}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translated = data.responseData.translatedText;
      const match = data.responseData.match || 0;

      // Cache the result
      setCache(translationCache, cacheKey, translated);
      savePersistentCache();

      return { translatedText: translated, match, source: "api" };
    }

    throw new Error(data.responseDetails || "Translation failed");
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
}

// ============================================================
// SENTENCE GENERATION
// ============================================================

export interface SentenceResult {
  french: string;
  english: string;
  source: "api" | "cache";
}

/**
 * Get an example sentence containing the given French word.
 * Uses MyMemory to translate a template sentence.
 */
export async function getExampleSentence(
  frenchWord: string,
  englishWord: string
): Promise<SentenceResult> {
  const cacheKey = `sentence|${frenchWord.toLowerCase()}`;

  // Check cache first
  const cached = getCached(sentenceCache, cacheKey);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      return { ...parsed, source: "cache" as const };
    } catch {
      // Invalid cache entry
    }
  }

  // Create varied sentence templates in English that use the word
  const templates = [
    `I need to buy a new ${englishWord} for my home.`,
    `The ${englishWord} is on the table in the kitchen.`,
    `Can you show me where the ${englishWord} is?`,
    `My friend gave me a beautiful ${englishWord} as a gift.`,
    `I always use the ${englishWord} when I am at home.`,
    `We found a nice ${englishWord} at the market today.`,
    `The ${englishWord} is very important for everyday life.`,
    `She put the ${englishWord} in her bag before leaving.`,
    `Do you have a ${englishWord}? I need one right now.`,
    `This ${englishWord} is much better than the old one.`,
  ];

  const template = templates[Math.floor(Math.random() * templates.length)];

  try {
    const result = await translate(template, "en", "fr");

    const sentenceData = {
      french: result.translatedText,
      english: template,
    };

    // Cache it
    setCache(sentenceCache, cacheKey, JSON.stringify(sentenceData));
    savePersistentCache();

    return { ...sentenceData, source: "api" };
  } catch (error) {
    console.error("Sentence generation error:", error);
    // Fallback sentence
    return {
      french: `Voici un/une ${frenchWord}.`,
      english: `Here is a ${englishWord}.`,
      source: "cache",
    };
  }
}

/**
 * Batch fetch example sentences for multiple words.
 * Rate-limited to avoid hitting API limits.
 */
export async function batchGetSentences(
  words: { french: string; english: string }[],
  maxConcurrent: number = 3,
  delayMs: number = 300
): Promise<Map<string, SentenceResult>> {
  const results = new Map<string, SentenceResult>();

  for (let i = 0; i < words.length; i += maxConcurrent) {
    const batch = words.slice(i, i + maxConcurrent);
    const promises = batch.map((w) =>
      getExampleSentence(w.french, w.english)
        .then((result) => {
          results.set(w.french, result);
        })
        .catch(() => {
          // Silently fail individual sentences
        })
    );

    await Promise.all(promises);

    // Small delay between batches to be gentle on the API
    if (i + maxConcurrent < words.length) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}

// ============================================================
// API HEALTH CHECK
// ============================================================

export async function checkApiHealth(): Promise<boolean> {
  try {
    const result = await translate("hello", "en", "fr");
    return result.translatedText.toLowerCase().includes("bonjour");
  } catch {
    return false;
  }
}

// ============================================================
// CACHE MANAGEMENT
// ============================================================

export function clearTranslationCache() {
  translationCache.clear();
  sentenceCache.clear();
  localStorage.removeItem("translation_cache");
  localStorage.removeItem("sentence_cache");
}

export function getCacheStats() {
  return {
    translations: translationCache.size,
    sentences: sentenceCache.size,
  };
}
