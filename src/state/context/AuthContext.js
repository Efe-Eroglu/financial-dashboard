import React, { createContext, useContext, useState } from "react";
import { setToken, removeToken, isAuthenticated as checkAuth } from "../../services/authHelper";
import { showInfoToast } from "../../utils/notification";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => checkAuth());

  const login = (token) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    showInfoToast("Çıkış İşlemi Başarılı!")
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
