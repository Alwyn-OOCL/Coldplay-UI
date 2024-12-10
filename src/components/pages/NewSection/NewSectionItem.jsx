import React from 'react';
import {Link} from 'react-router-dom';
import './NewSectionGroup.css';

const NewSectionItem = ({newsection}) => {
  const truncatedDescription = newsection.description.length > 20
    ? `${newsection.description.substring(0, 40)}...`
    : newsection.description;

  return (
    <Link to={`/news/${newsection.id}`} className='news-item'>
      <div className='news-content'>
        <h3>{newsection.title}</h3>
        <p>{truncatedDescription}</p>
      </div>
      <div className='news-image'>
        <img src={newsection.image} alt={newsection.title}/>
      </div>
    </Link>
  );
};

export default NewSectionItem;