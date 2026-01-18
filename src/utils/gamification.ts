import type { UserStats } from "../types";

export class GamificationManager {
  // XP Constants
  static readonly XP_PER_CORRECT = 10;
  static readonly XP_PER_LESSON_COMPLETE = 50;
  static readonly XP_BONUS_STREAK = 5;

  // Level Constants
  static readonly BASE_XP_PER_LEVEL = 100;
  static readonly LEVEL_MULTIPLIER = 1.2; // Each level requires 20% more XP

  /**
   * Calculate level based on total XP
   */
  static getLevelFromXP(totalXp: number): number {
    // Determine level: Level 1 = 0-100, Level 2 = 100-220, etc.
    let level = 1;
    let xpRequired = this.BASE_XP_PER_LEVEL;
    let currentXp = totalXp;

    while (currentXp >= xpRequired) {
      currentXp -= xpRequired;
      level++;
      xpRequired = Math.floor(xpRequired * this.LEVEL_MULTIPLIER);
    }

    return level;
  }

  /**
   * Get progress to next level (0-100%)
   */
  static getLevelProgress(totalXp: number): { current: number; required: number; percent: number } {
    let xpRequired = this.BASE_XP_PER_LEVEL;
    let currentXp = totalXp;

    while (currentXp >= xpRequired) {
      currentXp -= xpRequired;
      xpRequired = Math.floor(xpRequired * this.LEVEL_MULTIPLIER);
    }

    return {
      current: currentXp,
      required: xpRequired,
      percent: Math.min(100, Math.floor((currentXp / xpRequired) * 100)),
    };
  }

  /**
   * Check and update streak based on last study date
   */
  static updateStreak(stats: UserStats): UserStats {
    const today = new Date().toISOString().split("T")[0];
    
    if (stats.lastStudyDate === today) {
      return stats; // Already studied today
    }

    const newStats = { ...stats };
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split("T")[0];

    if (stats.lastStudyDate === yesterdayString) {
      // Streak continues
      newStats.currentStreak += 1;
    } else if (stats.lastStudyDate !== today) {
      // Streak broken (unless it's the very first day)
      // If lastStudyDate is null, start at 1. If it's old, reset to 1.
      newStats.currentStreak = 1;
    }

    newStats.lastStudyDate = today;
    if (newStats.currentStreak > newStats.longestStreak) {
      newStats.longestStreak = newStats.currentStreak;
    }

    // Reset daily XP if it's a new day
    if (stats.lastStudyDate !== today) {
      newStats.todayXp = 0;
    }

    return newStats;
  }

  /**
   * Add XP and update level/streak
   */
  static awardXP(stats: UserStats, amount: number): { stats: UserStats; leveledUp: boolean } {
    const oldLevel = stats.level;
    let newStats = { ...stats };

    // Update streak if first action of the day
    newStats = this.updateStreak(newStats);

    newStats.xp += amount;
    newStats.todayXp += amount;
    newStats.level = this.getLevelFromXP(newStats.xp);

    return {
      stats: newStats,
      leveledUp: newStats.level > oldLevel,
    };
  }
}
