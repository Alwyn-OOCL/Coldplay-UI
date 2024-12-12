import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className='footer-links'>
            <h3>Social</h3>
            <div className='social-icons'>
              <a href="https://m.weibo.cn/p/index?containerid=100808aa968850a9d255494612acd0552f8fcd&extparam=Coldplay" target="_blank" rel="noopener noreferrer">
                <img src={require('../../assets/images/icon/Weibo.png')} alt='Weibo' className='social-icon'/>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={require('../../assets/images/icon/ins.png')} alt='Instagram' className='social-icon'/>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={require('../../assets/images/icon/Twitter.png')} alt='Twitter' className='social-icon'/>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <img src={require('../../assets/images/icon/Youtube.png')} alt='YouTube' className='social-icon'/>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={require('../../assets/images/icon/facebook.png')} alt='Facebook' className='social-icon'/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

