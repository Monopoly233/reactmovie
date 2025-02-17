import { useState, Suspense } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Import page components
import Home from './pages/Home'
import About from './pages/About'
import Movie from './pages/Movie'
import Favourites from './pages/Favourites'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  // Add global loading state
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="app">
            <header>
              <nav>
                <Link to="/" className="logo">Movie App</Link>
                <div className="nav-links">
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
                  <Link to="/favourites">My Favourites</Link>
                </div>
              </nav>
            </header>

            <main>
              {isLoading && <LoadingSpinner />}
              <Routes>
                <Route path="/" element={<Home setIsLoading={setIsLoading} />} />
                <Route path="/about" element={<About />} />
                <Route path="/movie/:id" element={<Movie setIsLoading={setIsLoading} />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="*" element={<div>404 - Page Not Found</div>} />
              </Routes>
            </main>
          </div>
        </Suspense>
      </ErrorBoundary>
    </Router>
  )
}

export default App
