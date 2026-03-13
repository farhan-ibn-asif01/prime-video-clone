import { useState, useEffect } from 'react';
import { Movie } from '../types';

interface HeroProps {
  movies: Movie[];
}

const Hero = ({ movies }: HeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (!movies.length) return null;

  const movie = movies[currentIndex];

  return (
    <div className="hero" style={{ backgroundImage: `url(${movie.banner})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">{movie.title}</h1>
        <div className="hero-meta">
          <span>⭐ {movie.rating.toFixed(1)}</span>
          <span>{movie.year}</span>
        </div>
        <p className="hero-description">{movie.description}</p>
        <div className="hero-buttons">
          <button className="btn btn-primary">▶ Play</button>
          <button className="btn btn-secondary">+ Watchlist</button>
        </div>
      </div>
      <div className="hero-indicators">
        {movies.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
