import React, { useEffect, useState } from "react";
import WebSocketComponent from "../components/WebSocketComponents";
import { fetchWatchlist } from "../services/watchlistService";
import { logout } from "../services/authService";
import "../styles/dashboard.css";
import { showErrorToast, showInfoToast } from "../utils/notification";
import NewsList from "../components/NewsList";

const Dashboard = () => {
  const [symbols, setSymbols] = useState([]);
  const [news, setNews] = useState([]); // Haberler için state

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const watchlist = await fetchWatchlist();
        setSymbols(watchlist);

        // İlgili haberleri getirme (örnek API)
        const newsResponse = await fetch("/api/news"); // Haber API'si
        const newsData = await newsResponse.json();
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching watchlist or news:", error.message);
      }
    };

    fetchSymbols();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      showInfoToast("Çıkış Yapıldı");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout işlemi başarısız:", error.message);
      showErrorToast("Çıkış sırasında bir hata oluştu.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="heatmap-section">
        <WebSocketComponent symbols={symbols} />
      </div>
      <div className="news-section">
        <h3 className="news-title">Haberler</h3>
        <NewsList news={news} />
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
