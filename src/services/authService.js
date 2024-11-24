import { showInfoToast } from "../utils/notification";
import apiClient from "./apiClient";
import { setToken, removeToken } from "./authHelper";
import { stopWebSocket } from "./websocketService";

export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    const { token } = response.data;

    if (!token) {
      throw new Error("Token not found in response");
    }

    setToken(token);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "An error occurred during login";
    throw new Error(errorMessage);
  }
};

export const logout = async () => {
  try {
    await apiClient.post("/auth/logout"); // Backend logout isteği
    stopWebSocket(); // WebSocket bağlantısını kapat
    removeToken(); // Token'i kaldır
    console.log("Kullanıcı çıkışı tamamlandı.");
  } catch (error) {
    console.error("Logout işleminde hata:", error.message);
    throw error; // Hata durumunda üst katmana bildir
  }
};



export const register = async (formData) => {
  try {
    const response = await apiClient.post("/auth/register", {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { error: "An error occurred during registration" }
    );
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to process request" };
  }
};

export const resetPassword = async (formData) => {
  try {
    const response = await apiClient.post("/auth/reset-password-code", {
      email: formData.email,
      reset_code: formData.resetCode,
      new_password: formData.newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to reset password" };
  }
};

export const startWebSocket = async () => {
  try {
    const response = await apiClient.post("/websocket/start");
    console.log("WebSocket connections started:", response.data.message);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to start WebSocket:",
      error.response?.data || error.message
    );
    throw error;
  }
};
