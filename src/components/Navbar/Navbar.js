import React from 'react';
import './Navbar.css';
import '../../assets/styles/global.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">Coldplay World Tour</div>
        <div className="navbar-links">
          <a href="/" className="nav-link">Homepage</a>
          <a href="/concerts" className="nav-link">Concerts</a>
        </div>
        <div className="navbar-auth">
          <button className="button button-secondary">Log In</button>
          <button className="button button-primary">Sign up</button>
        </div>
      </div>
    </nav>
  );
}

