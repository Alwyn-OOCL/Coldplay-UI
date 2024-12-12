import React, { useEffect, useState } from "react";
import baseApi from "../../../api/baseApi";
import "./NewsSectionGroup.css";
import NewsSectionItem from "./NewsSectionItem";

export default function NewsSectionGroup() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    baseApi
      .get("/newssections")
      .then((response) => {
        setNewsItems(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching news items:", error);
      });
  }, []);

  return (
    <section className="news-section">
      <div className="container">
        <div className="news-section-inner">
          <h2 className="section-title">News Sections</h2>
          <div className="news-list">
            {newsItems.map((item) => (
              <NewsSectionItem key={item.id} newsection={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
