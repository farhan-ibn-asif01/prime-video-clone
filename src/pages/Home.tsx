import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { getMoviesByCategory, searchMovies } from '../services/api';
import { Movie } from '../types';
import '../styles/App.css';

const Home = () => {
  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [fantasyMovies, setFantasyMovies] = useState<Movie[]>([]);
  const [thrillerMovies, setThrillerMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [action, comedy, fantasy, thriller] = await Promise.all([
          getMoviesByCategory('action'),
          getMoviesByCategory('comedy'),
          getMoviesByCategory('fantasy'),
          getMoviesByCategory('thriller'),
        ]);

        setHeroMovies(action.slice(0, 5));
        setActionMovies(action);
        setComedyMovies(comedy);
        setFantasyMovies(fantasy);
        setThrillerMovies(thriller);
        setLoading(false);
      } catch (err) {
        setError('Failed to load content. Check your TMDB API key in .env file.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const results = await searchMovies(query);
        setSearchResults(results);
      } catch (err) {
        console.error(err);
      }
    } else {
      setSearchResults([]);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      {searchQuery ? (
        <div style={{ paddingTop: '100px' }}>
          <MovieRow 
            title={`Search results for "${searchQuery}" (${searchResults.length})`} 
            movies={searchResults} 
          />
        </div>
      ) : (
        <>
          <Hero movies={heroMovies} />
          <MovieRow title="Action & Adventure" movies={actionMovies} />
          <MovieRow title="Comedy" movies={comedyMovies} />
          <MovieRow title="Fantasy" movies={fantasyMovies} />
          <MovieRow title="Thriller" movies={thrillerMovies} />
        </>
      )}
    </div>
  );
};

export default Home;
