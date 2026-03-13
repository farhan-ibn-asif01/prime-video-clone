import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, removeAuthToken } from '../utils/auth';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

const Header = ({ onSearch, searchQuery = '' }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState(searchQuery);
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  const handleLogout = () => {
    removeAuthToken();
    setShowDropdown(false);
    navigate('/login');
    window.location.reload();
  };

  const handleProfileClick = () => {
    setShowDropdown(false);
    navigate('/profile');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-left">
        <div className="logo" onClick={() => navigate('/')}>prime video</div>
        <nav className="nav">
          <a onClick={() => navigate('/')}>Home</a>
          <a onClick={() => navigate('/movies')}>Movies</a>
          <a onClick={() => navigate('/tv-shows')}>TV Shows</a>
          <a onClick={() => navigate('/sports')}>Sports</a>
        </nav>
      </div>
      <div className="header-right">
        <div className="search-container-header">
          <input
            type="text"
            className="search-input-header"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
          />
          <span className="search-icon-header">🔍</span>
        </div>
        {loggedIn ? (
          <div className="user-dropdown" ref={dropdownRef}>
            <span 
              className="user-icon" 
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: 'pointer' }}
            >
              👤
            </span>
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={handleProfileClick}>
                  <span>👤</span>
                  <span>Profile</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={handleLogout}>
                  <span>🚪</span>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <span className="user-icon" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }} title="Login">👤</span>
        )}
      </div>
    </header>
  );
};

export default Header;
