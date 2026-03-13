import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../services/authService';
import { setAuthToken } from '../utils/auth';
import '../styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trim all inputs
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      toast.error('Email is required');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!trimmedPassword) {
      toast.error('Password is required');
      return;
    }

    if (trimmedPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const user = await login(trimmedEmail, trimmedPassword);
      setAuthToken(user.email);
      toast.success('Successfully signed in!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-logo" onClick={() => navigate('/')}>prime video</div>
      </div>
      <div className="auth-box">
        <h1 className="auth-title">Sign in</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="auth-divider">
          <span>New to Prime Video?</span>
        </div>
        <button className="auth-button-secondary" onClick={() => navigate('/signup')}>
          Create your Prime Video account
        </button>
      </div>
    </div>
  );
};

export default Login;
