import React from "react";
import Vegetables from "./productsdata";
import "./products.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Productsuser = () => {
  const navigate = useNavigate();

  const handleProduct = (key) => {
    const isUserLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (isUserLoggedIn === "true") {
      const jsonString = JSON.stringify(key);
      sessionStorage.setItem("keyofproduct", jsonString);
      navigate("/viewpage");
    } else {
      alert("Please login first to purchase the product.");
      navigate("/");
    }
  };
  return (
    <>
      <h3 className="note">
        Note:we charge 2% convience fee and 40 rupeees handling charges, these
        prices are  subjected to changes and revised prices would be updated to
        the customers.
        <br />
        No Delivery charges.
      </h3>
      <div className="user-products-con">
        <h2>User Products</h2>
        <div className="products-list">
          {Vegetables.map((vegetable, index) => (
            <div key={index} className="product-card">
              <img src={vegetable.img} alt={vegetable.name} />
              <h3>{vegetable.name}</h3>
              <p> ₹{vegetable.price}</p>
              <button onClick={() => handleProduct(vegetable.key)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Productsuser;
