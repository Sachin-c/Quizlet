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

  // Compact layout for verbs to fit everything on screen
  const isVerb = word.isVerb && !isFlipped;

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Card - Quizlet Style - Compact for Verbs */}
      <div
        className={`w-full max-w-3xl bg-white rounded-2xl cursor-pointer transition-all duration-300 flex flex-col items-center justify-center border border-gray-100 shadow-lg hover:shadow-2xl ${
          isVerb ? "p-4 min-h-[10rem]" : "p-6 min-h-[16rem]"
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Emoji - smaller for verbs */}
        {word.imageUrl && (
          <div
            className={`animate-scale-in ${
              isVerb ? "mb-2 text-4xl" : "mb-6 text-6xl"
            }`}
          >
            {word.imageUrl}
          </div>
        )}

        <div className="flex flex-col items-center justify-center w-full">
          <p
            className={`font-semibold text-gray-400 tracking-wide uppercase ${
              isVerb ? "text-xs mb-1" : "text-sm mb-3"
            }`}
          >
            {isFlipped ? "✓ English" : "• Français"}
          </p>
          <p
            className={`font-black text-gray-900 text-center break-words ${
              isVerb ? "text-3xl md:text-4xl mb-1" : "text-4xl md:text-5xl mb-2"
            }`}
          >
            {isFlipped ? word.english : word.french}
          </p>

          {/* Phonetics */}
          <p
            className={`text-gray-500 italic ${
              isVerb ? "text-sm mb-2" : "text-lg mb-3"
            }`}
          >
            /{isFlipped ? word.english : getFrenchPhonetics(word.french)}/
          </p>

          {/* Speaker Button - smaller for verbs */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const textToSpeak = isFlipped ? word.english : word.french;
              const lang = isFlipped ? "en-US" : "fr-FR";
              speak(textToSpeak, lang);
            }}
            className={`bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-all hover:shadow-lg active:scale-95 ${
              isVerb ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm mb-2"
            }`}
            title="Click to listen"
          >
            🔊 Speak
          </button>

          <p
            className={`text-gray-500 ${isVerb ? "text-xs mt-1" : "text-xs mt-3"}`}
          >
            Click to {isFlipped ? "see French" : "reveal English"}
          </p>
        </div>
      </div>

      {/* Verb Conjugations - shown outside card for better visibility */}
      {word.isVerb && !isFlipped && (
        <VerbConjugation conjugations={word.conjugations} />
      )}
    </div>
  );
};
