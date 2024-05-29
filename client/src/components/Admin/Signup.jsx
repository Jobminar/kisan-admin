import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests
import Swal from "sweetalert2"; // Import Swal for displaying alerts
import "./Signup.css"; // Import your custom CSS for styling
import logo from "../../assets/images/Kissanlogo.png";

const SignUp = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://kisan-be-odvc.onrender.com/admin/signup",
        { phone, password },
      );
      console.log(response.data.message);
      Swal.fire({
        icon: "success",
        title: "Signup",
        text: "Signup successfully completed",
      });
      navigate("/");
    } catch (error) {
      // console.error("Error during signup:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Signup",
        text: "Please try again later",
      });
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
          Empowering vegetable sale with KISSAN MART - Your trusted platform for
          seamless transactions, wider reach, and increased sales!
        </span>
      </div>

      <div className="input-container">
        <form onSubmit={handleSignup}>
          <fieldset>
            <legend>Phone no</legend>
            <div className="number-input">
              <p>+91</p>
              <input
                type="number"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-box"
            />
          </fieldset>
          <button type="submit" className="submit-button">
            Sign Up
          </button>
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
