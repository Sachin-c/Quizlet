/**
 * Adaptive Quiz Engine
 * 
 * Tracks user mistakes by category/tense, applies spaced repetition
 * principles to quiz generation, and progressively increases difficulty.
 */

import type {
  AdaptiveQuestion,
  AdaptiveState,
  CEFRLevel,
  ErrorPattern,
  Category,
  VerbTense,
  VocabularyWord,
} from "../types";
import { tenseModules } from "../data/verbTenses";

const ADAPTIVE_STORAGE_KEY = "french_adaptive_state";

// CEFR progression order
const CEFR_ORDER: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export class AdaptiveQuizEngine {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STATE MANAGEMENT
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━

  static getState(): AdaptiveState {
    try {
      const stored = localStorage.getItem(ADAPTIVE_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch { /* fallback */ }
    return this.getDefaultState();
  }

  static saveState(state: AdaptiveState): void {
    localStorage.setItem(ADAPTIVE_STORAGE_KEY, JSON.stringify(state));
  }

  static getDefaultState(): AdaptiveState {
    return {
      currentCEFR: "A1",
      errorPatterns: {},
      consecutiveCorrect: 0,
      consecutiveIncorrect: 0,
      questionsAnswered: 0,
    };
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ERROR TRACKING
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━

  static recordAnswer(
    state: AdaptiveState,
    isCorrect: boolean,
    category?: Category | string,
    tense?: VerbTense
  ): AdaptiveState {
    const updated = { ...state };
    updated.questionsAnswered++;

    if (isCorrect) {
      updated.consecutiveCorrect++;
      updated.consecutiveIncorrect = 0;
    } else {
      updated.consecutiveIncorrect++;
      updated.consecutiveCorrect = 0;

      // Track error pattern
      const key = this.getPatternKey(category, tense);
      if (key) {
        const pattern = updated.errorPatterns[key] || {
          category: category || "general",
          tense,
          errorCount: 0,
          lastErrorDate: 0,
          totalAttempts: 0,
        };
        pattern.errorCount++;
        pattern.lastErrorDate = Date.now();
        pattern.totalAttempts++;
        updated.errorPatterns[key] = pattern;
      }
    }

    // Also track attempts for existing patterns
    if (isCorrect) {
      const key = this.getPatternKey(category, tense);
      if (key && updated.errorPatterns[key]) {
        updated.errorPatterns[key].totalAttempts++;
      }
    }

    // Auto level-up logic
    updated.currentCEFR = this.calculateLevel(updated);

    return updated;
  }

  private static getPatternKey(category?: Category | string, tense?: VerbTense): string {
    if (tense) return `tense:${tense}`;
    if (category) return `cat:${category}`;
    return "general";
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // LEVEL CALCULATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━

  static calculateLevel(state: AdaptiveState): CEFRLevel {
    const currentIdx = CEFR_ORDER.indexOf(state.currentCEFR);

    // Level UP: 10+ consecutive correct → suggest next level
    if (state.consecutiveCorrect >= 10 && currentIdx < CEFR_ORDER.length - 1) {
      return CEFR_ORDER[currentIdx + 1];
    }

    // Level DOWN: 5+ consecutive incorrect → drop back
    if (state.consecutiveIncorrect >= 5 && currentIdx > 0) {
      return CEFR_ORDER[currentIdx - 1];
    }

    return state.currentCEFR;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // QUESTION GENERATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━

  static generateQuizQuestions(
    words: VocabularyWord[],
    state: AdaptiveState,
    count: number = 10
  ): AdaptiveQuestion[] {
    const questions: AdaptiveQuestion[] = [];
    const targetLevel = state.currentCEFR;
    const levelIdx = CEFR_ORDER.indexOf(targetLevel);

    // Mix of question types weighted by errors
    const weakAreas = this.getWeakAreas(state);
    
    // 40% from weak areas, 30% from current level, 30% mixed/new
    const weakCount = Math.ceil(count * 0.4);
    const currentCount = Math.ceil(count * 0.3);
    const mixedCount = count - weakCount - currentCount;

    // Generate weak-area questions
    for (let i = 0; i < weakCount; i++) {
      const q = this.generateWeakAreaQuestion(words, weakAreas, targetLevel);
      if (q) questions.push(q);
    }

    // Generate current-level questions
    const currentLevelWords = words.filter((w) => w.cefr === targetLevel);
    for (let i = 0; i < currentCount; i++) {
      const q = this.generateVocabQuestion(currentLevelWords, words);
      if (q) questions.push(q);
    }

    // Generate mixed-level questions (current + one above)
    const nextLevel = levelIdx < CEFR_ORDER.length - 1 ? CEFR_ORDER[levelIdx + 1] : targetLevel;
    const mixedWords = words.filter((w) => w.cefr === targetLevel || w.cefr === nextLevel);
    for (let i = 0; i < mixedCount; i++) {
      const q = this.generateVocabQuestion(mixedWords, words);
      if (q) questions.push(q);
    }

    // Add verb tense questions if appropriate level
    if (levelIdx >= 1) { // A2+
      const verbQ = this.generateVerbTenseQuestion(targetLevel);
      if (verbQ) questions.push(verbQ);
    }

    // Shuffle and return
    return questions.sort(() => Math.random() - 0.5).slice(0, count);
  }

  private static getWeakAreas(state: AdaptiveState): ErrorPattern[] {
    return Object.values(state.errorPatterns)
      .filter((p) => {
        const errorRate = p.totalAttempts > 0 ? p.errorCount / p.totalAttempts : 0;
        return errorRate > 0.3 || p.errorCount >= 3;
      })
      .sort((a, b) => b.errorCount - a.errorCount);
  }

  private static generateWeakAreaQuestion(
    words: VocabularyWord[],
    weakAreas: ErrorPattern[],
    _targetLevel: CEFRLevel
  ): AdaptiveQuestion | null {
    if (weakAreas.length === 0) return this.generateVocabQuestion(words, words);

    const area = weakAreas[Math.floor(Math.random() * Math.min(3, weakAreas.length))];
    
    if (area.tense) {
      return this.generateVerbTenseQuestion(_targetLevel, area.tense);
    }

    const categoryWords = words.filter(
      (w) => w.category === area.category
    );
    if (categoryWords.length === 0) return null;
    return this.generateVocabQuestion(categoryWords, words);
  }

  private static generateVocabQuestion(
    pool: VocabularyWord[],
    allWords: VocabularyWord[]
  ): AdaptiveQuestion | null {
    if (pool.length === 0) return null;

    const word = pool[Math.floor(Math.random() * pool.length)];
    const type = Math.random();

    if (type < 0.35) {
      // Fill in the blank
      return this.createFillBlankQuestion(word);
    } else if (type < 0.65) {
      // EN → FR translation
      return this.createTranslateEnFrQuestion(word, allWords);
    } else if (type < 0.85) {
      // FR → EN translation  
      return this.createTranslateFrEnQuestion(word, allWords);
    } else {
      // Error correction
      return this.createErrorCorrectionQuestion(word);
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // QUESTION TYPE BUILDERS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━

  private static createFillBlankQuestion(word: VocabularyWord): AdaptiveQuestion {
    const sentence = word.exampleFrench || `Je vois un(e) ${word.french}.`;
    const blanked = sentence.replace(
      new RegExp(`\\b${word.french.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'),
      '______'
    );

    return {
      id: `fb-${word.id}-${Date.now()}`,
      type: "fill-blank",
      prompt: blanked,
      correctAnswer: word.french,
      acceptableAnswers: [word.french.toLowerCase()],
      hint: word.french.substring(0, 2),
      explanation: word.exampleEnglish || `${word.french} = ${word.english}`,
      cefr: word.cefr,
      category: word.category,
    };
  }

  private static createTranslateEnFrQuestion(
    word: VocabularyWord,
    allWords: VocabularyWord[]
  ): AdaptiveQuestion {
    // Generate MC options
    const others = allWords
      .filter((w) => w.id !== word.id && w.category === word.category)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [...others.map((w) => w.french), word.french].sort(
      () => Math.random() - 0.5
    );

    return {
      id: `en-fr-${word.id}-${Date.now()}`,
      type: "translate-en-fr",
      prompt: `Translate to French: "${word.english}"`,
      correctAnswer: word.french,
      options: options.length >= 4 ? options : undefined,
      explanation: word.exampleFrench
        ? `Example: ${word.exampleFrench}`
        : undefined,
      cefr: word.cefr,
      category: word.category,
    };
  }

  private static createTranslateFrEnQuestion(
    word: VocabularyWord,
    allWords: VocabularyWord[]
  ): AdaptiveQuestion {
    const others = allWords
      .filter((w) => w.id !== word.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [...others.map((w) => w.english), word.english].sort(
      () => Math.random() - 0.5
    );

    return {
      id: `fr-en-${word.id}-${Date.now()}`,
      type: "translate-fr-en",
      prompt: `What does "${word.french}" mean?`,
      correctAnswer: word.english,
      options,
      cefr: word.cefr,
      category: word.category,
    };
  }

  private static createErrorCorrectionQuestion(word: VocabularyWord): AdaptiveQuestion {
    // Create a sentence with a deliberate error
    const errorTypes = [
      {
        wrong: `Je mange un ${word.french}.`,
        correct: `Je mange une ${word.french}.`,
        explanation: `"${word.french}" is feminine — use "une" not "un".`,
        applicable: true, // Simplified
      },
      {
        wrong: word.exampleFrench
          ? word.exampleFrench.replace(/é/g, "e").replace(/è/g, "e")
          : `Le ${word.french} est la.`,
        correct: word.exampleFrench || `Le ${word.french} est là.`,
        explanation: "Check the accents — they change the meaning!",
        applicable: !!word.exampleFrench,
      },
    ];

    const applicable = errorTypes.filter((e) => e.applicable);
    const chosen = applicable[Math.floor(Math.random() * applicable.length)] || errorTypes[0];

    return {
      id: `ec-${word.id}-${Date.now()}`,
      type: "error-correction",
      prompt: `Find and fix the error: "${chosen.wrong}"`,
      correctAnswer: chosen.correct,
      explanation: chosen.explanation,
      cefr: word.cefr,
      category: word.category,
    };
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // VERB TENSE QUESTIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━

  static generateVerbTenseQuestion(
    targetLevel: CEFRLevel,
    specificTense?: VerbTense
  ): AdaptiveQuestion | null {
    const levelIdx = CEFR_ORDER.indexOf(targetLevel);
    const availableLevels = CEFR_ORDER.slice(0, levelIdx + 1);
    
    const modules = tenseModules.filter(
      (m) =>
        availableLevels.includes(m.cefr) &&
        (!specificTense || m.tense === specificTense)
    );

    if (modules.length === 0) return null;

    const module = modules[Math.floor(Math.random() * modules.length)];
    const verb = module.verbs[Math.floor(Math.random() * module.verbs.length)];
    const conj = verb.conjugations[Math.floor(Math.random() * verb.conjugations.length)];

    const questionType = Math.random();

    if (questionType < 0.5) {
      // Conjugation fill-in
      return {
        id: `vt-${verb.id}-${Date.now()}`,
        type: "fill-blank",
        prompt: `${module.displayName}: Conjugate "${verb.infinitive}" for ${conj.pronoun}: ${conj.pronoun} ______`,
        correctAnswer: conj.form,
        acceptableAnswers: [conj.form.toLowerCase()],
        hint: conj.form.substring(0, 3),
        explanation: `${conj.pronoun} ${conj.form} (${verb.english})`,
        cefr: module.cefr,
        tense: module.tense,
      };
    } else {
      // Sentence translation using tense examples
      const example = verb.examples[Math.floor(Math.random() * verb.examples.length)];
      return {
        id: `vt-sent-${verb.id}-${Date.now()}`,
        type: "translate-en-fr",
        prompt: `Translate (use ${module.displayName}): "${example.english}"`,
        correctAnswer: example.french,
        explanation: `${module.displayName}: ${example.french}`,
        cefr: module.cefr,
        tense: module.tense,
      };
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // LISTENING-STYLE QUESTIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━

  static generateListeningQuestion(
    word: VocabularyWord
  ): AdaptiveQuestion {
    // Short, audio-friendly sentence
    const sentences = [
      `${word.french}.`,
      word.exampleFrench || `C'est un(e) ${word.french}.`,
    ];
    const sentence = sentences[Math.floor(Math.random() * sentences.length)];

    return {
      id: `listen-${word.id}-${Date.now()}`,
      type: "listening",
      prompt: `Listen and type what you hear: "${sentence}"`,
      correctAnswer: sentence,
      acceptableAnswers: [sentence.toLowerCase(), sentence.replace(/[.,!?]/g, '').toLowerCase()],
      cefr: word.cefr,
      category: word.category,
    };
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ANSWER VALIDATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━

  static checkAnswer(question: AdaptiveQuestion, userAnswer: string): boolean {
    const normalize = (s: string) =>
      s.toLowerCase().trim()
        .replace(/['']/g, "'")
        .replace(/\s+/g, " ");

    const normalizedUser = normalize(userAnswer);
    const normalizedCorrect = normalize(question.correctAnswer);

    if (normalizedUser === normalizedCorrect) return true;

    // Check acceptable alternatives
    if (question.acceptableAnswers) {
      return question.acceptableAnswers.some(
        (alt) => normalize(alt) === normalizedUser
      );
    }

    // Fuzzy: allow minor diacritic differences for typing
    const stripDiacritics = (s: string) =>
      s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (stripDiacritics(normalizedUser) === stripDiacritics(normalizedCorrect)) {
      return true; // Close enough — but could flag for accent practice
    }

    return false;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ANALYTICS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━

  static getProgressReport(state: AdaptiveState) {
    const weakCategories = Object.entries(state.errorPatterns)
      .filter(([_key, p]) => p.totalAttempts > 0 && p.errorCount / p.totalAttempts > 0.3)
      .map(([key, p]) => ({
        area: key,
        errorRate: Math.round((p.errorCount / p.totalAttempts) * 100),
        errors: p.errorCount,
        total: p.totalAttempts,
      }))
      .sort((a, b) => b.errorRate - a.errorRate);

    return {
      currentLevel: state.currentCEFR,
      totalQuestions: state.questionsAnswered,
      streak: state.consecutiveCorrect,
      weakAreas: weakCategories,
      readyForLevelUp: state.consecutiveCorrect >= 8,
      needsReinforcement: state.consecutiveIncorrect >= 3,
    };
  }
}
