import React from 'react';
import './HomePoster.css';

export default function HomePoster() {
  return (
    <section className="homeposter">
      <div className="container homeposter-container">
        <div className="homeposter-content">
          <h1 className="homeposter-title">
            Join us for an unforgettable journey as Coldplay takes the stage across the globe. Experience the magic and music live in concert as we travel from city to city, bringing you the hits you love and
            new songs to discover.
          </h1>
          <p className="homeposter-subtitle"></p>
        </div>
        <div className="homeposter-image">
          <img
            src={require('../../assets/images/homeposter.png')}
            alt="Vibrant concert atmosphere"
            className="concert-image"
          />
        </div>
      </div>
    </section>
  );
}

