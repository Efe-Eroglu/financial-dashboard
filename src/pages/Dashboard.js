import React, { useEffect, useState } from "react";
import WebSocketComponent from "../components/WebSocketComponents";
import { fetchWatchlist } from "../services/watchlistService";
import { logout } from "../services/authService";
import "../styles/dashboard.css";
import { showErrorToast, showInfoToast } from "../utils/notification";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [symbols, setSymbols] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const watchlist = await fetchWatchlist();
        setSymbols(watchlist);
      } catch (error) {
        console.error("Error fetching watchlist:", error.message);
      }
    };

    fetchSymbols();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      showInfoToast("Çıkış Yapıldı");
      window.location.href = "/"
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
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
