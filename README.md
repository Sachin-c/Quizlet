# 🇫🇷 French Learning App

## Welcome to my French Learning Journey!
Bienvenue! This application is designed to make learning French vocabulary engaging, effective, and fun. It features a smart spaced repetition system, gamification, and a beautiful interface to keep you motivated.

**Live Demo:** [https://quizlet-chi.vercel.app/](https://quizlet-chi.vercel.app/)

## Features

- **Smart Review (SRS)**: An intelligent system that prioritizes words you need to practice.
- **Gamification**: Earn XP, level up, and maintain your daily streak!
- **Dark Mode**: A sleek, professional dark theme for late-night study sessions.
- **Typing Practice**: Test your spelling and recall with strict checking.
- **Audio Pronunciation**: Hear the correct pronunciation of every word.
  - A2: Elementary Upper Level
  - B1: Intermediate
  - B2: Upper Intermediate
  - C1: Advanced
  - C2: Mastery
- **Categorized Vocabulary**: Study by topics including:
  - Things (Objects)
  - Conversations (Common Phrases)
  - Colours
  - Food
  - Animals
  - Travel
  - Family
  - Work

### 🎯 Smart Filtering

- Filter cards by CEFR difficulty level
- Filter by vocabulary category
- Combine filters to create custom study sessions

### 📊 Progress Tracking

- **Daily Statistics**: Track cards studied, accuracy, and streaks
- **Mastery Progress**: Monitor which cards you've mastered
- **Learning Journey**: View historical data and trends
- **Current Streak**: Keep motivation high with streak counter

### 💾 Data Persistence

- **Automatic Saving**: All progress is saved to browser's local storage
- **Export Progress**: Download your learning data as JSON
- **Data Management**: Clear data when needed

### 🎨 Professional Design

The application features **modern, professional styling** with:

- **Gradient Color Schemes**: Indigo → Purple → Pink theme throughout
- **Modern Components**:
  - Smooth animations (slideUp, fadeIn, scaleIn)
  - Glass morphism effects with backdrop blur
  - Professional button gradients (Primary, Success, Danger, Secondary)
  - Elevated cards with hover effects
  - Progress bars with animated fills
- **Responsive Layout**: Mobile-first design with breakpoints
- **Accessibility**: High contrast, clear feedback, proper spacing
- **Production Ready**: Optimized assets, fast loading, zero TypeScript errors

See [CSS_ENHANCEMENTS.md](./CSS_ENHANCEMENTS.md) for detailed styling documentation.

### 🔊 Audio Support

- **French Pronunciation**: Hear native French pronunciation via Web Speech API
- **English Audio**: Listen to English translations
- **Adjustable Speed**: Controlled speech rate for clarity

### 🎬 Quiz Mode

- **Multiple Choice**: Test knowledge with 10-question quizzes
- **Same-Category Options**: Intelligent answer options from same category
- **Instant Feedback**: Immediate correct/incorrect indication
- **Score Tracking**: Track quiz performance and accuracy

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Navigate to the project directory

```bash
cd French-Vocab-Trainer
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Study Mode

1. Click on the "📚 Study" tab
2. (Optional) Use filters to select specific difficulty levels or categories
3. Click on flashcards to reveal the English translation
4. Mark cards as "Correct" or "Incorrect"
5. The app automatically advances to the next card

### View Progress

1. Click on the "📊 Progress" tab
2. View your daily statistics, accuracy, and streak
3. See your learning journey with recent activity logs

### Manage Settings

1. Click on the "⚙️ Settings" tab
2. View your learning statistics
3. Export your progress as a JSON file
4. Clear all data if needed (with confirmation)

## Project Structure

```
src/
├── components/
│   ├── Flashcard.tsx         # Interactive flashcard component
│   ├── FilterSection.tsx      # Filter UI for level and category
│   ├── Navigation.tsx         # Top navigation bar
│   ├── ProgressStats.tsx      # Statistics display component
│   ├── ProgressView.tsx       # Full progress/stats view
│   ├── Settings.tsx           # Settings and data management
│   └── StudyView.tsx          # Main study interface
├── data/
│   └── vocabulary.ts          # Vocabulary database
├── utils/
│   └── storage.ts             # Local storage management
├── types.ts                   # TypeScript type definitions
├── App.tsx                    # Main application component
├── App.css                    # Application styles
├── index.css                  # Global styles
├── main.tsx                   # Application entry point
└── vite.config.ts             # Vite configuration
```

## Technologies Used

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite (for fast development and optimized builds)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Storage**: Browser Local Storage API
- **PostCSS**: For CSS processing with Tailwind

## Features in Detail

### Spaced Repetition

The app uses a difficulty-based system:

- Difficulty score increases with incorrect answers
- Difficulty score decreases with correct answers
- Cards with higher difficulty appear more frequently

### Progress Tracking

- **Daily Stats**: Tracks cards studied, correct/incorrect answers, and accuracy percentage
- **Streak System**: Maintains a current study streak
- **Mastery Definition**: Cards with 5+ correct answers and difficulty < 0.3 are considered "mastered"

### Data Persistence

- All progress is automatically saved to browser localStorage
- Progress survives browser refreshes and sessions
- Export functionality for backup and data portability

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run tsc

# Lint code
npm run lint
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with ES2020+ support

## Customization

### Adding More Vocabulary

Edit `src/data/vocabulary.ts` to add more words:

```typescript
{
  id: 'unique_id',
  french: 'french_word',
  english: 'english_translation',
  category: 'Category',
  cefr: 'A1',
  createdAt: Date.now()
}
```

### Changing Tailwind Theme

Edit `tailwind.config.js` to customize colors and styles.

## Future Enhancements

- [ ] Audio pronunciation support
- [ ] Spaced repetition algorithm improvements
- [ ] User authentication and cloud sync
- [ ] Mobile app version
- [ ] Multiplayer quiz mode
- [ ] Advanced statistics and analytics
- [ ] Import/export vocabulary lists
- [ ] Dark mode support

## License

MIT License - feel free to use this project for personal learning or commercial purposes.

---

**Happy Learning! 🎓** Keep practicing daily and watch your French vocabulary grow! 🚀
tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },

},
])

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````
