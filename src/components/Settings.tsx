import { useState } from "react";
import { StorageManager } from "../utils/storage";

interface SettingsProps {
  onDataCleared: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onDataCleared }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearData = () => {
    StorageManager.clearAllData();
    setShowConfirm(false);
    onDataCleared();
  };

  const currentProgress = StorageManager.getProgress();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 card-shadow">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-4xl">⚙️</span>
          <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Settings
          </h2>
        </div>

        {/* Statistics Overview */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📊</span>
            <h3 className="text-xl font-black text-gray-800">
              Your Statistics
            </h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-elevated p-6 card-shadow transform hover:scale-105 transition-transform">
              <p className="text-sm text-gray-600 font-semibold mb-2">
                Words Learned
              </p>
              <p className="text-3xl font-black bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                {currentProgress.totalWordsLearned}
              </p>
            </div>
            <div className="card-elevated p-6 card-shadow transform hover:scale-105 transition-transform">
              <p className="text-sm text-gray-600 font-semibold mb-2">
                Current Streak
              </p>
              <p className="text-3xl font-black bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                {currentProgress.currentStreak}
              </p>
            </div>
            <div className="card-elevated p-6 card-shadow transform hover:scale-105 transition-transform">
              <p className="text-sm text-gray-600 font-semibold mb-2">
                Total Sessions
              </p>
              <p className="text-3xl font-black bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                {currentProgress.dailyStats.length}
              </p>
            </div>
            <div className="card-elevated p-6 card-shadow transform hover:scale-105 transition-transform">
              <p className="text-sm text-gray-600 font-semibold mb-2">
                Last Study
              </p>
              <p className="text-lg font-black text-green-600 truncate">
                {currentProgress.lastStudyDate || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="border-t-2 border-gray-200 pt-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">💾</span>
            <h3 className="text-xl font-black text-gray-800">
              Data Management
            </h3>
          </div>
          <p className="text-gray-600 mb-6 text-lg">
            Export your learning data or reset your progress
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                const dataStr = JSON.stringify(currentProgress, null, 2);
                const element = document.createElement("a");
                element.setAttribute(
                  "href",
                  "data:text/plain;charset=utf-8," + encodeURIComponent(dataStr)
                );
                element.setAttribute("download", "french-vocab-progress.json");
                element.style.display = "none";
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span className="text-xl">📥</span>
              <span>Export Progress</span>
            </button>

            <button
              onClick={() => setShowConfirm(true)}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span className="text-xl">🗑️</span>
              <span>Clear All Data</span>
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 shadow-2xl card-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⚠️</span>
                <h4 className="text-2xl font-black text-gray-800">
                  Clear All Data?
                </h4>
              </div>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                This will permanently delete all your progress and vocabulary
                records. This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-800 font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearData}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
