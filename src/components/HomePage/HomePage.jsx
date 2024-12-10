import React from 'react';
import HomePoster from '../pages/HomePoster/HomePoster';
import HomeVideo from '../pages/HomeVideo/HomeVideo';
import NewSectionGroup from '../pages/NewSection/NewSectionGroup';

const HomePage = () => {
  return (<div>
    <HomePoster/>
    <HomeVideo/>
    <NewSectionGroup/>
  </div>);
};

export default HomePage;