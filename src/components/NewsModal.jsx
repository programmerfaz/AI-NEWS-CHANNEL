import { X, Clock, TrendingUp, Tag, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const NewsModal = ({ article, onClose }) => {
  if (!article) return null;

  const getCategoryColor = (category) => {
    const colors = {
      'ML Models': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Startups': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Open Source': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Research': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Product Launches': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'AI Ethics': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
              {article.trending && (
                <div className="flex items-center space-x-1 text-red-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Trending</span>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Meta information */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span className="font-medium">{article.source}</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatDistanceToNow(new Date(article.timestamp), { addSuffix: true })}</span>
            </div>
          </div>

          {/* Summary */}
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              {article.summary}
            </p>
          </div>

          {/* Extended content (simulated) */}
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              This development represents a significant advancement in the field, with potential implications 
              for various industries and applications. The technology demonstrates improved performance metrics 
              and could reshape how we approach similar challenges in the future.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              Industry experts are closely monitoring these developments, as they may influence upcoming 
              product roadmaps and research directions. The broader implications for the tech ecosystem 
              remain to be seen as adoption increases.
            </p>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
            <button className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span>Read Full Article</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;