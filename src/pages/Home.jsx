import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  getPopularMovies, 
  getTopRatedMovies, 
  getNowPlayingMovies, 
  getUpcomingMovies 
} from '../services/movieService'
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config'

function Home() {
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [favourites, setFavourites] = useState([])

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const [popular, topRated, nowPlaying, upcoming] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getNowPlayingMovies(),
          getUpcomingMovies()
        ])

        setPopularMovies(popular.results)
        setTopRatedMovies(topRated.results)
        setNowPlayingMovies(nowPlaying.results)
        setUpcomingMovies(upcoming.results)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching movies:', error)
        setLoading(false)
      }
    }

    fetchAllMovies()
    // 获取收藏列表
    const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')
    setFavourites(storedFavourites)
  }, [])

  const toggleFavourite = (movie) => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')
    const isFavourited = storedFavourites.some(fav => fav.id === movie.id)
    
    let newFavourites
    if (isFavourited) {
      // 从收藏中移除
      newFavourites = storedFavourites.filter(fav => fav.id !== movie.id)
    } else {
      // 添加到收藏
      const newFavourite = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date
      }
      newFavourites = [...storedFavourites, newFavourite]
    }
    
    localStorage.setItem('favourites', JSON.stringify(newFavourites))
    setFavourites(newFavourites)
  }

  const isFavourited = (movieId) => {
    return favourites.some(fav => fav.id === movieId)
  }

  const MovieSection = ({ title, movies }) => (
    <section className="movie-section">
      <h2>{title}</h2>
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`}>
              <img 
                src={movie.poster_path 
                  ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`
                  : '/placeholder.png'
                } 
                alt={movie.title} 
              />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>Rating: {movie.vote_average.toFixed(1)}</p>
                <p>Release Date: {movie.release_date}</p>
              </div>
            </Link>
            <button 
              className={`favourite-btn ${isFavourited(movie.id) ? 'active' : ''}`}
              onClick={() => toggleFavourite(movie)}
            >
              {isFavourited(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="home">
      <MovieSection title="Popular Movies" movies={popularMovies} />
      <MovieSection title="Top Rated" movies={topRatedMovies} />
      <MovieSection title="Now Playing" movies={nowPlayingMovies} />
      <MovieSection title="Coming Soon" movies={upcomingMovies} />
    </div>
  )
}

export default Home 