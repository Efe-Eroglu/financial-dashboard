import React from "react";
import { Link } from "react-router-dom";
import "../styles/notFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-box">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
        <p className="not-found-suggestion">
          You might want to go back to the <Link to="/" className="not-found-link">Home Page</Link>.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
