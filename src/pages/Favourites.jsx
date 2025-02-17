import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config'

function Favourites() {
  const [favourites, setFavourites] = useState([])

  useEffect(() => {
    // 从 localStorage 获取收藏的电影
    const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')
    setFavourites(storedFavourites)

    // 添加事件监听器以实时更新收藏列表
    const handleStorageChange = () => {
      const updatedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')
      setFavourites(updatedFavourites)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const removeFavourite = (movieId) => {
    const newFavourites = favourites.filter(movie => movie.id !== movieId)
    localStorage.setItem('favourites', JSON.stringify(newFavourites))
    setFavourites(newFavourites)
  }

  return (
    <div className="favourites-page">
      <h1>My Favorites</h1>
      {favourites.length === 0 ? (
        <div className="empty-favourites">
          <p>No favorite movies yet</p>
          <Link to="/" className="browse-link">Browse Movies</Link>
        </div>
      ) : (
        <div className="movies-grid">
          {favourites.map(movie => (
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
                className="remove-favourite"
                onClick={() => removeFavourite(movie.id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favourites 