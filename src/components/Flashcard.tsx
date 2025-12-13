import { useState, useEffect } from "react";
import type { VocabularyWord } from "../types";
import { getImageForWord } from "../utils/imageService";

interface FlashcardProps {
  word: VocabularyWord;
  onCorrect: () => void;
  onIncorrect: () => void;
  isLoading?: boolean;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  word,
  onCorrect,
  onIncorrect,
  isLoading = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(word.imageUrl || "");

  // Fetch stock image on component mount
  useEffect(() => {
    if (word.imageUrl && word.imageUrl.length > 2) {
      // Already has a real image URL
      return;
    }

    const fetchImage = async () => {
      const url = await getImageForWord(word.english, word.imageUrl || "📷");
      setImageUrl(url);
    };

    fetchImage();
  }, [word]);

  const speak = (text: string, lang: string = "fr-FR") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Difficulty and Category Info */}
      <div className="flex gap-2 justify-center flex-wrap">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500 text-white">
          {word.cefr}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-300 text-gray-800">
          {word.category}
        </span>
      </div>

      {/* Card - Quizlet Style - NO 3D FLIP */}
      <div
        className="w-full max-w-3xl bg-white rounded-2xl cursor-pointer transition-all duration-300 p-12 min-h-96 flex flex-col items-center justify-center border border-gray-100 shadow-lg hover:shadow-2xl"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Image */}
        {imageUrl && (
          <div className="mb-8 animate-scale-in w-full flex justify-center">
            {imageUrl.startsWith("http") ? (
              // Stock photo from Unsplash
              <img
                src={imageUrl}
                alt={word.english}
                className="w-64 h-64 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  // Fallback to emoji if image fails to load
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  setImageUrl(word.imageUrl || "📷");
                }}
              />
            ) : (
              // Emoji fallback
              <div className="text-9xl">{imageUrl}</div>
            )}
          </div>
        )}

        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-sm font-semibold text-gray-400 mb-4 tracking-wide uppercase">
            {isFlipped ? "✓ English" : "• Français"}
          </p>
          <p className="text-6xl font-black text-gray-900 text-center mb-8 break-words">
            {isFlipped ? word.english : word.french}
          </p>

          {/* Speaker Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const textToSpeak = isFlipped ? word.english : word.french;
              const lang = isFlipped ? "en-US" : "fr-FR";
              speak(textToSpeak, lang);
            }}
            className="mb-4 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-lg active:scale-95"
            title="Click to listen"
          >
            🔊 Speak
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Click to {isFlipped ? "see French" : "reveal English"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 w-full max-w-3xl">
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
      </div>
    </div>
  );
};
