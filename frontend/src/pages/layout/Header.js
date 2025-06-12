import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="main-header">
      <div className="header-inner">
        <div className="logo-container">
          <img src={logo} alt="Sarastya Logo" className="header-logo-img" />
          <span className="header-logo-text">SARASTYA INTERNSHIP PROGRAM</span>
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</a></li>
            <li><a href="/pendaftaran" className={location.pathname === '/pendaftaran' ? 'active' : ''}>Pendaftaran</a></li>
            <li><a href="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profil</a></li>
          </ul>
        </nav>
        <div className="settings-container" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="settings-button" title="Pengaturan">
            <FontAwesomeIcon icon={faCog} />
          </button>
          {dropdownOpen && (
            <div className="settings-dropdown">
              <button onClick={handleLogout} className="logout-button">
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
