import { useState, useMemo } from 'react';
import NewsCard from './NewsCard';
import NewsModal from './NewsModal';
import LoadingSpinner from './LoadingSpinner';
import { TrendingUp, Newspaper, AlertCircle } from 'lucide-react';

const NewsFeed = ({ news, loading, error, searchTerm, selectedCategory }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredNews = useMemo(() => {
    let filtered = news;

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(term) ||
        article.summary.toLowerCase().includes(term) ||
        article.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [news, searchTerm, selectedCategory]);

  const trendingNews = useMemo(() => {
    return filteredNews.filter(article => article.trending);
  }, [filteredNews]);

  if (loading && news.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Error Loading News
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          {error}
        </p>
      </div>
    );
  }

  if (filteredNews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Newspaper className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No News Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          {searchTerm || selectedCategory !== 'All' 
            ? 'Try adjusting your search or category filter.'
            : 'Check back soon for the latest tech updates.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Trending Section */}
      {trendingNews.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Trending Now
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {trendingNews.slice(0, 2).map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onClick={setSelectedArticle}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main Feed */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Latest Updates
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredNews.length} articles
          </span>
        </div>
        
        <div className="space-y-6">
          {filteredNews.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onClick={setSelectedArticle}
            />
          ))}
        </div>
      </section>

      {/* Loading indicator for new content */}
      {loading && news.length > 0 && (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="sm" />
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            Loading new content...
          </span>
        </div>
      )}

      {/* News Modal */}
      {selectedArticle && (
        <NewsModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default NewsFeed;