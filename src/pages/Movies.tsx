import ContentGrid from '../components/ContentGrid';
import { getAllMovies } from '../services/api';

const Movies = () => {
  return <ContentGrid title="Movies" fetchData={getAllMovies} />;
};

export default Movies;
