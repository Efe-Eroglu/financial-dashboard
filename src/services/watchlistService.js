import apiClient from "./apiClient";
import { getUserIdFromToken } from "../utils/jwtHelper";

export const fetchWatchlist = async () => {
  try {
    const userID = getUserIdFromToken(); 
    if (!userID) throw new Error("User ID not found in token.");

    const response = await apiClient.get(`/watchlist?userID=${userID}`); 
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist:", error.message);
    throw error;
  }
};
