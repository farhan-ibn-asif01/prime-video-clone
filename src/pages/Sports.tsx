import ContentGrid from '../components/ContentGrid';
import { getSportsContent } from '../services/api';

const Sports = () => {
  return <ContentGrid title="Sports" fetchData={getSportsContent} />;
};

export default Sports;
