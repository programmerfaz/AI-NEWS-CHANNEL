import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, TrendingUp, Tag, Share2, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNews } from '../hooks/useNews';
import LoadingSpinner from './LoadingSpinner';

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { news, loading } = useNews();

  const article = news.find(item => item.url === slug);

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading && !article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to News Feed</span>
        </button>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
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

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">{article.source}</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatDistanceToNow(new Date(article.timestamp), { addSuffix: true })}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Bookmark className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {article.summary}
            </p>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none mb-8">
          {article.content ? (
            article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))
          ) : (
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This groundbreaking development represents a significant milestone in the rapidly evolving landscape of artificial intelligence and machine learning. The implications of this advancement extend far beyond the immediate technical achievements, potentially reshaping how we approach complex problems across various industries and applications.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Industry experts and researchers are closely monitoring these developments, as they may influence upcoming product roadmaps, research directions, and strategic investments in the AI sector. The technology demonstrates improved performance metrics and efficiency gains that could accelerate adoption across enterprise and consumer applications.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The broader implications for the tech ecosystem remain to be seen as adoption increases and real-world implementations provide more data on practical applications. Early indicators suggest that this could be a transformative moment for the field, with potential benefits spanning from enhanced productivity tools to breakthrough scientific research capabilities.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                As the technology continues to mature, stakeholders across the industry are preparing for the next phase of innovation, which promises to bring even more sophisticated capabilities and broader accessibility to advanced AI systems.
              </p>
            </div>
          )}
        </article>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <Tag className="w-3 h-3" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Continue Reading
          </h3>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
          >
            ← Back to all articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;