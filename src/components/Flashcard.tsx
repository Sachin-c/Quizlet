import { useState } from "react";
import type { VocabularyWord } from "../types";
import { getFrenchPhonetics } from "../utils/phonetics.ts";
import { VerbConjugation } from "./VerbConjugation";
import { AudioPlayer, ClickableTranscript } from "./AudioPlayer";

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

  // Compact layout for verbs to fit everything on screen
  const isVerb = word.isVerb && !isFlipped;
  const hasExample = !!(word.exampleFrench && word.exampleEnglish);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Card - Quizlet Style - Compact for Verbs */}
      <div
        className={`w-full max-w-3xl bg-white dark:bg-slate-800 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-900 ${
          isVerb ? "p-4 min-h-[10rem]" : "p-6 min-h-[14rem]"
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Emoji - smaller for verbs */}
        {word.imageUrl && (
          <div
            className={`animate-scale-in ${
              isVerb ? "mb-2 text-4xl" : "mb-4 text-5xl"
            }`}
          >
            {word.imageUrl}
          </div>
        )}

        <div className="flex flex-col items-center justify-center w-full">
          <p
            className={`font-semibold text-slate-400 dark:text-slate-500 tracking-wide uppercase ${
              isVerb ? "text-xs mb-1" : "text-sm mb-2"
            }`}
          >
            {isFlipped ? "✓ English" : "• Français"}
          </p>
          <p
            className={`font-black text-slate-900 dark:text-slate-100 text-center break-words ${
              isVerb ? "text-3xl md:text-4xl mb-1" : "text-4xl md:text-5xl mb-2"
            }`}
          >
            {isFlipped ? word.english : word.french}
          </p>

          {/* Phonetics */}
          <p
            className={`text-slate-500 dark:text-slate-400 italic ${
              isVerb ? "text-sm mb-2" : "text-lg mb-3"
            }`}
          >
            /{isFlipped ? word.english : getFrenchPhonetics(word.french)}/
          </p>

          {/* Dual-Speed Audio Controls */}
          <div onClick={(e) => e.stopPropagation()}>
            <AudioPlayer 
              text={isFlipped ? word.english : word.french}
              lang={isFlipped ? "en-US" : "fr-FR"}
              size={isVerb ? "sm" : "md"}
              showLabel={true}
            />
          </div>

          <p
            className={`text-slate-500 dark:text-slate-400 ${isVerb ? "text-xs mt-2" : "text-xs mt-3"}`}
          >
            Click card to {isFlipped ? "see French" : "reveal English"}
          </p>
        </div>
      </div>

      {/* Verb Conjugations - shown outside card for better visibility */}
      {word.isVerb && !isFlipped && (
        <VerbConjugation conjugations={word.conjugations} />
      )}

      {/* Contextual Example Sentence - NEW! */}
      {hasExample && (
        <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📖</span>
              <span className="text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Example in Context
              </span>
            </div>
            <ClickableTranscript 
              frenchText={word.exampleFrench!}
              englishText={word.exampleEnglish}
            />
          </div>
        </div>
      )}

      {/* No Example - Prompt */}
      {!hasExample && !word.isVerb && (
        <div className="w-full max-w-3xl">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-200 dark:border-slate-700 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500 italic">
              💡 Practice using "{word.french}" in a sentence to remember it better!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
