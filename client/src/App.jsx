import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Admin/Header/header";
import Footer from "./components/User/Footer";
import SessionTimeout from "./Sessiontimeout";

// Lazy load components
const Inventory = lazy(() => import("./components/Admin/Inventory/Inventory"));
const Product = lazy(() => import("./components/Admin/Products/Product"));
const Users = lazy(() => import("./components/Admin/Users/users"));
const Orders = lazy(() => import("./components/Admin/Orders/orders"));
const Login = lazy(() => import("./components/Admin/Login"));
const ForgotPassword = lazy(() => import("./components/Admin/ForgotPassword"));
const SignUp = lazy(() => import("./components/Admin/Signup"));
const Shippingpolicy = lazy(() => import("./components/User/Shippingpolicy"));
const Refundpolicy = lazy(() => import("./components/User/Refundpolicy"));
const Returnexchange = lazy(() => import("./components/User/Returnexchange"));
const Privacypolicy = lazy(() => import("./components/User/Privacypolicy"));
const Termsconditions = lazy(() => import("./components/User/Termsconditions"));
const Reports = lazy(() => import("./components/Admin/Reports"));
const All = lazy(() => import("./All"));
const FruitList = lazy(() => import("./Get"));
//lazy loading
const App = () => {
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
    localStorage.removeItem("token");
    sessionStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
    // Additional logout logic if needed
  };

  // Memoize header component to prevent unnecessary re-renders
  const memoizedHeader = useMemo(
    () => <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />,
    [isLoggedIn],
  );

  return (
    <>
      <BrowserRouter>
        {memoizedHeader}
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Login onLogin={handleLogin} />
              </Suspense>
            }
          />
          <Route
            path="/inventory"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Inventory />
              </Suspense>
            }
          />
          <Route
            path="/products"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Product />
              </Suspense>
            }
          />
          <Route
            path="/users"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Users />
              </Suspense>
            }
          />
          <Route
            path="/orders"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Orders />
              </Suspense>
            }
          />
          <Route
            path="/reports"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Reports />
              </Suspense>
            }
          />
          <Route
            path="/all"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <All />
              </Suspense>
            }
          />
          <Route
            path="/get"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <FruitList />
              </Suspense>
            }
          />
          <Route
            path="/forgot"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ForgotPassword />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/shippingpolicy"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Shippingpolicy />
              </Suspense>
            }
          />
          <Route
            path="/refund&cancellation"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Refundpolicy />
              </Suspense>
            }
          />
          <Route
            path="/return&exchange"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Returnexchange />
              </Suspense>
            }
          />
          <Route
            path="/privacypolicy"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Privacypolicy />
              </Suspense>
            }
          />
          <Route
            path="/termsconditions"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Termsconditions />
              </Suspense>
            }
          />
        </Routes>
        <SessionTimeout />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
