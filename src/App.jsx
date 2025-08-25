import { useState } from 'react';
import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import RefreshButton from './components/RefreshButton';
import { useNews } from './hooks/useNews';
import { useTheme } from './hooks/useTheme';
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { news, loading, error, lastRefresh, refreshNews } = useNews();
  
  // Initialize theme
  useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      
      <main>
        <NewsFeed
          news={news}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        />
      </main>

      <RefreshButton
        onRefresh={refreshNews}
        lastRefresh={lastRefresh}
        loading={loading}
      />
    </div>
  )
}

export default App;