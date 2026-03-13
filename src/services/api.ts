import axios from 'axios';
import { Movie } from '../types';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

const tmdbToMovie = (item: any): Movie => ({
  id: item.id,
  title: item.title || item.name,
  category: '',
  thumbnail: item.poster_path ? `${TMDB_IMAGE_BASE}/w500${item.poster_path}` : '',
  banner: item.backdrop_path ? `${TMDB_IMAGE_BASE}/original${item.backdrop_path}` : '',
  rating: item.vote_average,
  year: new Date(item.release_date || item.first_air_date || '').getFullYear(),
  description: item.overview
});

export const getMoviesByCategory = async (category: string): Promise<Movie[]> => {
  const endpoints: Record<string, string> = {
    action: `/discover/movie?with_genres=28`,
    comedy: `/discover/movie?with_genres=35`,
    fantasy: `/discover/movie?with_genres=14`,
    thriller: `/discover/movie?with_genres=53`
  };
  
  const response = await axios.get(`${TMDB_BASE_URL}${endpoints[category]}`, {
    params: { api_key: TMDB_API_KEY }
  });
  return response.data.results.map(tmdbToMovie);
};

export const getMovieDetails = async (id: string): Promise<Movie> => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
    params: { api_key: TMDB_API_KEY }
  });
  return tmdbToMovie(response.data);
};

export const getSimilarMovies = async (id: string): Promise<Movie[]> => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}/similar`, {
    params: { api_key: TMDB_API_KEY }
  });
  return response.data.results.slice(0, 12).map(tmdbToMovie);
};

export const getAllMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
    params: { api_key: TMDB_API_KEY, sort_by: 'popularity.desc' }
  });
  return response.data.results.map(tmdbToMovie);
};

export const getAllTVShows = async (): Promise<Movie[]> => {
  const response = await axios.get(`${TMDB_BASE_URL}/discover/tv`, {
    params: { api_key: TMDB_API_KEY, sort_by: 'popularity.desc' }
  });
  return response.data.results.map(tmdbToMovie);
};

export const getSportsContent = async (): Promise<Movie[]> => {
  const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
    params: { api_key: TMDB_API_KEY, with_keywords: '6075', sort_by: 'popularity.desc' }
  });
  return response.data.results.map(tmdbToMovie);
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
    params: { api_key: TMDB_API_KEY, query }
  });
  return response.data.results.filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv').map(tmdbToMovie);
};
