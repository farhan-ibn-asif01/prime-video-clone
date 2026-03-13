import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../services/authService';
import { setAuthToken } from '../utils/auth';
import '../styles/Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
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
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName) {
      toast.error('Name is required');
      return;
    }

    if (trimmedName.length < 2) {
      toast.error('Name must be at least 2 characters');
      return;
    }

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
      const user = await signup(trimmedName, trimmedEmail, trimmedPassword);
      setAuthToken(user.email);
      toast.success('Account created successfully!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err: any) {
      if (err.message.includes('already exists')) {
        toast.error('Email already exists. Please use a different email.');
      } else {
        toast.error(err.message || 'Signup failed');
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-logo" onClick={() => navigate('/')}>prime video</div>
      </div>
      <div className="auth-box">
        <h1 className="auth-title">Create account</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <small>Password must be at least 6 characters</small>
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creating account...' : 'Create your Prime Video account'}
          </button>
        </form>
        <div className="auth-divider">
          <span>Already have an account?</span>
        </div>
        <button className="auth-button-secondary" onClick={() => navigate('/login')}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Signup;
