import { useState } from "react";

interface NavigationProps {
  onShowStats: () => void;
  onShowStudy: () => void;
  onShowQuiz: () => void;
  onShowVerbs: () => void;
  onShowSettings: () => void;
  onShowTyping: () => void;
  onShowSRS: () => void;
  activeView: "study" | "quiz" | "verbs" | "stats" | "settings" | "typing" | "srs";
}

export const Navigation: React.FC<NavigationProps> = ({
  onShowStats,
  onShowStudy,
  onShowQuiz,
  onShowVerbs,
  onShowSettings,
  onShowTyping,
  onShowSRS,
  activeView,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (view: string) => activeView === view;

  const navItems = [
    { key: "srs", label: "Smart", icon: "🧠", onClick: onShowSRS, highlight: true },
    { key: "study", label: "Study", icon: "📚", onClick: onShowStudy },
    { key: "typing", label: "Type", icon: "✍️", onClick: onShowTyping },
    { key: "quiz", label: "Quiz", icon: "📝", onClick: onShowQuiz },
    { key: "verbs", label: "Verbs", icon: "🔤", onClick: onShowVerbs },
    { key: "stats", label: "Stats", icon: "📊", onClick: onShowStats },
    { key: "settings", label: "⚙️", icon: "", onClick: onShowSettings },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="text-xl transform group-hover:scale-110 transition-transform duration-300">
              🇫🇷
            </span>
            <div className="hidden sm:block">
              <span className="text-lg font-bold tracking-tight">
                FrenchVocab
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={item.onClick}
                className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  isActive(item.key)
                    ? "bg-white text-purple-600 shadow-lg scale-105"
                    : item.highlight
                    ? "bg-white/20 text-white hover:bg-white/30 ring-1 ring-white/30"
                    : "text-white/90 hover:bg-white/15 hover:text-white"
                }`}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors text-xl"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-3 flex flex-col gap-1 animate-slide-down">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg font-semibold transition-all ${
                  isActive(item.key)
                    ? "bg-white text-purple-600"
                    : "text-white hover:bg-white/15"
                }`}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
