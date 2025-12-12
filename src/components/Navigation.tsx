import { useState } from "react";

interface NavigationProps {
  onShowStats: () => void;
  onShowStudy: () => void;
  onShowQuiz: () => void;
  onShowSettings: () => void;
  activeView: "study" | "quiz" | "stats" | "settings";
}

export const Navigation: React.FC<NavigationProps> = ({
  onShowStats,
  onShowStudy,
  onShowQuiz,
  onShowSettings,
  activeView,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (view: string) => activeView === view;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer hover:opacity-90 transition-opacity">
            <span className="text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
              🇫🇷
            </span>
            <div className="hidden sm:block">
              <span className="text-2xl font-black tracking-tight">
                FrenchVocab
              </span>
              <p className="text-xs opacity-90 font-medium">
                Master French • CEFR A1-C2
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={onShowStudy}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActive("study")
                  ? "bg-white text-purple-600 shadow-lg"
                  : "text-white hover:bg-white/20"
              }`}
            >
              📚 Study
            </button>
            <button
              onClick={onShowQuiz}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActive("quiz")
                  ? "bg-white text-purple-600 shadow-lg"
                  : "text-white hover:bg-white/20"
              }`}
            >
              📝 Quiz
            </button>
            <button
              onClick={onShowStats}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActive("stats")
                  ? "bg-white text-purple-600 shadow-lg"
                  : "text-white hover:bg-white/20"
              }`}
            >
              📊 Progress
            </button>
            <button
              onClick={onShowSettings}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActive("settings")
                  ? "bg-white text-purple-600 shadow-lg"
                  : "text-white hover:bg-white/20"
              }`}
            >
              ⚙️ Settings
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg hover:bg-white/20 transition-colors text-2xl"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-2 animate-slide-down">
            <button
              onClick={() => {
                onShowStudy();
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                isActive("study")
                  ? "bg-white text-purple-600"
                  : "text-white hover:bg-white/20"
              }`}
            >
              📚 Study
            </button>
            <button
              onClick={() => {
                onShowQuiz();
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                isActive("quiz")
                  ? "bg-white text-purple-600"
                  : "text-white hover:bg-white/20"
              }`}
            >
              📝 Quiz
            </button>
            <button
              onClick={() => {
                onShowStats();
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                isActive("stats")
                  ? "bg-white text-purple-600"
                  : "text-white hover:bg-white/20"
              }`}
            >
              📊 Progress
            </button>
            <button
              onClick={() => {
                onShowSettings();
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                isActive("settings")
                  ? "bg-white text-purple-600"
                  : "text-white hover:bg-white/20"
              }`}
            >
              ⚙️ Settings
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
