import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MovieRow from '../components/MovieRow';
import { getMovieDetails, getSimilarMovies } from '../services/api';
import { Movie } from '../types';
import '../styles/MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [movieData, similarData] = await Promise.all([
          getMovieDetails(id),
          getSimilarMovies(id)
        ]);
        setMovie(movieData);
        setSimilar(similarData);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  return (
    <div className="movie-detail">
      <Header />
      <div className="detail-hero">
        <img src={movie.banner} alt={movie.title} className="detail-background" />
        <div className="detail-overlay"></div>
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <div className="detail-content">
          <h1 className="detail-title">{movie.title}</h1>
          <div className="detail-meta">
            <span>⭐ {movie.rating.toFixed(1)}</span>
            <span>{movie.year}</span>
          </div>
          <p className="detail-description">{movie.description}</p>
          <div className="detail-buttons">
            <button className="btn btn-primary">▶ Play</button>
            <button className="btn btn-secondary">+ Watchlist</button>
          </div>
        </div>
      </div>
      <MovieRow title="More Like This" movies={similar} />
    </div>
  );
};

export default MovieDetail;
