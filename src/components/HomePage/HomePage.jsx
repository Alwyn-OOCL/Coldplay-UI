import React from "react";
import HomePoster from "../pages/HomePoster/HomePoster";
import HomeVideo from "../pages/HomeVideo/HomeVideo";
import NewsSectionGroup from "../pages/NewsSection/NewsSectionGroup";

const HomePage = () => {
  return (
    <div>
      <HomePoster />
      <HomeVideo />
      <NewsSectionGroup />
    </div>
  );
};

export default HomePage;
