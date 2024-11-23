import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { fetchWatchlist, fetchNews } from "../services/dashboardService";
import Heatmap from "../components/Heatmap";
import NewsList from "../components/NewsList";

const Dashboard = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const watchlistData = await fetchWatchlist();
        setWatchlist(watchlistData);

        const newsData = await fetchNews();
        setNews(newsData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-heatmap">
          <h2>İzleme Listesi</h2>
          <Heatmap data={watchlist} />
        </section>

        <section className="dashboard-news">
          <h2>İlgili Haberler</h2>
          <NewsList news={news} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
