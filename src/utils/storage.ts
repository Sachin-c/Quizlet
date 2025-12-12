import type { UserProgress, DailyStats, VocabularyWord } from "../types";

const STORAGE_KEY = "french_vocab_progress";

export class StorageManager {
  static getProgress(): UserProgress {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return this.getDefaultProgress();
    }
    try {
      return JSON.parse(stored);
    } catch {
      return this.getDefaultProgress();
    }
  }

  static saveProgress(progress: UserProgress): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  static updateCardProgress(
    progress: UserProgress,
    wordId: string,
    isCorrect: boolean
  ): UserProgress {
    const currentProgress = progress.wordProgress[wordId] || {
      wordId,
      correct: 0,
      incorrect: 0,
      lastReviewedAt: Date.now(),
      difficulty: 0,
    };

    if (isCorrect) {
      currentProgress.correct++;
      currentProgress.difficulty = Math.max(
        0,
        currentProgress.difficulty - 0.1
      );
    } else {
      currentProgress.incorrect++;
      currentProgress.difficulty = Math.min(
        1,
        currentProgress.difficulty + 0.2
      );
    }

    currentProgress.lastReviewedAt = Date.now();

    const updatedProgress = {
      ...progress,
      wordProgress: {
        ...progress.wordProgress,
        [wordId]: currentProgress,
      },
    };

    return updatedProgress;
  }

  static getTodayStats(progress: UserProgress): DailyStats {
    const today = this.getTodayDateString();
    const existingStats = progress.dailyStats.find(
      (stat) => stat.date === today
    );

    if (existingStats) {
      return existingStats;
    }

    return {
      date: today,
      cardsStudied: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      accuracy: 0,
    };
  }

  static updateDailyStats(
    progress: UserProgress,
    isCorrect: boolean
  ): UserProgress {
    const today = this.getTodayDateString();
    const statsIndex = progress.dailyStats.findIndex(
      (stat) => stat.date === today
    );

    let todayStats: DailyStats;
    if (statsIndex >= 0) {
      todayStats = { ...progress.dailyStats[statsIndex] };
    } else {
      todayStats = {
        date: today,
        cardsStudied: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        accuracy: 0,
      };
    }

    todayStats.cardsStudied++;
    if (isCorrect) {
      todayStats.correctAnswers++;
    } else {
      todayStats.incorrectAnswers++;
    }

    const total = todayStats.correctAnswers + todayStats.incorrectAnswers;
    todayStats.accuracy =
      total > 0 ? (todayStats.correctAnswers / total) * 100 : 0;

    const updatedStats = [...progress.dailyStats];
    if (statsIndex >= 0) {
      updatedStats[statsIndex] = todayStats;
    } else {
      updatedStats.push(todayStats);
    }

    // Update streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = this.formatDate(yesterday);

    let currentStreak = progress.currentStreak;
    if (
      progress.lastStudyDate === yesterdayStr ||
      progress.lastStudyDate === today
    ) {
      if (progress.lastStudyDate !== today) {
        currentStreak++;
      }
    } else if (progress.lastStudyDate !== today) {
      currentStreak = 1;
    }

    return {
      ...progress,
      dailyStats: updatedStats,
      lastStudyDate: today,
      currentStreak,
      totalWordsLearned: Object.keys(progress.wordProgress).length,
    };
  }

  static calculateStats(words: VocabularyWord[], progress: UserProgress) {
    const totalCards = words.length;
    const reviewedCards = Object.keys(progress.wordProgress).length;
    const masterCards = Object.values(progress.wordProgress).filter(
      (p) => p.correct >= 5 && p.difficulty < 0.3
    ).length;

    const totalAnswered =
      progress.dailyStats.reduce((sum, stat) => sum + stat.cardsStudied, 0) ||
      0;
    const totalCorrect =
      progress.dailyStats.reduce((sum, stat) => sum + stat.correctAnswers, 0) ||
      0;

    return {
      totalCards,
      reviewedCards,
      masterCards,
      overallAccuracy:
        totalAnswered > 0 ? (totalCorrect / totalAnswered) * 100 : 0,
      todayStats: this.getTodayStats(progress),
    };
  }

  private static getDefaultProgress(): UserProgress {
    return {
      wordProgress: {},
      dailyStats: [],
      totalWordsLearned: 0,
      currentStreak: 0,
      lastStudyDate: null,
    };
  }

  private static getTodayDateString(): string {
    return this.formatDate(new Date());
  }

  private static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  static clearAllData(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
