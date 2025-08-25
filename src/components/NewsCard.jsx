import { Clock, TrendingUp, ExternalLink, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const NewsCard = ({ article, onClick }) => {
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
    <article 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={() => onClick(article)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            {article.trending && (
              <div className="flex items-center space-x-1 text-red-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium">Trending</span>
              </div>
            )}
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {article.title}
        </h2>

        {/* Summary */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.summary}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
              >
                <Tag className="w-3 h-3" />
                <span>{tag}</span>
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="font-medium">{article.source}</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatDistanceToNow(new Date(article.timestamp), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;