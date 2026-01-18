export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type Category =
  | "Things"
  | "Conversations"
  | "Colours"
  | "Food"
  | "Animals"
  | "Travel"
  | "Family"
  | "Clothing"
  | "Verbs";

export interface Conjugation {
  pronoun: string;
  present: string;
  presentPhonetics?: string;
}

export interface VocabularyWord {
  id: string;
  french: string;
  english: string;
  pronunciation?: string;
  frenchPhonetics?: string;
  imageUrl?: string;
  category: Category;
  cefr: CEFRLevel;
  createdAt: number;
  isVerb?: boolean;
  conjugations?: Conjugation[];
  exampleFrench?: string;
  exampleEnglish?: string;
}

// ========================================
// SPACED REPETITION SYSTEM (SRS) TYPES
// ========================================

export interface SRSData {
  wordId: string;
  // SM-2 Algorithm fields
  easeFactor: number; // Default 2.5, min 1.3 - measures how easy a card is
  interval: number; // Days until next review
  repetitions: number; // Number of consecutive correct answers
  nextReviewDate: number; // Timestamp of next scheduled review
  lastReviewDate: number; // Timestamp of last review
  // Stats
  correct: number;
  incorrect: number;
}

export interface CardProgress {
  wordId: string;
  correct: number;
  incorrect: number;
  lastReviewedAt: number;
  difficulty: number; // 0-1, increases with incorrect answers
  // SRS fields
  srs?: SRSData;
}

export interface DailyStats {
  date: string;
  cardsStudied: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
}

// Gamification Types
export interface UserStats {
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null; // YYYY-MM-DD
  dailyGoal: number; // Target XP for the day
  todayXp: number; // XP earned today
  currency: number; // Gems/Lingots
}

export interface UserProgress {
  wordProgress: Record<string, CardProgress>;
  dailyStats: DailyStats[];
  totalWordsLearned: number;
  stats: UserStats; // Added stats object
}

// Quality rating for SRS (0-5 scale like SM-2)
export type SRSQuality = 0 | 1 | 2 | 3 | 4 | 5;
// 0 - Complete blackout, no recall
// 1 - Incorrect, but remembered upon seeing answer
// 2 - Incorrect, but answer seemed easy to recall
// 3 - Correct with serious difficulty
// 4 - Correct after hesitation
// 5 - Perfect response
