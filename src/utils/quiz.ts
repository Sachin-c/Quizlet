import type { VocabularyWord } from "../types";

export type QuestionType = "multiple-choice" | "typing";

export interface QuizQuestion {
  word: VocabularyWord;
  type: QuestionType;
  options?: string[]; // For multiple choice
  correctAnswer: string; // The English translation or French word depending on direction
}

export class QuizUtils {
  /**
   * Generate a question for a given word
   */
  static generateQuestion(targetWord: VocabularyWord, allWords: VocabularyWord[]): QuizQuestion {
    // 30% chance of typing if word is somewhat known (simulated logic, could use difficulty)
    // For now, let's stick to mostly MC for "easy" feel, or mix it up.
    // Let's go with 80% Multiple Choice, 20% Typing.
    const isTyping = Math.random() > 0.8;

    if (isTyping) {
      return {
        word: targetWord,
        type: "typing",
        correctAnswer: targetWord.english, // Testing French -> English translation usually? 
        // Wait, normally SRS is "See French, recall English" or "See English, recall French"
        // Let's Stick to: Show French, User selects English.
      };
    }

    // Multiple Choice
    const options = this.generateOptions(targetWord, allWords);
    return {
      word: targetWord,
      type: "multiple-choice",
      options,
      correctAnswer: targetWord.english,
    };
  }

  /**
   * Generate 3 wrong options + correct answer for a word
   */
  static generateOptions(correctWord: VocabularyWord, allWords: VocabularyWord[]): string[] {
    const correct = correctWord.english;
    const otherWords = allWords.filter((w) => w.id !== correctWord.id);
    
    // Shuffle other words
    const shuffled = [...otherWords].sort(() => 0.5 - Math.random());
    
    // Take 3 distractors
    const distractors = shuffled.slice(0, 3).map((w) => w.english);
    
    // Combine and shuffle
    const options = [...distractors, correct].sort(() => 0.5 - Math.random());
    
    return options;
  }
}
