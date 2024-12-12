import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePoster.css';

export default function HomePoster () {
  const navigate = useNavigate();
  const handleGetTicket = () => {
    navigate('/concerts');
  };

  return (
    <section className='homeposter'>
      <div className='container homeposter-container'>
        <div className='homeposter-content'>
          <h1 className='homeposter-title'>
            Experience Coldplay's World Tour & enjoy the music live!
          </h1>
          <p className='homeposter-subtitle'>Join us for an unforgettable journey as Coldplay takes the stage across the globe.</p>
          <button className='button button-primary' onClick={handleGetTicket}>Get Tickets</button>
        </div>
        <div className='homeposter-image'>
          <img
            src={require('../../../assets/images/homeposter.png')}
            alt='Vibrant concert atmosphere'
            className='home-concert-image'
          />
        </div>
      </div>
    </section>
  );
}

