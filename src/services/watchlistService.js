import apiClient from "./apiClient";
import { getUserIdFromToken } from "../utils/jwtHelper";

export const fetchWatchlist = async () => {
  try {
    const userID = getUserIdFromToken(); // Token'dan kullanıcı kimliğini al
    if (!userID) throw new Error("User ID not found in token.");

    const response = await apiClient.get(`/watchlist?userID=${userID}`); // API çağrısı
    return response.data.map((item) => item.stock_symbol); 
  } catch (error) {
    console.error("Error fetching watchlist:", error.message);
    throw error;
  }
};
