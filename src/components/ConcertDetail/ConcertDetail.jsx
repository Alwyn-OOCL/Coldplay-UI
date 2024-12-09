import React from "react";
import { concerts } from "../../data/concerts";
import "./ConcertDetail.css";
import { useParams } from "react-router-dom";

export default function ConcertDetail() {
  const { id } = useParams();
  const concert = concerts.find((c) => c.id === parseInt(id)) || concerts[0];

  return (
    <div className="concert-detail-page">
      <main className="container">
        <div className="concert-detail">
          <div className="concert-poster">
            <img
              src="/placeholder.svg?height=400&width=1200"
              alt={`${concert.artist} concert poster`}
              className="poster-image"
            />
          </div>

          <div className="concert-header">
            <h1>
              {concert.artist} Live in {concert.city}
            </h1>
            <div className="concert-datetime">
              <p>
                Date:{" "}
                {new Date(concert.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>Time: {concert.time}</p>
            </div>
          </div>

          <div className="concert-info-grid">
            <div className="venue-details">
              <h2>Venue Details</h2>
              <p>{concert.venue}</p>
              <p>
                {concert.city}, {concert.country}
              </p>
            </div>

            <div className="ticket-prices">
              <h2>Ticket Prices</h2>
              <div className="price-list">
                <div className="price-item">
                  <span>VIP Seat</span>
                  <span>$250</span>
                </div>
                <div className="price-item">
                  <span>Front Row</span>
                  <span>$150</span>
                </div>
                <div className="price-item">
                  <span>General Admission</span>
                  <span>$80</span>
                </div>
              </div>
            </div>
          </div>

          <div className="performer-details">
            <h2>About the Artist</h2>
            <div className="performer-content">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt={concert.artist}
                className="performer-image"
              />
              <div className="performer-info">
                <h3>{concert.artist}</h3>
                <p>
                  Experience the magic of {concert.artist} live in concert!
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
          </div>

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
