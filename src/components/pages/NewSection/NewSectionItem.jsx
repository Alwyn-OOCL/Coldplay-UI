import React from 'react';
import {Link} from 'react-router-dom';
import './NewSectionGroup.css';

const NewSectionItem = ({newsection}) => {
  return (
    <Link to={`/news/${newsection.id}`} className='news-item'>
      <div className='news-content'>
        <h3>{newsection.title}</h3>
        <p>{newsection.description}</p>
      </div>
      <div className='news-image'>
        <img src={newsection.image} alt={newsection.title}/>
      </div>
    </Link>
  );
};

export default NewSectionItem;