# French Vocabulary Trainer - Developer Documentation

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│           React Application (App.tsx)           │
├──────────────────┬──────────────────┬───────────┤
│  StudyView       │  ProgressView    │ Settings  │
│  (Study Mode)    │  (Stats)         │           │
├──────────────────┴──────────────────┴───────────┤
│                  Components                     │
│  • Flashcard        • FilterSection             │
│  • ProgressStats    • Navigation                │
├─────────────────────────────────────────────────┤
│           State Management & Storage            │
│  • React Hooks (useState, useMemo)             │
│  • StorageManager (Local Storage)              │
├─────────────────────────────────────────────────┤
│           Data Layer                            │
│  • vocabularyData (src/data/vocabulary.ts)      │
│  • Types (src/types.ts)                        │
└─────────────────────────────────────────────────┘
```

## Type Definitions (src/types.ts)

### CEFR Levels

```typescript
type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
```

Represents the Common European Framework of Reference for Languages.

### Vocabulary Word

```typescript
interface VocabularyWord {
  id: string; // Unique identifier
  french: string; // French word
  english: string; // English translation
  pronunciation?: string; // Optional IPA or other
  category: Category; // Topic category
  cefr: CEFRLevel; // Difficulty level
  createdAt: number; // Timestamp
}
```

### Card Progress

```typescript
interface CardProgress {
  wordId: string; // Reference to VocabularyWord.id
  correct: number; // Total correct answers
  incorrect: number; // Total incorrect answers
  lastReviewedAt: number; // Last review timestamp
  difficulty: number; // 0-1, higher = harder
}
```

### Daily Statistics

```typescript
interface DailyStats {
  date: string; // YYYY-MM-DD format
  cardsStudied: number; // Total cards reviewed
  correctAnswers: number; // Correct responses
  incorrectAnswers: number; // Incorrect responses
  accuracy: number; // Percentage (0-100)
}
```

### User Progress

```typescript
interface UserProgress {
  wordProgress: Record<string, CardProgress>; // Map: wordId -> progress
  dailyStats: DailyStats[]; // Historical daily data
  totalWordsLearned: number; // Count of reviewed cards
  currentStreak: number; // Days in a row studied
  lastStudyDate: string | null; // Last study date (YYYY-MM-DD)
}
```

## Storage Manager API (src/utils/storage.ts)

### Static Methods

#### `getProgress(): UserProgress`

Retrieves user progress from localStorage or returns default empty progress.

```typescript
const progress = StorageManager.getProgress();
console.log(progress.currentStreak); // Current study streak
```

#### `saveProgress(progress: UserProgress): void`

Saves progress to localStorage.

```typescript
StorageManager.saveProgress(updatedProgress);
```

#### `updateCardProgress(progress, wordId, isCorrect): UserProgress`

Updates a specific card's progress after user answer.

**Parameters:**

- `progress`: Current UserProgress object
- `wordId`: ID of the card answered
- `isCorrect`: Whether the answer was correct

**Returns:** Updated UserProgress object

```typescript
const updated = StorageManager.updateCardProgress(progress, "word1", true);
// Increments correct count, decreases difficulty
```

#### `updateDailyStats(progress, isCorrect): UserProgress`

Updates today's daily statistics and streak.

```typescript
const updated = StorageManager.updateDailyStats(progress, true);
// Updates daily stats and potentially increments streak
```

#### `getTodayStats(progress): DailyStats`

Gets today's statistics or creates empty stats for today.

```typescript
const today = StorageManager.getTodayStats(progress);
```

#### `calculateStats(words, progress): Object`

Computes aggregate statistics.

**Returns:**

```typescript
{
  totalCards: number; // Total in vocabulary
  reviewedCards: number; // Reviewed at least once
  masterCards: number; // Cards mastered
  overallAccuracy: number; // All-time accuracy %
  todayStats: DailyStats; // Today's data
}
```

#### `clearAllData(): void`

Completely removes all saved progress.

```typescript
StorageManager.clearAllData();
```

## Component API

### Flashcard Component

```typescript
interface FlashcardProps {
  word: VocabularyWord;
  onCorrect: () => void; // Called when user marks correct
  onIncorrect: () => void; // Called when user marks incorrect
  isLoading?: boolean; // Disable buttons during processing
}
```

**Features:**

- Click-to-flip animation
- Shows French on front, English on back
- Displays category badge
- Correct/Incorrect buttons

### FilterSection Component

```typescript
interface FilterSectionProps {
  words: VocabularyWord[];
  onFilterChange: (filtered: VocabularyWord[]) => void;
}
```

**Features:**

- CEFR level filter buttons
- Category filter buttons
- Clear all filters button
- Multi-select filtering

### ProgressStats Component

```typescript
interface ProgressStatsProps {
  todayStats: DailyStats;
  currentStreak: number;
  masteredCards: number;
  totalCards: number;
}
```

**Displays:**

- Today's cards studied
- Accuracy percentage
- Current streak with fire emoji
- Mastered cards ratio

### Navigation Component

```typescript
interface NavigationProps {
  onShowStats: () => void;
  onShowStudy: () => void;
  onShowSettings: () => void;
  activeView: "study" | "stats" | "settings";
}
```

**Features:**

- Responsive desktop/mobile navigation
- Active view highlighting
- Mobile hamburger menu

### StudyView Component

```typescript
interface StudyViewProps {
  allWords: VocabularyWord[];
  onProgressUpdate: () => void; // Called after each card
}
```

**Features:**

- Integrated filtering
- Progress bar
- Flashcard display
- Auto-advance to next card

### ProgressView Component

```typescript
interface ProgressViewProps {
  allWords: VocabularyWord[];
}
```

**Displays:**

- Daily statistics
- Overview card counts
- Learning journey stats
- Recent activity log (last 10 days)

### Settings Component

```typescript
interface SettingsProps {
  onDataCleared: () => void; // Called after data cleared
}
```

**Features:**

- Statistics overview
- Export progress as JSON
- Clear data with confirmation modal

## Algorithms

### Difficulty Adjustment

```
When answer submitted:
  if isCorrect:
    difficulty = max(0, difficulty - 0.1)
  else:
    difficulty = min(1, difficulty + 0.2)
```

### Accuracy Calculation

```
accuracy = (correctAnswers / (correctAnswers + incorrectAnswers)) * 100
```

### Streak Logic

```
Yesterday = today - 1 day
if lastStudyDate == yesterday OR lastStudyDate == today:
  if lastStudyDate == today:
    streak unchanged
  else:
    streak += 1
else:
  streak = 1
```

### Mastery Definition

```
isMastered = (correctAnswers >= 5) AND (difficulty < 0.3)
```

## Adding New Vocabulary

### Step 1: Create Word Object

```typescript
{
  id: '36',
  french: 'école',
  english: 'school',
  pronunciation: 'e-kol',
  category: 'Things',
  cefr: 'A1',
  createdAt: Date.now()
}
```

### Step 2: Add to vocabularyData Array

```typescript
// src/data/vocabulary.ts
export const vocabularyData: VocabularyWord[] = [
  // ... existing words
  {
    id: "36",
    french: "école",
    english: "school",
    category: "Things",
    cefr: "A1",
    createdAt: Date.now(),
  },
];
```

### Step 3: Save and Reload

Vite's HMR will auto-reload the app.

## Adding New Categories

### Step 1: Update Type

```typescript
// src/types.ts
export type Category =
  | "Things"
  | "Conversations"
  | "Colours"
  | "Food"
  | "Animals"
  | "Travel"
  | "Family"
  | "Work"
  | "YourNewCategory";
```

### Step 2: Update Categories Array

```typescript
// src/data/vocabulary.ts
export const categories: Category[] = [
  "Things",
  "Conversations",
  "Colours",
  "Food",
  "Animals",
  "Travel",
  "Family",
  "Work",
  "YourNewCategory",
];
```

### Step 3: Add Vocabulary

Add words with the new category in the vocabularyData array.

## State Management Pattern

The app uses React Hooks for state management:

```typescript
// Study view example
const [filteredWords, setFilteredWords] = useState(allWords);
const [currentIndex, setCurrentIndex] = useState(0);
const [refreshKey, setRefreshKey] = useState(0);

// Memoized data
const progress = useMemo(() => StorageManager.getProgress(), []);
```

### Key Patterns:

1. **Local State**: Component-level state with `useState`
2. **Memoized Values**: Expensive computations with `useMemo`
3. **Persistent State**: localStorage via StorageManager
4. **Effect Side Effects**: useEffect for initialization (in App.tsx)

## Local Storage Structure

```javascript
// Single entry in localStorage
localStorage.getItem('french_vocab_progress')
// Returns JSON string:
{
  "wordProgress": {
    "1": { "wordId": "1", "correct": 3, "incorrect": 1, "difficulty": 0.1, "lastReviewedAt": 1702345200000 },
    "2": { "wordId": "2", "correct": 0, "incorrect": 1, "difficulty": 0.2, "lastReviewedAt": 1702345500000 }
  },
  "dailyStats": [
    { "date": "2024-12-11", "cardsStudied": 5, "correctAnswers": 4, "incorrectAnswers": 1, "accuracy": 80 }
  ],
  "totalWordsLearned": 2,
  "currentStreak": 1,
  "lastStudyDate": "2024-12-11"
}
```

## Performance Considerations

### Optimization Techniques Used:

1. **Code Splitting**: Vite automatically chunks components
2. **Tree Shaking**: TypeScript removes unused types
3. **Lazy Evaluation**: Memoized calculations
4. **Virtual DOM**: React efficiently updates UI
5. **CSS Optimization**: Tailwind purges unused styles in build

### Bundle Analysis:

```
dist/assets/index-HzDhpuP1.js    214.75 kB (gzipped: 65.55 kB)
dist/assets/index-eellmD8u.css   2.51 kB (gzipped: 1.01 kB)
dist/index.html                  0.45 kB (gzipped: 0.29 kB)
```

## Testing Guide

### Manual Testing Checklist:

- [ ] Flashcard flip animation works
- [ ] Correct/Incorrect buttons save progress
- [ ] Filter by level works
- [ ] Filter by category works
- [ ] Combined filters work
- [ ] Progress stats update correctly
- [ ] Streak increments daily
- [ ] Data persists after refresh
- [ ] Export creates JSON file
- [ ] Clear data works with confirmation
- [ ] Responsive on mobile

### Browser DevTools:

```javascript
// Check localStorage
localStorage.getItem("french_vocab_progress");

// Clear all data
localStorage.clear();

// Check current progress
const progress = JSON.parse(localStorage.getItem("french_vocab_progress"));
```

## Future Enhancement Ideas

1. **Spaced Repetition Algorithm**: Implement SM-2 algorithm
2. **Audio Pronunciation**: Add text-to-speech
3. **Synonyms & Examples**: Expand word definitions
4. **Leaderboard**: Compare stats with friends
5. **Dark Mode**: Theme toggle
6. **Keyboard Navigation**: Support arrow keys and Enter
7. **Statistics Export**: PDF reports
8. **Undo Functionality**: Revise last answered card
9. **Timer Mode**: Study under time pressure
10. **Multiplayer**: Real-time quiz with others

---

**For questions about the codebase, refer to the inline comments in each file.**
