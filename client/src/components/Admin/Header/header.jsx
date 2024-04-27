import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/Kissanlogo.png";

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoggedIn) {
      alert("Please login first to access the admin panel.");
      navigate('/')
    }
    // You can add additional logic for handling click events when logged in
  };

  const handleLogout = () => {
    const shouldLogout = window.confirm("Are you sure you want to logout?");



    if (shouldLogout) {
      // Clear the login status from sessionStorage
      sessionStorage.removeItem("isLoggedIn");
      // Call the onLogout callback from props
      onLogout();
      // Navigate to the login page
      navigate("/");
    }
  };

  return (
    <>
      <div className="header-main-con">
        <div className="image-con">
          <img
            src={logo}
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="header-con" onClick={handleClick}>
          <div
            onClick={() => {
              navigate("/users");
            }}
          >
            Users
          </div>
          <div
            onClick={() => {
              navigate("/orders");
            }}
          >
            Orders
          </div>
          <div
            onClick={() => {
              navigate("/inventory");
            }}
          >
            Inventory
          </div>
          <div
            onClick={() => {
              navigate("/products");
            }}
          >
            Products
          </div>
          <div
            onClick={() => {
              navigate("/reports");
            }}
          >
            Reports
          </div>
          <div
            onClick={() => {
              navigate("/all");
            }}
          >
           All
          </div>
          <div
            onClick={() => {
              navigate("/get");
            }}
          >
           Get
          </div>
          <div
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
