import { useEffect, useState } from "react";
import type { VocabularyWord, CEFRLevel, Category } from "../types";

interface FilterSectionProps {
  words: VocabularyWord[];
  onFilterChange: (filtered: VocabularyWord[]) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  words,
  onFilterChange,
}) => {
  const [selectedLevels, setSelectedLevels] = useState<Set<CEFRLevel>>(
    new Set()
  );
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    new Set()
  );

  const levels: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const categories: Category[] = [
    "Things",
    "Conversations",
    "Colours",
    "Food",
    "Animals",
    "Travel",
    "Family",
    "Clothing",
  ];

  useEffect(() => {
    let filtered = words;

    if (selectedLevels.size > 0) {
      filtered = filtered.filter((w) => selectedLevels.has(w.cefr));
    }

    if (selectedCategories.size > 0) {
      filtered = filtered.filter((w) => selectedCategories.has(w.category));
    }

    onFilterChange(filtered);
  }, [selectedLevels, selectedCategories, words, onFilterChange]);

  const toggleSet = <T,>(
    value: T,
    set: Set<T>,
    setter: (s: Set<T>) => void
  ) => {
    const next = new Set(set);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    setter(next);
  };

  const clearFilters = () => {
    setSelectedLevels(new Set());
    setSelectedCategories(new Set());
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-3 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
          Filters
        </h3>
        {(selectedLevels.size > 0 || selectedCategories.size > 0) && (
          <button
            onClick={clearFilters}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-2 flex-wrap text-[10px]">
        {/* CEFR */}
        <span className="font-semibold text-slate-500 dark:text-slate-400">Lvl:</span>
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => toggleSet(level, selectedLevels, setSelectedLevels)}
            className={`px-1.5 py-0.5 rounded font-semibold text-[10px] transition-colors ${
              selectedLevels.has(level)
                ? "bg-blue-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
            }`}
          >
            {level}
          </button>
        ))}

        <span className="text-slate-300 dark:text-slate-600">|</span>

        {/* Categories */}
        <span className="font-semibold text-slate-500 dark:text-slate-400">Category:</span>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() =>
              toggleSet(c, selectedCategories, setSelectedCategories)
            }
            className={`px-1.5 py-0.5 rounded font-semibold text-[10px] transition-colors ${
              selectedCategories.has(c)
                ? "bg-blue-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};
