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
    next.has(value) ? next.delete(value) : next.add(value);
    setter(next);
  };

  const clearFilters = () => {
    setSelectedLevels(new Set());
    setSelectedCategories(new Set());
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
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

      {/* CEFR */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-2">Level</p>
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() =>
                toggleSet(level, selectedLevels, setSelectedLevels)
              }
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                selectedLevels.has(level)
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-2">Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                toggleSet(category, selectedCategories, setSelectedCategories)
              }
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                selectedCategories.has(category)
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
