import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import ArticlePage from './components/ArticlePage';
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
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Routes>
          <Route path="/" element={
            <>
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
            </>
          } />
          <Route path="/article/:slug" element={<ArticlePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;