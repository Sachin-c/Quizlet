interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  resultCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  resultCount,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Search French or English..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-5 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-700 placeholder-gray-400 transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && resultCount !== undefined && (
        <p className="mt-2 text-sm text-gray-600">
          Found{" "}
          <span className="font-semibold text-indigo-600">{resultCount}</span>{" "}
          word
          {resultCount !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};
