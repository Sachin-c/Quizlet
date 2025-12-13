// Types and interfaces for the French vocabulary app

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type Category =
  | "Things"
  | "Conversations"
  | "Colours"
  | "Food"
  | "Animals"
  | "Travel"
  | "Family"
  | "Work"
  | "Clothing"
  | "Places"
  | "Verbs";

export interface Conjugation {
  pronoun: string; // je, tu, il/elle, nous, vous, ils/elles
  present: string;
  presentPhonetics?: string; // Romanized phonetics for the conjugation
  past?: string;
  future?: string;
}

export interface VocabularyWord {
  id: string;
  french: string;
  english: string;
  pronunciation?: string;
  frenchPhonetics?: string; // Romanized phonetics for French (e.g., "lee-vruh")
  imageUrl?: string; // Optional image URL or emoji
  category: Category;
  cefr: CEFRLevel;
  createdAt: number;
  isVerb?: boolean; // Whether this word is a verb
  conjugations?: Conjugation[]; // Verb conjugations if isVerb is true
}

export interface CardProgress {
  wordId: string;
  correct: number;
  incorrect: number;
  lastReviewedAt: number;
  difficulty: number; // 0-1, increases with incorrect answers
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  cardsStudied: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number; // percentage
}

export interface UserProgress {
  wordProgress: Record<string, CardProgress>;
  dailyStats: DailyStats[];
  totalWordsLearned: number;
  currentStreak: number;
  lastStudyDate: string | null;
}

export interface StudySession {
  sessionId: string;
  startTime: number;
  endTime?: number;
  cardsReviewed: number;
  correctAnswers: number;
  incorrectAnswers: number;
}
