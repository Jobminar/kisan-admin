import React from "react";
import "./homeheader.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/Kissanlogo.png";

const Homeheader = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  // Conditionally render the Header only when isLoggedIn is false
  if (isLoggedIn) {
    return null; // If isLoggedIn is true, don't render anything
  }

  return (
    <div className="header-main-con">
      <div className="image-con">
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            navigate("/home");
          }}
        />
      </div>
      <div className="header-con">
        <div
          onClick={() => {
            navigate("/aboutus");
          }}
        >
          About us
        </div>
        <div
          onClick={() => {
            navigate("/userproducts");
          }}
        >
          Products
        </div>
        <div
          onClick={() => {
            navigate("/blogs");
          }}
        >
          Blogs
        </div>
        <div
          onClick={() => {
            navigate("/contactus");
          }}
        >
          Contact us
        </div>
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default Homeheader;
