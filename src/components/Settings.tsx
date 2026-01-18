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
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
           ⚙️ <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400 dark:from-slate-200 dark:to-slate-400">Settings</span>
        </h2>
        
        {/* Statistics Overview */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📊</span>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">
              Your Statistics
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">
                Words Learned
              </p>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                {currentProgress.totalWordsLearned}
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
               <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">
                Current Streak
              </p>
              <p className="text-2xl font-black text-orange-500 dark:text-orange-400">
                {currentProgress.stats?.currentStreak || 0} 🔥
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
               <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">
                Total Sessions
              </p>
              <p className="text-2xl font-black text-purple-600 dark:text-purple-400">
                {currentProgress.dailyStats.length}
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
               <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">
                Last Study
              </p>
              <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 truncate">
                {currentProgress.stats?.lastStudyDate || "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
              <h3 className="font-bold text-blue-800 dark:text-blue-400 text-lg mb-2">Export Data</h3>
              <p className="text-sm text-blue-600 dark:text-blue-300 mb-4">
                 Download your progress as a JSON file to keep a backup.
              </p>
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
                className="w-full py-3 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-200 dark:border-blue-800 font-bold rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 transition-all shadow-sm"
              >
                📥 Export JSON
              </button>
           </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
             <h3 className="font-bold text-red-800 dark:text-red-400 text-lg mb-2">Danger Zone</h3>
             <p className="text-sm text-red-600 dark:text-red-300 mb-6">
                Clearing your data will reset all your progress. This cannot be undone.
             </p>
             
             {!showConfirm ? (
                 <button 
                    onClick={() => setShowConfirm(true)}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
                 >
                    Reset All Progress
                 </button>
             ) : (
                 <div className="space-y-4 animate-scale-in">
                     <p className="font-bold text-center text-red-800 dark:text-red-400">Are you absolutely sure?</p>
                     <div className="flex gap-3">
                         <button
                            onClick={() => setShowConfirm(false)}
                            className="flex-1 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
                         >
                            Cancel
                         </button>
                         <button
                            onClick={handleClearData}
                            className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-all"
                         >
                            Delete Everything
                         </button>
                     </div>
                 </div>
             )}
          </div>

           <div className="text-center">
             <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                App Version 1.2.0 • Build 2024.05
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};
