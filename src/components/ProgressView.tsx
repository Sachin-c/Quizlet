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
          currentStreak={progress.stats.currentStreak}
          masteredCards={stats.masterCards}
          totalCards={stats.totalCards}
        />
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overview */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📊</span>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">Overview</h3>
          </div>
          {/* ... (no changes to overview items needed, just make sure stats object is correct) ... */}
          <div className="space-y-4">
             {/* Total Cards */}
             <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
               <span className="text-slate-600 dark:text-slate-400 font-semibold">Total Cards</span>
               <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{stats.totalCards}</span>
             </div>
             {/* Reviewed */}
             <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
               <span className="text-slate-600 dark:text-slate-400 font-semibold">Reviewed</span>
               <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{stats.reviewedCards}</span>
             </div>
              {/* Mastered */}
             <div className="flex justify-between items-center p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
               <span className="text-slate-600 dark:text-slate-400 font-semibold">Mastered</span>
               <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{stats.masterCards}</span>
             </div>
             {/* Accuracy */}
             <div className="flex justify-between items-center p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
               <span className="text-slate-600 dark:text-slate-400 font-semibold">Accuracy</span>
               <span className="text-2xl font-black text-purple-600 dark:text-purple-400">{stats.overallAccuracy.toFixed(1)}%</span>
             </div>
          </div>
        </div>

        {/* Learning Journey */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🚀</span>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">
              Learning Journey
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
              <span className="text-slate-600 dark:text-slate-400 font-semibold">Days Studied</span>
              <span className="text-2xl font-black text-orange-600 dark:text-orange-400">
                {progress.dailyStats.length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
              <span className="text-slate-600 dark:text-slate-400 font-semibold">
                Current Streak
              </span>
              <span className="text-2xl font-black text-red-600 dark:text-red-400 flex items-center gap-1">
                {progress.stats.currentStreak} <span className="text-lg">🔥</span>
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <span className="text-slate-600 dark:text-slate-400 font-semibold">
                Last Study Date
              </span>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                {progress.stats.lastStudyDate || "—"}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-teal-50 dark:bg-teal-900/20">
              <span className="text-slate-600 dark:text-slate-400 font-semibold">
                Total Cards Studied
              </span>
              <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
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
