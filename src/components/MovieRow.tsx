import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow = ({ title, movies }: MovieRowProps) => {
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - (listRef.current?.offsetLeft || 0));
    setScrollLeft(listRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (listRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (Math.abs(walk) > 5) setHasDragged(true);
    if (listRef.current) {
      listRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setHasDragged(false);
    setStartX(e.touches[0].pageX - (listRef.current?.offsetLeft || 0));
    setScrollLeft(listRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const x = e.touches[0].pageX - (listRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (Math.abs(walk) > 5) setHasDragged(true);
    if (listRef.current) {
      listRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleCardClick = (movieId: number) => {
    if (!hasDragged) {
      navigate(`/movie/${movieId}`);
    }
  };

  return (
    <div className="movie-row">
      <h2 className="movie-row-title">{title}</h2>
      <div
        ref={listRef}
        className="movie-list"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => handleCardClick(movie.id)}
          >
            <img src={movie.thumbnail} alt={movie.title} className="movie-thumbnail" />
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <div className="movie-meta">
                <span>⭐ {movie.rating.toFixed(1)}</span>
                <span>{movie.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
