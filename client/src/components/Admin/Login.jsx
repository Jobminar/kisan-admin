import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const apiUrl = "http://localhost:4000/admin/login";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        sessionStorage.setItem("isLoggedIn", "true");
        onLogin();
        localStorage.setItem("token", data.token); // Extract token from response data
        navigate("/inventory");
      } else {
        // console.error("Login failed:", response.statusText);
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      // console.error("API Error:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleForgotPassword = () => {
    // Redirect to the Forgot Password page
    navigate("/forgot");
  };

  return (
    <div id="login-container">
      <h2 id="login-title">User Login</h2>
      <form>
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required
        />

        <button type="button" id="login-button" onClick={handleLogin}>
          Log In
        </button>

        <p
          id="forgot-password"
          className="forgot-password"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </p>
      </form>
    </div>
  );
};

// PropTypes
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
