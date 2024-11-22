import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../services/authService";
import "../styles/forgotPassword.css";
import { showErrorToast, showSuccessToast } from "../utils/notification";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await requestPasswordReset(email);
      showSuccessToast("Kod gönderildi!")
      setTimeout(() => {
        navigate("/reset-password");
      }, 3000);
    } catch (err) {
      showErrorToast("Kod Gönderilemedi!")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1 className="forgot-password-title">Forgot Password</h1>
        {message && <p className="forgot-password-success">{message}</p>}
        {error && <p className="forgot-password-error">{error}</p>}
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="forgot-password-button" disabled={loading}>
            {loading ? "Processing..." : "Send Reset Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
