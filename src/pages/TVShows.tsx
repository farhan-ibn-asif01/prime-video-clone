import ContentGrid from '../components/ContentGrid';
import { getAllTVShows } from '../services/api';

const TVShows = () => {
  return <ContentGrid title="TV Shows" fetchData={getAllTVShows} />;
};

export default TVShows;
