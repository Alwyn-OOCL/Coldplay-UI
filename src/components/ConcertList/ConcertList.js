// src/components/ConcertList/ConcertList.js
import React from "react";
import ConcertItem from "../ConcertItem/ConcertItem";
import "./ConcertList.css";

export default function ConcertList({ concerts }) {
  return (
    <div className="concert-list">
      {concerts.map((concert) => (
        <ConcertItem key={concert.concertId} concert={concert} />
      ))}
    </div>
  );
}
