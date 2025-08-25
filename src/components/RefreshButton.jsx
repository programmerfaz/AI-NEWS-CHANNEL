import { RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const RefreshButton = ({ onRefresh, lastRefresh, loading }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex flex-col items-end space-y-2">
        {/* Last refresh indicator */}
        {lastRefresh && (
          <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
            Updated {formatDistanceToNow(lastRefresh, { addSuffix: true })}
          </div>
        )}
        
        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-105 disabled:scale-100"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default RefreshButton;