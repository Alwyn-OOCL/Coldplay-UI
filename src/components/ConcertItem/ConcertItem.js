// src/components/ConcertItem/ConcertItem.js
import React from "react";
import { Link } from "react-router-dom";
import "./ConcertItem.css";

export default function ConcertItem({ concert }) {
  const date = new Date(concert.concertStartTime);
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const today = new Date();
  const isUpcoming = new Date(concert.concertSaleTime) > today;

  const ticketPrices = concert.areas
    ? concert.areas.map((a) => `${a.areaType}: $${a.price}`)
    : [];

  return (
    <Link to={`/concert/${concert.concertId}`} className="concert-item">
      <img
        src={concert.concertImage}
        alt={concert.concertName}
        className="concert-image"
      />
      <div className="concert-details">
        <h2>
          {isUpcoming ? <span>{concert.concertName} <span style={{ color: "red" }}>(Sales Not Started)</span></span> : concert.concertName}
        </h2>
        <p>
          <strong>Date:</strong> {dateString}
        </p>
        <p>
          <strong>Time:</strong> {timeString}
        </p>
        <p>
          <strong>Venue:</strong> {concert.venueName}
        </p>
        <p>
          <strong>Location:</strong> {concert.venueCity}, {concert.venueCountry}
        </p>
        <div className="ticket-prices">
          <p>
            <strong>Ticket Prices:</strong>
          </p>
          <ul>
            {ticketPrices.map((price, index) => (
              <li key={index}>{price}</li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
