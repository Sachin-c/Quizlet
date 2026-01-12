import type { Conjugation } from "../types";

interface VerbConjugationProps {
  conjugations?: Conjugation[];
}

export const VerbConjugation: React.FC<VerbConjugationProps> = ({
  conjugations,
}) => {
  if (!conjugations || conjugations.length === 0) return null;

  const speak = (
    text: string,
    lang: string = "fr-FR",
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-3xl">
      <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider text-center">
        Present Tense
      </h3>
      {/* 3-column compact grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {conjugations.map((conj, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 rounded-xl p-2.5 hover:shadow-md hover:border-indigo-200 transition-all group"
          >
            <div className="flex items-center justify-between gap-1.5">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide">
                  {conj.pronoun}
                </p>
                <p className="text-base font-black text-gray-900 truncate">
                  {conj.present}
                </p>
                {conj.presentPhonetics && (
                  <p className="text-[10px] text-gray-500 italic truncate">
                    /{conj.presentPhonetics}/
                  </p>
                )}
              </div>
              <button
                onClick={(e) => speak(conj.present, "fr-FR", e)}
                className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg text-xs flex items-center justify-center transition-all active:scale-95 opacity-80 group-hover:opacity-100"
                title="Pronounce"
              >
                🔊
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
