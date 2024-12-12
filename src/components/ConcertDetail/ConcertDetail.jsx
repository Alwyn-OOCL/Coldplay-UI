import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { concertDetail } from "../../api/concertDetailApi";
import "./ConcertDetail.css";

export default function ConcertDetail() {
  const { concert_id } = useParams();
  const navigate = useNavigate();
  const [concert, setConcert] = useState(null);

  const saleTime = new Date(concert?.concertSaleTime);
  const buttonLabel = new Date() < saleTime ? "Book Now!" : "Buy Now!";

  const handlePurchaseTicket = () => {
    const storedUser = localStorage.getItem("userToken");

    if (storedUser) {
      navigate(`/booking/${concert_id}`);
    } else {
      navigate(`/login`);
    }
  };

  useEffect(() => {
    concertDetail(concert_id).then((result) => {
      setConcert(result.data);
    });
  }, [concert_id]);

  return (
    <div className="concert-detail-page">
      <main className="container">
        <div className="concert-detail">
          <div className="concert-poster">
            <img
              src={concert?.concertImage}
              alt="concert poster"
              className="poster-image"
            />
          </div>

          <div className="concert-header">
            <div className="concert-datetime">
              <p>
                Date:
                {" " +
                  new Date(concert?.concertStartTime).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
              </p>
              <p>
                Time:{" "}
                {new Date(concert?.concertStartTime).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "numeric",
                    minute: "numeric",
                  },
                )}
                {" - "}
                Duration: {concert?.concertDuration} hours
              </p>
            </div>
          </div>

          <div className="concert-description">
            <h2>Concert Description</h2>
            <p>{concert?.concertDescription}</p>
            <p>
              Don't miss out on what promises to be one of the most talked-about
              concerts of the year!
            </p>
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

          <div className="seat-map">
            <h2>Seat Map</h2>
            <img
              src={concert?.venueImage}
              alt="Venue seat map"
              className="seat-map-image"
            />
          </div>

          <div className="purchase-section">
            <p>
              Sale Starts:{" "}
              {new Date(concert?.concertSaleTime).toLocaleTimeString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <button
              className="button button-primary purchase-button"
              onClick={handlePurchaseTicket}
            >
              {buttonLabel}
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
