import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className='footer-links'>
            <h3>Coldplay World Tour</h3>
            <a href='https://www.coldplay.com/' className='social-link'>Coldplay</a>
          </div>
          <div className='footer-links'>
            <h3>Social</h3>
            {/*change url todo victor*/}
            <a href='https://www.instagram.com/coldplay/' className='social-link'>Instagram</a>
          </div>
          <div className="footer-links">
            <h3>FAQs</h3>
            <a href="#" className='social-link'>Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

