import type { UserProgress, DailyStats, VocabularyWord } from "../types";
import { SRSManager } from "./srs";
import { GamificationManager } from "./gamification";

const STORAGE_KEY = "french_vocab_progress";

export class StorageManager {
  static getProgress(): UserProgress {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return this.getDefaultProgress();
    }
    try {
      const parsed = JSON.parse(stored);
      // Migration: If stats object is missing, create it from old fields or default
      if (!parsed.stats) {
        return {
          ...parsed,
          stats: {
            xp: 0,
            level: 1,
            currentStreak: parsed.currentStreak || 0,
            longestStreak: parsed.currentStreak || 0,
            lastStudyDate: parsed.lastStudyDate || null,
            dailyGoal: 50,
            todayXp: 0,
            currency: 0,
          },
        };
      }
      return parsed;
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
    isCorrect: boolean,
    wasHard: boolean = false
  ): UserProgress {
    const currentProgress = progress.wordProgress[wordId] || {
      wordId,
      correct: 0,
      incorrect: 0,
      lastReviewedAt: Date.now(),
      difficulty: 0,
      srs: SRSManager.initializeSRS(wordId),
    };

    // Ensure SRS data exists
    if (!currentProgress.srs) {
      currentProgress.srs = SRSManager.initializeSRS(wordId);
    }

    // Update basic stats
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

    // Update SRS data
    const quality = SRSManager.getQualityFromAnswer(isCorrect, wasHard);
    currentProgress.srs = SRSManager.calculateNextReview(currentProgress.srs, quality);

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

    // Update Gamification Stats (Streak & XP)
    let userStats = { ...progress.stats };
    
    // Update streak (GamificationManager handles logic)
    userStats = GamificationManager.updateStreak(userStats);

    // Award XP if correct
    if (isCorrect) {
      const { stats: newStats } = GamificationManager.awardXP(userStats, GamificationManager.XP_PER_CORRECT);
      userStats = newStats;
    }

    return {
      ...progress,
      dailyStats: updatedStats,
      stats: userStats,
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

    // Get SRS stats
    const srsStats = SRSManager.getStats(progress.wordProgress);

    return {
      totalCards,
      reviewedCards,
      masterCards,
      overallAccuracy:
        totalAnswered > 0 ? (totalCorrect / totalAnswered) * 100 : 0,
      todayStats: this.getTodayStats(progress),
      srsStats,
      userStats: progress.stats, // Expose gamification stats
    };
  }

  /**
   * Get cards for SRS-based study session
   */
  static getSRSStudyQueue(
    words: VocabularyWord[],
    progress: UserProgress,
    limit: number = 20
  ): VocabularyWord[] {
    const allWordIds = words.map((w) => w.id);
    const { dueCards, newCards } = SRSManager.getStudyQueue(
      progress.wordProgress,
      allWordIds,
      limit
    );

    const studyIds = [...dueCards, ...newCards];
    const wordMap = new Map(words.map((w) => [w.id, w]));

    return studyIds
      .map((id) => wordMap.get(id))
      .filter((w): w is VocabularyWord => w !== undefined);
  }

  /**
   * Get the next review info for a word
   */
  static getWordSRSInfo(progress: UserProgress, wordId: string) {
    const cardProgress = progress.wordProgress[wordId];
    if (!cardProgress?.srs) {
      return { status: "new", text: "New card" };
    }

    const text = SRSManager.getNextReviewText(cardProgress.srs);
    const isDue = cardProgress.srs.nextReviewDate <= Date.now();

    return {
      status: isDue ? "due" : "scheduled",
      text,
      interval: cardProgress.srs.interval,
      easeFactor: cardProgress.srs.easeFactor,
    };
  }

  private static getDefaultProgress(): UserProgress {
    return {
      wordProgress: {},
      dailyStats: [],
      totalWordsLearned: 0,
      stats: {
        xp: 0,
        level: 1,
        currentStreak: 0,
        longestStreak: 0,
        lastStudyDate: null,
        dailyGoal: 50,
        todayXp: 0,
        currency: 0,
      },
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
