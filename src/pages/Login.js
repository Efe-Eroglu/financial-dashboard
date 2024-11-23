import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../services/authService"; 
import { showErrorToast, showSuccessToast } from "../utils/notification";
import { useAuth } from "../state/context/AuthContext"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login: contextLogin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { token } = await apiLogin(email, password);
      contextLogin(token);
      showSuccessToast("Giriş Başarılı!");
      navigate("/dashboard");
    } catch (err) {
      showErrorToast(err.message || "Giriş Başarısız!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Finansal Dashboard</h1>
        <p className="login-subtitle">Gelişmiş Takip, Basit Yönetim</p>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email adresinizi girin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              placeholder="Şifrenizi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
        <p className="login-footer">
          Hesabınız yok mu? <a href="/register">Kayıt Ol</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
