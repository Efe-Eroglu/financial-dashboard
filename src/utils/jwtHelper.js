import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error.message);
    return null;
  }
};

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    console.error("Token not found in localStorage.");
    return null;
  }

  const decoded = decodeToken(token);
  if (!decoded || !decoded.user_id) {
    console.error("User ID not found in decoded token.");
    return null;
  }

  return decoded.user_id; 
};
