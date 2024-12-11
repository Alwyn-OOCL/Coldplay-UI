import React from 'react';
import { Link } from 'react-router-dom';
import './NewsSectionGroup.css';

const NewSectionItem = ({ newsection }) => {
  const truncatedDescription = newsection.description.length > 20
    ? `${newsection.description.substring(0, 40)}...`
    : newsection.description;

  return (
    <Link to={`/newssections/${newsection.id}`} className='news-item' state={{ newsection }}>
      <div className='news-content'>
        <h3>{newsection.title}</h3>
        <p>{truncatedDescription}</p>
      </div>
      <div className='news-image'>
        <img src={newsection.image} alt={newsection.title} />
      </div>
    </Link>
  );
};

export default NewSectionItem;