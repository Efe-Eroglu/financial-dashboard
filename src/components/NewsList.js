import React from "react";
import "../styles/newsList.css";

const NewsList = ({ news }) => {
  if (!news || news.length === 0) {
    return <p>Haber bulunmamaktadır.</p>;
  }

  return (
    <ul className="news-list">
      {news.map((item) => (
        <li key={item.id} className="news-item">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <h3>{item.title}</h3>
            <p>{item.source}</p>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
