import apiClient from "./apiClient";

export const fetchWatchlist = async () => {
  try {
    const response = await apiClient.get("/watchlist");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch watchlist:", error.message);
    throw error;
  }
};

export const fetchNews = async () => {
  try {
    const response = await apiClient.get("/news");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch news:", error.message);
    throw error;
  }
};
