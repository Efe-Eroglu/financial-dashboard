import apiClient from "./apiClient";
import { setToken, removeToken } from "./authHelper";

export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    const { token } = response.data;
    setToken(token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred during login" };
  }
};

export const logout = () => {
  removeToken();
};

