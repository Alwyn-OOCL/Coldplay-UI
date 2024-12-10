import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import '../../assets/styles/global.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogoClick = () => {
    navigate('/'); // 跳转到首页
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo" onClick={handleLogoClick}>Coldplay World Tour</div>
        <div className='navbar-links'>
          <a href='/' className='nav-link'>Homepage</a>
          <a href='/concerts' className='nav-link'>Concerts</a>
          <a href='/newsections' className='nav-link'>New Sections</a>
        </div>
        <div className='navbar-auth'>
          <button className="button button-secondary" onClick={handleLogin}>Log In</button>
          <button className="button button-primary" onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
    </nav>
  );
}

