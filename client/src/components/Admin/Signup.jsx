import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import your custom CSS for styling
import logo from "../../assets/images/Kissanlogo.png";
const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  const verify = (e) => {
    e.preventDefault();

    if (passwordInput === confirmPassword) {
      setStatus(false);
      makeApiRequest();
      navigate("/");
    } else {
      setStatus(true);
    }
  };

  const makeApiRequest = async () => {
    try {
      const apiUrl = "https://kisanmart.onrender.com/signup";

      const requestBody = {
        userName,
        phoneNumber,
        password: passwordInput,
        email,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Successful response
        window.alert("Sign up successful!"); // Display an alert for success
      } else {
        // Error response
        console.error("API Error:", response.statusText);
        window.alert("Sign up failed. Please try again."); // Display an alert for failure
      }
    } catch (error) {
      // Handle network or other errors
      console.error("API Error:", error.message);
      window.alert("Network error. Please try again later."); // Display an alert for network error
    }
  };

  return (
    <div className="container-desktop">
      <div className="content">
        <img
          src={logo}
          className="image1"
          alt="KISSAN MART Logo"
          style={{ width: "10%", height: "auto" }}
        />
        <span id="title2">
          {" "}
          Empowering vegetable sale with KISSAN MART - Your trusted platform for
          seamless transactions, wider reach, and increased sales!
        </span>
      </div>

      <div className="input-container">
        <form onSubmit={verify}>
          <fieldset>
            <legend>User Name</legend>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input-box"
            />
          </fieldset>
          <fieldset>
            <legend>Email</legend>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-box"
            />
          </fieldset>
          <fieldset>
            <legend>Phone no</legend>
            <div className="number-input">
              <p>+91</p>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="input-box"
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Password</legend>
            <input
              type="password"
              id="password"
              name="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
              className="input-box"
            />
          </fieldset>
          <fieldset>
            <legend>Confirm Password</legend>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-box"
            />
          </fieldset>
          <button type="submit" className="submit-button">
            Sign Up
          </button>
          {status && (
            <div>
              <p style={{ color: "red" }}>
                *Password or Confirm Password is invalid
              </p>
            </div>
          )}
        </form>
      </div>
      <p>
        Already have an account?{" "}
        <span className="login-link" onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </div>
  );
};

export default SignUp;
