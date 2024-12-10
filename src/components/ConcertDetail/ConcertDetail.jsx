import React, { useEffect, useState } from "react";
import { concerts } from "../../data/concerts";
import "./ConcertDetail.css";
import { useParams } from "react-router-dom";
import { concertDetail } from "../../api/concertDetailApi";

export default function ConcertDetail() {

  const { id } = useParams();
  const [concert, setConcert] = useState(null);

  //const concert = concerts.find((c) => c.id === parseInt(id)) || concerts[0];

  useEffect(() => {
    concertDetail(id).then((result) => { 
      setConcert(result.data);
    });
  }, [id]);

  return (
    <div className="concert-detail-page">
      <main className="container">
        <div className="concert-detail">
          <div className="concert-poster">
            <img
              src="/placeholder.svg?height=400&width=1200"
              alt={`${concert?.concertImage} concert poster`}
              className="poster-image"
            />
          </div>

          <div className="concert-header">
            {/* <h1>
              {concert.artist} Live in {concert.city}
            </h1> */}
            <div className="concert-datetime">
              <p>
                Date:{" "}
                {new Date(concert?.concertStartTime).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>Time: {new Date(concert?.concertStartTime).toLocaleDateString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}</p>
            </div>
          </div>

          <div className="concert-info-grid">
            <div className="venue-details">
              <h2>Venue Details</h2>
              <p>{concert?.venueAddress}</p>
              <p>
                {concert?.venueCity}, {concert?.venueCountry}
              </p>
            </div>

            <div className="ticket-prices">
              <h2>Ticket Prices</h2>
              <div className="price-list">
              {concert?.areas.map((price, index) => (
                  <div className="price-item" key={index}>
                    <span>{price.areaType}</span>
                    <span>${price.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <div className="performer-details">
            <h2>About the Artist</h2>
            <div className="performer-content">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt={concert?.artist}
                className="performer-image"
              />
              <div className="performer-info">
                <p>
                  Experience the magic of live in concert!
                  Known for their spectacular live performances and incredible
                  stage presence, this is a show you won't want to miss.
                </p>
                <div className="performer-stats">
                  <div className="stat">
                    <strong>Genre</strong>
                    <span>Alternative Rock</span>
                  </div>
                  <div className="stat">
                    <strong>Duration</strong>
                    <span>2.5 hours</span>
                  </div>
                  <div className="stat">
                    <strong>Age Restriction</strong>
                    <span>All Ages</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="seat-map">
            <h2>Seat Map</h2>
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="Venue seat map"
              className="seat-map-image"
            />
          </div>

          <div className="concert-description">
            <h2>Event Description</h2>
            <p>
              Join us for an unforgettable evening of music and entertainment.
              This concert promises to be a spectacular showcase of talent,
              featuring all your favorite hits performed live. The venue offers
              state-of-the-art sound and lighting systems, ensuring an immersive
              experience for all attendees.
            </p>
            <p>
              Don't miss out on what promises to be one of the most talked-about
              concerts of the year!
            </p>
          </div>

          <div className="purchase-section">
            <button className="button button-primary purchase-button">
              Purchase Tickets
            </button>
            <p className="terms">
              By purchasing tickets you agree to our terms and conditions
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
