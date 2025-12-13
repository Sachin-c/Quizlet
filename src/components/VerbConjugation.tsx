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
    <div className="mt-8 w-full max-w-2xl">
      <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
        Present Tense Conjugations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {conjugations.map((conj, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-3 hover:shadow-md transition-shadow"
          >
            <p className="text-xs font-semibold text-indigo-700 mb-2">
              {conj.pronoun}
            </p>
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-lg font-bold text-gray-900">{conj.present}</p>
              <button
                onClick={(e) => speak(conj.present, "fr-FR", e)}
                className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold transition-colors active:scale-95"
                title="Pronounce conjugation"
              >
                🔊
              </button>
            </div>
            {conj.presentPhonetics && (
              <p className="text-xs text-gray-600 italic">
                /{conj.presentPhonetics}/
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
