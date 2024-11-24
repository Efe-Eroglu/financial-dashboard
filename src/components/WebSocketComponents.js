import React, { useEffect, useState } from "react";
import { startWebSocket, stopWebSocket } from "../services/websocketService";
import Heatmap from "./Heatmap";
import { showErrorToast } from "../utils/notification";

const WebSocketComponent = ({ symbols }) => {
  const [tickerData, setTickerData] = useState({});

  useEffect(() => {
    if (symbols && symbols.length > 0) {
      try {
        startWebSocket(symbols, (message) => {
          if (message.data && Array.isArray(message.data)) {
            const updatedData = message.data.reduce((acc, item) => {
              acc[item.instId] = {
                stock_symbol: item.instId,
                LastPrice: parseFloat(item.last || 0),
                High24h: parseFloat(item.high24h || 0),
                Low24h: parseFloat(item.low24h || 0),
                volume: parseFloat(item.vol24h || 0),
                change:
                  item.low24h > 0
                    ? ((item.last - item.low24h) / item.low24h) * 100
                    : 0,
              };
              return acc;
            }, {});

            setTickerData((prevData) => ({
              ...prevData,
              ...updatedData,
            }));
          }
        });
      } catch (error) {
        console.error("WebSocket error:", error.message);
        showErrorToast("WebSocket bağlantısı başarısız oldu.");
      }
    }

    return () => {
      stopWebSocket(); 
    };
  }, [symbols]);

  const heatmapData = Object.values(tickerData);

  return <Heatmap data={heatmapData} />;
};

export default WebSocketComponent;
