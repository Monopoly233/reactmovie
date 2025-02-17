import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails } from '../services/movieService'
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../config'

function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id)
        setMovie(data)
        setLoading(false)
        
        // 检查是否在收藏列表中
        const favourites = JSON.parse(localStorage.getItem('favourites') || '[]')
        setIsFavourite(favourites.some(fav => fav.id === data.id))
      } catch (error) {
        console.error('Error fetching movie details:', error)
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  const toggleFavourite = () => {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]')
    
    if (isFavourite) {
      // 从收藏中移除
      const newFavourites = favourites.filter(fav => fav.id !== movie.id)
      localStorage.setItem('favourites', JSON.stringify(newFavourites))
      setIsFavourite(false)
    } else {
      // 添加到收藏
      const newFavourite = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date
      }
      localStorage.setItem('favourites', JSON.stringify([...favourites, newFavourite]))
      setIsFavourite(true)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!movie) {
    return <div className="error">Unable to load movie information</div>
  }

  return (
    <div className="movie-details">
      <div 
        className="backdrop" 
        style={{
          backgroundImage: movie.backdrop_path 
            ? `url(${IMAGE_BASE_URL}/${BACKDROP_SIZE}${movie.backdrop_path})`
            : 'none'
        }}
      >
        <div className="backdrop-overlay"></div>
      </div>
      
      <div className="content">
        <div className="poster">
          <img 
            src={movie.poster_path 
              ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`
              : '/placeholder.png'
            } 
            alt={movie.title} 
          />
        </div>
        
        <div className="info">
          <h1>{movie.title}</h1>
          <button 
            className={`favourite-btn ${isFavourite ? 'active' : ''}`}
            onClick={toggleFavourite}
          >
            {isFavourite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          
          <div className="meta">
            <p className="release-date">Release Date: {movie.release_date}</p>
            <p className="rating">Rating: {movie.vote_average.toFixed(1)}</p>
            {movie.runtime && <p className="runtime">Duration: {movie.runtime} minutes</p>}
          </div>
          
          <div className="genres">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="genre">{genre.name}</span>
            ))}
          </div>
          
          <div className="overview">
            <h2>Overview</h2>
            <p>{movie.overview || 'No overview available'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie 