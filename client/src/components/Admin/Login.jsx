import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const apiUrl = "https://kisanmart.onrender.com/login";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.message === "Login successful") {
          sessionStorage.setItem("isLoggedIn", "true");
          onLogin();
          navigate("/inventory");
        } else {
          console.error("Login failed:", data.message);
          alert("Login failed. Please try again.");
        }
      } else {
        console.error("Login failed:", response.statusText);
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("API Error:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleForgotPassword = () => {
    // Redirect to the Forgot Password page
    navigate("/forgot");
  };

  // const handleSignup = () => {
  //   navigate("/signup");
  // };

  return (
    <div id="login-container">
      <h2 id="login-title">User Login</h2>
      <form>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
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
        {/* <p id="signup-link" className="forgot-password" onClick={handleSignup}>
          Signup here if you don't have an account...
        </p> */}
      </form>
    </div>
  );
};

// PropTypes
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
