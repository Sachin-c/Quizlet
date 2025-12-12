import { useMemo } from "react";
import type { VocabularyWord } from "../types";
import { StorageManager } from "../utils/storage";
import { ProgressStats } from "./ProgressStats";

interface ProgressViewProps {
  allWords: VocabularyWord[];
}

export const ProgressView: React.FC<ProgressViewProps> = ({ allWords }) => {
  const progress = StorageManager.getProgress();
  const stats = useMemo(
    () => StorageManager.calculateStats(allWords, progress),
    [allWords, progress]
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Main Stats Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 card-shadow">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-4xl">📈</span>
          <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Your Progress
          </h2>
        </div>

        <ProgressStats
          todayStats={stats.todayStats}
          currentStreak={progress.currentStreak}
          masteredCards={stats.masterCards}
          totalCards={stats.totalCards}
        />
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overview */}
        <div className="card-elevated p-8 card-shadow">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📊</span>
            <h3 className="text-xl font-black text-gray-800">Overview</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <span className="text-gray-700 font-semibold">Total Cards</span>
              <span className="text-2xl font-black text-blue-600">
                {stats.totalCards}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
              <span className="text-gray-700 font-semibold">
                Reviewed Cards
              </span>
              <span className="text-2xl font-black text-green-600">
                {stats.reviewedCards}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
              <span className="text-gray-700 font-semibold">
                Mastered Cards
              </span>
              <span className="text-2xl font-black text-purple-600">
                {stats.masterCards}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50">
              <span className="text-gray-700 font-semibold">
                Overall Accuracy
              </span>
              <span className="text-2xl font-black text-orange-600">
                {stats.overallAccuracy > 0
                  ? stats.overallAccuracy.toFixed(1)
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>

        {/* Learning Journey */}
        <div className="card-elevated p-8 card-shadow">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🚀</span>
            <h3 className="text-xl font-black text-gray-800">
              Learning Journey
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
              <span className="text-gray-700 font-semibold">Days Studied</span>
              <span className="text-2xl font-black text-orange-600">
                {progress.dailyStats.length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-red-50 to-pink-50">
              <span className="text-gray-700 font-semibold">
                Current Streak
              </span>
              <span className="text-2xl font-black text-red-600 flex items-center gap-1">
                {progress.currentStreak} <span className="text-lg">🔥</span>
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50">
              <span className="text-gray-700 font-semibold">
                Last Study Date
              </span>
              <span className="text-lg font-black text-indigo-600">
                {progress.lastStudyDate || "—"}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-teal-50 to-green-50">
              <span className="text-gray-700 font-semibold">
                Total Cards Studied
              </span>
              <span className="text-2xl font-black text-teal-600">
                {progress.dailyStats.reduce(
                  (sum, stat) => sum + stat.cardsStudied,
                  0
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {progress.dailyStats.length > 0 && (
        <div className="card-elevated p-8 card-shadow">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📅</span>
            <h3 className="text-xl font-black text-gray-800">
              Recent Activity
            </h3>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {[...progress.dailyStats]
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .slice(0, 10)
              .map((stat) => (
                <div
                  key={stat.date}
                  className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div>
                    <p className="font-bold text-gray-800 text-lg">
                      {stat.date}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      📚 {stat.cardsStudied} cards • ✓ {stat.correctAnswers}{" "}
                      correct • ✗ {stat.incorrectAnswers} incorrect
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-2xl bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                      {stat.accuracy.toFixed(0)}%
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
