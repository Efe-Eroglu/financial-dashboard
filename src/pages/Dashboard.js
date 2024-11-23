import React, { useState, useEffect } from "react";
import Heatmap from "../components/Heatmap";
import apiClient from "../services/apiClient";

const Dashboard = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await apiClient.get("/watchlist");
        setWatchlist(response.data);
      } catch (error) {
        console.error("Error fetching watchlist:", error.message);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <div>
      <h1>Heatmap</h1>
      <Heatmap data={watchlist} />
    </div>
  );
};

export default Dashboard;
