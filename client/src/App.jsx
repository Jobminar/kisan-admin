import React, { useState, useEffect } from "react";
import Header from "./components/Admin/Header/header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inventory from "./components/Admin/Inventory/Inventory";
import Product from "./components/Admin/Products/Product";
import Users from "./components/Admin/Users/users";
import Orders from "./components/Admin/Orders/orders";
import Login from "./components/Admin/Login";
import Footer from "./components/User/Footer";
import ForgotPassword from "./components/Admin/ForgotPassword";
import SignUp from "./components/Admin/Signup";
import Shippingpolicy from "./components/User/shipping-policy";
import Refundpolicy from "./components/User/refund-policy";
import Returnexchange from "./components/User/return-exchange";
import Privacypolicy from "./components/User/privacy-policy";
import Termsconditions from "./components/User/terms-conditions";
import Reports from "./components/Admin/reports";
import All from "./All";
import FruitList from "./Get";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check sessionStorage for login status on initial mount
    const storedLoginStatus = sessionStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Set login status in sessionStorage
    sessionStorage.setItem("isLoggedIn", "true");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear login status from sessionStorage
    localStorage.removeItem("token")
    sessionStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
    // Additional logout logic if needed
  };

  return (
    <>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/products" element={<Product />} />
              <Route path="/users" element={<Users />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/all" element={<All/>} />
              <Route path="/get" element={<FruitList />} />
            </>
          ) : (
            <Route path="/" element={<Login onLogin={handleLogin} />} />
          )}
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shippingpolicy" element={<Shippingpolicy />} />
          <Route path="/refund&cancellation" element={<Refundpolicy />} />
          <Route path="/return&exchange" element={<Returnexchange />} />
          <Route path="/privacypolicy" element={<Privacypolicy />} />
          <Route path="/termsconditions" element={<Termsconditions />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
