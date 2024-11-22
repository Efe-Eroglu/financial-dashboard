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

export const logout = (username, email, password) => {
  removeToken();
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
    throw error.response?.data || { error: "An error occurred during registration" };
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
