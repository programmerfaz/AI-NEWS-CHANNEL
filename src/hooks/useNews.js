import { useState, useEffect, useCallback } from 'react';
import { generateNewsContent } from '../services/openai';

export const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchNews = useCallback(async (category = 'general') => {
    try {
      setLoading(true);
      setError(null);
      const newNews = await generateNewsContent(category);
      
      // Add unique IDs and ensure proper structure
      const processedNews = newNews.map((item, index) => ({
        ...item,
        id: Date.now() + index,
        timestamp: item.timestamp || new Date().toISOString()
      }));
      
      setNews(prevNews => {
        // Merge new news with existing, avoiding duplicates
        const combined = [...processedNews, ...prevNews];
        const unique = combined.filter((item, index, self) => 
          index === self.findIndex(t => t.title === item.title)
        );
        return unique.slice(0, 50); // Keep only latest 50 items
      });
      
      setLastRefresh(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshNews = useCallback(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    fetchNews();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchNews();
    }, 300000);

    return () => clearInterval(interval);
  }, [fetchNews]);

  return {
    news,
    loading,
    error,
    lastRefresh,
    refreshNews,
    fetchNews
  };
};