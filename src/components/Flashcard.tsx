import { useState } from "react";
import type { VocabularyWord } from "../types";
import { getFrenchPhonetics } from "../utils/phonetics.ts";
import { VerbConjugation } from "./VerbConjugation";

interface FlashcardProps {
  word: VocabularyWord;
  onCorrect: () => void;
  onIncorrect: () => void;
  isLoading?: boolean;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  word,
  // onCorrect,
  // onIncorrect,
  // isLoading = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const speak = (text: string, lang: string = "fr-FR") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Card - Quizlet Style - NO 3D FLIP */}
      <div
        className="w-full max-w-3xl bg-white rounded-2xl cursor-pointer transition-all duration-300 p-6 min-h-[18rem] flex flex-col items-center justify-center border border-gray-100 shadow-lg hover:shadow-2xl"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Emoji */}
        {word.imageUrl && (
          <div className="mb-8 animate-scale-in text-6xl">{word.imageUrl}</div>
        )}

        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-sm font-semibold text-gray-400 mb-4 tracking-wide uppercase">
            {isFlipped ? "✓ English" : "• Français"}
          </p>
          <p className="text-4xl md:text-5xl font-black text-gray-900 text-center mb-2 break-words">
            {isFlipped ? word.english : word.french}
          </p>

          {/* Phonetics */}
          <p className="text-lg text-gray-500 italic mb-4">
            /{isFlipped ? word.english : getFrenchPhonetics(word.french)}/
          </p>

          {/* Speaker Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const textToSpeak = isFlipped ? word.english : word.french;
              const lang = isFlipped ? "en-US" : "fr-FR";
              speak(textToSpeak, lang);
            }}
            className="mb-3 px-4 py-2 text-xs  bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-lg active:scale-95"
            title="Click to listen"
          >
            🔊 Speak
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Click to {isFlipped ? "see French" : "reveal English"}
          </p>
        </div>

        {/* Verb Conjugations */}
        {word.isVerb && !isFlipped && (
          <VerbConjugation conjugations={word.conjugations} />
        )}
      </div>

      {/* Action Buttons */}
      {/* <div className="flex gap-4 w-full max-w-3xl">
        <button
          onClick={() => {
            onIncorrect();
          }}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-lg transition-all hover:shadow-lg active:scale-95 shadow-md"
          title="Mark this card as 'still learning' - you'll see it again soon"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">📌</span>
            <span>Still Learning</span>
          </div>
          <div className="text-xs opacity-80 mt-1">Need more practice</div>
        </button>
        <button
          onClick={() => {
            onCorrect();
          }}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-lg transition-all hover:shadow-lg active:scale-95 shadow-md"
          title="Mark this card as 'got it' - you'll see it less often"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">✅</span>
            <span>Got It!</span>
          </div>
          <div className="text-xs opacity-80 mt-1">I knew that</div>
        </button>
      </div> */}
    </div>
  );
};
