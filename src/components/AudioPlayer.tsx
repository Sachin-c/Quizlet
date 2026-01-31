import { useState } from "react";

interface AudioPlayerProps {
  text: string;
  lang?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

/**
 * Interactive Audio Player with dual-speed controls
 * - Normal speed (1x) for natural French
 * - Slow speed (0.5x) for learning pronunciation
 */
export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  text,
  lang = "fr-FR",
  showLabel = true,
  size = "md",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState<"slow" | "normal">("normal");

  const speak = (speed: "slow" | "normal") => {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = speed === "slow" ? 0.5 : 0.9; // 0.5x for slow, 0.9x for natural
    utterance.pitch = 1;
    
    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentSpeed(speed);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
    };
    
    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-1 gap-1",
    md: "text-sm px-3 py-2 gap-2",
    lg: "text-base px-4 py-3 gap-2",
  };

  const iconSize = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Slow Speed Button */}
      <button
        onClick={() => speak("slow")}
        disabled={isPlaying && currentSpeed !== "slow"}
        className={`flex items-center ${sizeClasses[size]} rounded-lg font-semibold transition-all active:scale-95 ${
          isPlaying && currentSpeed === "slow"
            ? "bg-orange-500 text-white animate-pulse"
            : "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/60"
        } disabled:opacity-50`}
        title="Play at slow speed (0.5x)"
      >
        <span className={iconSize[size]}>🐢</span>
        {showLabel && <span>Slow</span>}
      </button>

      {/* Normal Speed Button */}
      <button
        onClick={() => speak("normal")}
        disabled={isPlaying && currentSpeed !== "normal"}
        className={`flex items-center ${sizeClasses[size]} rounded-lg font-semibold transition-all active:scale-95 ${
          isPlaying && currentSpeed === "normal"
            ? "bg-blue-600 text-white animate-pulse"
            : "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/60"
        } disabled:opacity-50`}
        title="Play at normal speed"
      >
        <span className={iconSize[size]}>🔊</span>
        {showLabel && <span>Normal</span>}
      </button>

      {/* Stop Button (shown when playing) */}
      {isPlaying && (
        <button
          onClick={stop}
          className={`flex items-center ${sizeClasses[size]} rounded-lg font-semibold transition-all active:scale-95 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/60`}
          title="Stop"
        >
          <span className={iconSize[size]}>⏹</span>
          {showLabel && <span>Stop</span>}
        </button>
      )}
    </div>
  );
};

/**
 * Clickable Transcript Component
 * Each word can be clicked for instant translation
 */
interface TranscriptProps {
  frenchText: string;
  englishText?: string;
  onWordClick?: (word: string) => void;
}

export const ClickableTranscript: React.FC<TranscriptProps> = ({
  frenchText,
  englishText,
  onWordClick,
}) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const words = frenchText.split(/(\s+|[.,!?;:'"]+)/);

  const speakWord = (word: string) => {
    const cleanWord = word.replace(/[.,!?;:'"]+/g, "").trim();
    if (!cleanWord) return;
    
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanWord);
    utterance.lang = "fr-FR";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
    
    setSelectedWord(cleanWord);
    if (onWordClick) onWordClick(cleanWord);
  };

  return (
    <div className="space-y-3">
      {/* French Sentence - Clickable Words */}
      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            🇫🇷 Français
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            (click any word to hear it)
          </span>
        </div>
        <p className="text-lg md:text-xl leading-relaxed">
          {words.map((word, idx) => {
            const isWord = /\w/.test(word);
            const cleanWord = word.replace(/[.,!?;:'"]+/g, "").trim();
            
            if (!isWord || !cleanWord) {
              return <span key={idx}>{word}</span>;
            }
            
            return (
              <span
                key={idx}
                onClick={() => speakWord(word)}
                className={`cursor-pointer transition-all rounded px-0.5 ${
                  selectedWord === cleanWord
                    ? "bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-blue-100"
                    : "hover:bg-blue-100 dark:hover:bg-blue-800/50 text-slate-800 dark:text-slate-200"
                }`}
              >
                {word}
              </span>
            );
          })}
        </p>
        
        {/* Audio Controls for full sentence */}
        <div className="mt-3 flex items-center gap-3">
          <AudioPlayer text={frenchText} lang="fr-FR" size="sm" showLabel={true} />
        </div>
      </div>

      {/* English Translation - Toggle */}
      {englishText && (
        <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            <span>🇬🇧 English Translation</span>
            <span className="text-lg">{showTranslation ? "👁" : "👁‍🗨"}</span>
          </button>
          
          {showTranslation && (
            <p className="mt-2 text-lg text-slate-700 dark:text-slate-300 italic animate-fade-in">
              "{englishText}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};
