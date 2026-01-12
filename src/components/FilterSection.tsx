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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold uppercase tracking-wide text-gray-600">
          Filters
        </h3>
        {(selectedLevels.size > 0 || selectedCategories.size > 0) && (
          <button
            onClick={clearFilters}
            className="text-xs text-indigo-600 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-2 flex-wrap text-[10px]">
        {/* CEFR */}
        <span className="font-semibold text-gray-500">Lvl:</span>
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => toggleSet(level, selectedLevels, setSelectedLevels)}
            className={`px-1.5 py-0.5 rounded text-white font-semibold text-[10px] transition-colors ${
              selectedLevels.has(level)
                ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                : "bg-gray-400 text-gray-700 hover:bg-gray-600"
            }`}
          >
            {level}
          </button>
        ))}

        <span className="text-gray-300">|</span>

        {/* Categories */}
        <span className="font-semibold text-gray-500">Category:</span>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() =>
              toggleSet(c, selectedCategories, setSelectedCategories)
            }
            className={`px-1.5 py-0.5 rounded text-white font-semibold text-[10px] transition-colors ${
              selectedCategories.has(c)
                ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                : "bg-gray-400 text-gray-700 hover:bg-gray-500"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};
