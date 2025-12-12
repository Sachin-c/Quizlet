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
    "Work",
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
  }, [selectedLevels, selectedCategories, words]);

  const toggleLevel = (level: CEFRLevel) => {
    const newLevels = new Set(selectedLevels);
    if (newLevels.has(level)) {
      newLevels.delete(level);
    } else {
      newLevels.add(level);
    }
    setSelectedLevels(newLevels);
  };

  const toggleCategory = (category: Category) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
  };

  const clearFilters = () => {
    setSelectedLevels(new Set());
    setSelectedCategories(new Set());
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔍</span>
          <h3 className="text-2xl font-black text-gradient">Filters</h3>
        </div>
        {(selectedLevels.size > 0 || selectedCategories.size > 0) && (
          <button
            onClick={clearFilters}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors"
          >
            ✕ Clear All
          </button>
        )}
      </div>

      {/* Difficulty Levels */}
      <div className="mb-8">
        <h4 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          CEFR Level
        </h4>
        <div className="flex flex-wrap gap-3">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => toggleLevel(level)}
              className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-110 shadow-md ${
                selectedLevels.has(level)
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🏷️</span>
          Categories
        </h4>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-110 shadow-md ${
                selectedCategories.has(category)
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300"
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
