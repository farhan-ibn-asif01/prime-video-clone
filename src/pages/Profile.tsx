import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import { getAuthToken } from '../utils/auth';
import { getUserByEmail } from '../services/authService';
import '../styles/Profile.css';

interface UserProfile {
  name: string;
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const email = getAuthToken();
      if (!email) {
        toast.error('Please login to view profile');
        navigate('/login');
        return;
      }

      try {
        const userData = await getUserByEmail(email);
        setUser({ name: userData.name, email: userData.email });
      } catch (err) {
        toast.error('Failed to load profile');
      }
      setLoading(false);
    };

    fetchUser();
  }, [navigate]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return null;

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            <span>👤</span>
          </div>
          <h1 className="profile-title">Profile Details</h1>
          <div className="profile-info">
            <div className="info-row">
              <label>Name</label>
              <p>{user.name}</p>
            </div>
            <div className="info-row">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
