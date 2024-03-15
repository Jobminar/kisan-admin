import React, { useState, useEffect } from "react";
import Vegetables from "./productsdata";
import "./products.css";

const YourComponent = () => {
  const [storedkey, setStoredKey] = useState([]);
  const [kgvalue, setKgValue] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  // useEffect to load data from session storage on component mount
  useEffect(() => {
    // Get previously stored values from session storage
    const storedKeyFromSession =
      JSON.parse(sessionStorage.getItem("keyofproduct")) || [];

    // Update the state with the combined values
    setStoredKey([storedKeyFromSession, ...storedkey]);
  }, []);

  // Filter out only vegetable keys
  const vegetableKeys = storedkey.filter((key) =>
    Vegetables.some((vegetable) => vegetable.key === key)
  );

  useEffect(() => {
    // Calculate total amount
    const calculatedTotal = vegetableKeys.reduce(
      (accumulator, vegetableKey) =>
        accumulator +
        Vegetables.find((vegetable) => vegetable.key === vegetableKey).price *
          kgvalue,
      0
    );

    // Update total amount
    setTotalAmount(calculatedTotal);
  }, [vegetableKeys, kgvalue]);
  const handleBuyNow = () => {
    // Add your logic for finalizing the purchase here
    // For example, clear the session storage
    sessionStorage.removeItem("keyofproduct");
    alert("Thank you for your purchase!");
  };
  return (
    <div className="card-main-user">
      {vegetableKeys.map((vegetableKey) => (
        // Render your vegetable data here
        <div key={vegetableKey} className="card-user">
          <img
            src={
              Vegetables.find((vegetable) => vegetable.key === vegetableKey)
                ?.img
            }
            alt={
              Vegetables.find((vegetable) => vegetable.key === vegetableKey)
                ?.name
            }
          />
          <h2>
            {
              Vegetables.find((vegetable) => vegetable.key === vegetableKey)
                ?.name
            }
          </h2>
          <p>
            <strong>Price:</strong> ${" "}
            {(
              Vegetables.find((vegetable) => vegetable.key === vegetableKey)
                ?.price * kgvalue
            ).toFixed(2)}
          </p>
        </div>
      ))}

      <div className="total-amount">
        Total amount : ₹{totalAmount.toFixed(2)}
      </div>
      <button onClick={handleBuyNow} className="buy-now-button">
        Buy Now
      </button>
    </div>
  );
};

export default YourComponent;
