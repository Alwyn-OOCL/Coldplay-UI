import React from "react";
import { useLocation } from "react-router-dom";
import "./NewsSectionGroup.css";

const NewSectionDetail = () => {
  const location = useLocation();
  const { newsection } = location.state;

  return (
    <div className="newsection-detail">
      <h1>{newsection.title}</h1>
      <img
        src={newsection.image}
        alt={newsection.title}
        className="newsection-image"
      />
      <p>{newsection.description}</p>
    </div>
  );
};

export default NewSectionDetail;
