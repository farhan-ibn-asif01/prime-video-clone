import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Movie } from '../types';
import '../styles/ContentPage.css';

interface ContentGridProps {
  title: string;
  fetchData: () => Promise<Movie[]>;
}

const ContentGrid = ({ title, fetchData }: ContentGridProps) => {
  const [items, setItems] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setItems(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="content-page">
      <Header />
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
      </div>
      <div className="content-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid-card"
            onClick={() => navigate(`/movie/${item.id}`)}
          >
            <img src={item.thumbnail} alt={item.title} className="grid-thumbnail" />
            <div className="grid-info">
              <h3 className="grid-title">{item.title}</h3>
              <div className="grid-meta">
                <span>⭐ {item.rating.toFixed(1)}</span>
                <span>{item.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentGrid;
