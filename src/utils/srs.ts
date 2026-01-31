/**
 * Spaced Repetition System (SRS) Algorithm
 * Based on the SM-2 algorithm with modifications
 * 
 * This algorithm optimizes learning by scheduling reviews
 * right before you're about to forget the material.
 */

import type { SRSData, SRSQuality, CardProgress } from "../types";

export class SRSManager {
  // Default values for new cards
  static readonly DEFAULT_EASE_FACTOR = 2.5;
  static readonly MIN_EASE_FACTOR = 1.3;
  static readonly MAX_EASE_FACTOR = 3.0;

  /**
   * Initialize SRS data for a new card
   */
  static initializeSRS(wordId: string): SRSData {
    return {
      wordId,
      easeFactor: this.DEFAULT_EASE_FACTOR,
      interval: 0,
      repetitions: 0,
      nextReviewDate: Date.now(), // Review immediately
      lastReviewDate: 0,
      correct: 0,
      incorrect: 0,
    };
  }

  /**
   * Convert simple correct/incorrect to quality rating
   * This is a simplified version for the basic UI
   */
  static getQualityFromAnswer(isCorrect: boolean, wasHard: boolean = false): SRSQuality {
    if (!isCorrect) {
      return 1; // Incorrect but remembered upon seeing
    }
    if (wasHard) {
      return 3; // Correct with difficulty
    }
    return 4; // Correct after slight hesitation
  }

  /**
   * Calculate the next review using SM-2 algorithm
   * 
   * @param srs - Current SRS data
   * @param quality - 0-5 rating of how well the answer was recalled
   * @returns Updated SRS data
   */
  static calculateNextReview(srs: SRSData, quality: SRSQuality): SRSData {
    const newSRS = { ...srs };
    newSRS.lastReviewDate = Date.now();

    // If quality < 3, reset repetitions (failed recall)
    if (quality < 3) {
      newSRS.repetitions = 0;
      newSRS.interval = 1; // Review again tomorrow
      newSRS.incorrect++;
    } else {
      // Successful recall
      newSRS.correct++;
      newSRS.repetitions++;

      // Calculate new interval
      if (newSRS.repetitions === 1) {
        newSRS.interval = 3; // First success: 3 days (extended from 1)
      } else if (newSRS.repetitions === 2) {
        newSRS.interval = 7; // Second success: 7 days (extended from 6)
      } else {
        // Subsequent successes: interval * easeFactor
        newSRS.interval = Math.round(newSRS.interval * newSRS.easeFactor);
      }

      // Cap interval at 365 days (1 year max)
      newSRS.interval = Math.min(newSRS.interval, 365);
    }

    // Update ease factor based on quality
    // EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
    const efChange = 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
    newSRS.easeFactor = Math.max(
      this.MIN_EASE_FACTOR,
      Math.min(this.MAX_EASE_FACTOR, newSRS.easeFactor + efChange)
    );

    // Set next review date
    newSRS.nextReviewDate = Date.now() + newSRS.interval * 24 * 60 * 60 * 1000;

    return newSRS;
  }

  /**
   * Get cards that are due for review
   * 
   * @param cards - All card progress data
   * @param limit - Maximum number of cards to return
   * @returns Array of word IDs that need review, sorted by priority
   */
  static getDueCards(
    wordProgress: Record<string, CardProgress>,
    limit: number = 20
  ): string[] {
    const now = Date.now();
    const dueCards: Array<{ wordId: string; priority: number }> = [];

    Object.values(wordProgress).forEach((progress) => {
      if (progress.srs) {
        const overdueDays = (now - progress.srs.nextReviewDate) / (24 * 60 * 60 * 1000);
        
        if (overdueDays >= 0) {
          // Card is due or overdue
          // Priority: more overdue = higher priority, lower ease = higher priority
          const priority = overdueDays + (3 - progress.srs.easeFactor);
          dueCards.push({ wordId: progress.wordId, priority });
        }
      }
    });

    // Sort by priority (highest first) and return word IDs
    return dueCards
      .sort((a, b) => b.priority - a.priority)
      .slice(0, limit)
      .map((c) => c.wordId);
  }

  /**
   * Get new cards (never reviewed) with SRS
   */
  static getNewCards(
    wordProgress: Record<string, CardProgress>,
    allWordIds: string[],
    limit: number = 10
  ): string[] {
    const reviewedIds = new Set(Object.keys(wordProgress));
    return allWordIds
      .filter((id) => !reviewedIds.has(id))
      .slice(0, limit);
  }

  /**
   * Get a study queue combining due cards and new cards
   */
  static getStudyQueue(
    wordProgress: Record<string, CardProgress>,
    allWordIds: string[],
    totalLimit: number = 20
  ): { dueCards: string[]; newCards: string[] } {
    // Guarantee minimum new cards for learning progression
    const minNewCards = 5;
    const maxDueCards = Math.max(0, totalLimit - minNewCards);
    
    const dueCards = this.getDueCards(wordProgress, maxDueCards);
    const newCardLimit = Math.max(minNewCards, totalLimit - dueCards.length);
    const newCards = this.getNewCards(wordProgress, allWordIds, newCardLimit);

    return { dueCards, newCards };
  }

  /**
   * Get stats about SRS progress
   */
  static getStats(wordProgress: Record<string, CardProgress>) {
    const now = Date.now();
    let dueNow = 0;
    let dueTomorrow = 0;
    let dueThisWeek = 0;
    let mastered = 0; // interval > 21 days
    let learning = 0; // interval 1-21 days
    let newCards = 0; // no reviews yet

    Object.values(wordProgress).forEach((progress) => {
      if (!progress.srs || progress.srs.repetitions === 0) {
        newCards++;
        return;
      }

      const { interval, nextReviewDate } = progress.srs;
      const daysUntilDue = (nextReviewDate - now) / (24 * 60 * 60 * 1000);

      if (daysUntilDue <= 0) dueNow++;
      else if (daysUntilDue <= 1) dueTomorrow++;
      else if (daysUntilDue <= 7) dueThisWeek++;

      if (interval > 21) mastered++;
      else learning++;
    });

    return {
      dueNow,
      dueTomorrow,
      dueThisWeek,
      mastered,
      learning,
      newCards,
    };
  }

  /**
   * Get human-readable time until next review
   */
  static getNextReviewText(srs: SRSData): string {
    const now = Date.now();
    const diffMs = srs.nextReviewDate - now;
    
    if (diffMs <= 0) return "Due now";
    
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    
    if (diffHours < 1) return "Due soon";
    if (diffHours < 24) return `In ${Math.round(diffHours)} hours`;
    if (diffDays < 7) return `In ${Math.round(diffDays)} days`;
    if (diffDays < 30) return `In ${Math.round(diffDays / 7)} weeks`;
    return `In ${Math.round(diffDays / 30)} months`;
  }
}
