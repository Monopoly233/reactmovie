import { API_KEY, BASE_URL } from '../config'

export const fetchMovies = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching movies:', error)
    return null
  }
}

export const getPopularMovies = () => fetchMovies('/movie/popular')
export const getTopRatedMovies = () => fetchMovies('/movie/top_rated')
export const getNowPlayingMovies = () => fetchMovies('/movie/now_playing')
export const getUpcomingMovies = () => fetchMovies('/movie/upcoming')
export const getMovieDetails = (movieId) => fetchMovies(`/movie/${movieId}`)

//我在这里使用了ai生成，因为我是实在是懒得翻阅api文档