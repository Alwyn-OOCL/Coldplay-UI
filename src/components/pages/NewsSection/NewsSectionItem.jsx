import React from 'react';
import { Link } from 'react-router-dom';
import './NewsSectionGroup.css';

const NewSectionItem = ({ newsection }) => {
  // Format the date
  const formattedDate = new Date(newsection.createdTime).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '-').replace(',', '');

  const truncatedDescription = newsection.description.length > 360
    ? `${newsection.description.substring(0, 360)}...`
    : newsection.description;

  return (

    <Link to={`/newssections/${newsection.id}`} className='news-item' state={{newsection}}>
      <h1>{newsection.title}</h1>

      <div className='publication-content'>
        <div className='news-content'>
          <p>{truncatedDescription}</p>
          <div className='publication-date'>Updated: {formattedDate}</div>
        </div>
        <div className='news-image'>
          <img src={newsection.image} alt={newsection.title}/>
        </div>
      </div>
    </Link>
  );
};

export default NewSectionItem;