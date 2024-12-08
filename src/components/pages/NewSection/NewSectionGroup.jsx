import React, {
  useState,
  useEffect
} from 'react';
import baseApi from '../../../api/baseApi';
import {Link} from 'react-router-dom';
import NewSectionItem from './NewSectionItem';
import './NewSectionGroup.css';

export default function NewSectionGroup () {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    baseApi.get('/newsections')
      .then(response => {
        setNewsItems(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching news items:', error);
      });
  }, []);


  return (
    <section className='news-section'>
      <div className='container'>
        <div className='news-section-inner'>
          <h2 className='section-title'>New Sections</h2>
          <div className='news-list'>
            {newsItems.map(item => (
              <NewSectionItem key={item.id} newsection={item}/>
            ))}
          </div>
          <Link to='/newsections' className='more-link'>
            More...
          </Link>
        </div>
      </div>
    </section>
  );
}