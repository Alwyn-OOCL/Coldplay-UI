import React from 'react';
import './HomePoster.css';
import {useNavigate} from 'react-router-dom';

export default function HomePoster () {
  const navigate = useNavigate();
  const handleGetTicket = () => {
    navigate('/concerts'); // 跳转到首页
  };

  return (
    <section className='homeposter'>
      <div className='container homeposter-container'>
        <div className='homeposter-content'>
          <h1 className='homeposter-title'>
            Experience Cold play's World Tour & enjoy the music live!
          </h1>
          <p className='homeposter-subtitle'>Join us for an unforgettable journey as Coldplay takes the stage across the globe.</p>
          <button className='button button-primary' onClick={handleGetTicket}>Get Tickets</button>
        </div>
        <div className='homeposter-image'>
          <img
            src={require('../../../assets/images/homeposter.png')}
            alt='Vibrant concert atmosphere'
            className='concert-image'
          />
        </div>
      </div>
    </section>
  );
}

