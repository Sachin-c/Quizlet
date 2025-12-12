import type { DailyStats } from "../types";

interface ProgressStatsProps {
  todayStats: DailyStats;
  currentStreak: number;
  masteredCards: number;
  totalCards: number;
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({
  todayStats,
  currentStreak,
  masteredCards,
  totalCards,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {/* Today's Cards */}
      <div className="card-elevated p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-semibold mb-2">
              Today's Cards
            </p>
            <p className="text-4xl font-black bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              {todayStats.cardsStudied}
            </p>
          </div>
          <div className="text-5xl opacity-20">📚</div>
        </div>
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 progress-fill"
            style={{
              width: `${Math.min((todayStats.cardsStudied / 20) * 100, 100)}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Today's Accuracy */}
      <div className="card-elevated p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-semibold mb-2">Accuracy</p>
            <p className="text-4xl font-black bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              {todayStats.accuracy > 0 ? todayStats.accuracy.toFixed(0) : 0}%
            </p>
          </div>
          <div className="text-5xl opacity-20">🎯</div>
        </div>
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-600 progress-fill"
            style={{ width: `${todayStats.accuracy}%` }}
          ></div>
        </div>
      </div>

      {/* Current Streak */}
      <div className="card-elevated p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-semibold mb-2">Streak</p>
            <p className="text-4xl font-black bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              {currentStreak}
            </p>
          </div>
          <div className="text-5xl animate-bounce">🔥</div>
        </div>
        <p className="text-xs text-gray-400 mt-4 font-medium">Days in a row</p>
      </div>

      {/* Mastered Cards */}
      <div className="card-elevated p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-semibold mb-2">Mastered</p>
            <p className="text-4xl font-black">
              <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                {masteredCards}
              </span>
              <span className="text-lg text-gray-400">/{totalCards}</span>
            </p>
          </div>
          <div className="text-5xl opacity-20">⭐</div>
        </div>
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-pink-600 progress-fill"
            style={{
              width: `${
                totalCards > 0 ? (masteredCards / totalCards) * 100 : 0
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
