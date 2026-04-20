import type { Conjugation, VerbTenseEntry } from "../types";

interface VerbConjugationProps {
  conjugations?: Conjugation[];
  tenseEntries?: VerbTenseEntry[];
}

export const VerbConjugation: React.FC<VerbConjugationProps> = ({
  conjugations,
  tenseEntries,
}) => {
  if ((!conjugations || conjugations.length === 0) && (!tenseEntries || tenseEntries.length === 0)) return null;

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

  // Reverso Style: Multi-Tense View
  if (tenseEntries && tenseEntries.length > 0) {
    return (
      <div className="w-full max-w-3xl flex flex-col gap-5 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
        {tenseEntries.map((entry) => (
          <div key={entry.tense}>
            <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider text-center border-b border-gray-200 dark:border-slate-700 pb-1">
              {entry.tense.replace(/_/g, " ")} {entry.auxiliary ? `(${entry.auxiliary})` : ""}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {entry.conjugations.map((conj, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        {conj.pronoun}
                      </p>
                      <p className="text-base font-black text-slate-900 dark:text-slate-100 truncate">
                        {conj.form}
                      </p>
                      {conj.phonetics && (
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 italic truncate">
                          /{conj.phonetics}/
                        </p>
                      )}
                    </div>
                    <button
                      onClick={(e) => speak(conj.form, "fr-FR", e)}
                      className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white rounded-lg text-xs flex items-center justify-center transition-all active:scale-95 opacity-80 group-hover:opacity-100"
                      title="Pronounce"
                    >
                      🔊
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Fallback: Original Present Tense View
  return (
    <div className="w-full max-w-3xl">
      <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider text-center">
        Present Tense
      </h3>
      {/* 3-column compact grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {conjugations?.map((conj, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
          >
            <div className="flex items-center justify-between gap-1.5">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {conj.pronoun}
                </p>
                <p className="text-base font-black text-slate-900 dark:text-slate-100 truncate">
                  {conj.present}
                </p>
                {conj.presentPhonetics && (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 italic truncate">
                    /{conj.presentPhonetics}/
                  </p>
                )}
              </div>
              <button
                onClick={(e) => speak(conj.present, "fr-FR", e)}
                className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white rounded-lg text-xs flex items-center justify-center transition-all active:scale-95 opacity-80 group-hover:opacity-100"
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
