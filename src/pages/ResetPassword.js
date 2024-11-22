import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";
import "../styles/resetPassword.css";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    resetCode: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await resetPassword(formData);
      setMessage(response.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.error || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h1 className="reset-password-title">Reset Password</h1>
        {message && <p className="reset-password-success">{message}</p>}
        {error && <p className="reset-password-error">{error}</p>}
        <form className="reset-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="resetCode">Reset Code</label>
            <input
              type="text"
              id="resetCode"
              name="resetCode"
              value={formData.resetCode}
              onChange={handleChange}
              placeholder="Enter the reset code"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
              required
            />
          </div>
          <button type="submit" className="reset-password-button" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
