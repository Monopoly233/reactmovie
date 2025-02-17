import tmdbLogo from '../assets/tmdb-logo.svg'

function About() {
  return (
    <div className="about">
      <section className="about-app">
        <h1>About Movie App</h1>
        <p>This is a movie application built with React that allows users to:</p>
        <ul>
          <li>Browse popular movies, top-rated movies, now playing and upcoming movies</li>
          <li>View movie details</li>
          <li>Save favorite movies</li>
          <li>Manage favorites list</li>
        </ul>
      </section>

      <section className="tmdb-attribution">
        <h2>Data Source</h2>
        <p>This application uses the TMDB API but is not endorsed or certified by TMDb.</p>
        <div className="tmdb-logo">
          <img 
            src={tmdbLogo} 
            alt="TMDB Logo" 
          />
        </div>
      </section>
    </div>
  )
}

export default About 