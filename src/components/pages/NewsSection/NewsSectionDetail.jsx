import React from 'react';
import { useLocation } from 'react-router-dom';
import './NewsSectionGroup.css';

const NewSectionDetail = () => {
  const location = useLocation();
  const { newsection } = location.state;

  // Format the date
  const formattedDate = new Date(newsection.createdTime).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '-').replace(',', '');

  return (
    <div className='newsection-detail'>
      <h1>{newsection.title}</h1>
      <div className='publication-date'>Updated: {formattedDate}</div>
      <img src={newsection.image} alt={newsection.title} className='newsection-image' />
      <div className='description-box'>
        <p>{newsection.description}</p>
      </div>
    </div>
  );
};

export default NewSectionDetail;