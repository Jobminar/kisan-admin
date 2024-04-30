import React, { useState, useEffect } from "react";
import "./Product.css";
import FreshFruits from "./tabs/FreshFruits";
import FreshVegetable from "./tabs/FreshVegetables";
import Offers from "./tabs/Offers";
import Additionals from "./tabs/Additionals";
import Quickpicks from "./tabs/Quickpicks";
import Leafyvegetables from "./tabs/Leafyvegetables";

const Product = () => {
  // Retrieve the active tab from localStorage or default to 'freshfruits'
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "freshfruits",
  );

  useEffect(() => {
    // Store the active tab in localStorage whenever it changes
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case "freshfruits":
        return <FreshFruits />;
      case "freshvegetable":
        return <FreshVegetable />;
      case "leafyvegetables":
        return <Leafyvegetables />;
      case "offers":
        return <Offers />;
      case "quickpicks":
        return <Quickpicks />;
      case "additionals":
        return <Additionals />;
      default:
        return null;
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="services-container">
      <div className="tabs-container">
        <div
          className={`tab ${activeTab === "freshfruits" ? "active" : ""}`}
          onClick={() => handleTabClick("freshfruits")}
        >
          Fresh Fruits
        </div>
        <div
          className={`tab ${activeTab === "freshvegetable" ? "active" : ""}`}
          onClick={() => handleTabClick("freshvegetable")}
        >
          Fresh Vegetables
        </div>
        <div
          className={`tab ${activeTab === "leafyvegetables" ? "active" : ""}`}
          onClick={() => handleTabClick("leafyvegetables")}
        >
          Leafy Vegetables
        </div>
        <div
          className={`tab ${activeTab === "offers" ? "active" : ""}`}
          onClick={() => handleTabClick("offers")}
        >
          Offers
        </div>
        <div
          className={`tab ${activeTab === "quickpicks" ? "active" : ""}`}
          onClick={() => handleTabClick("quickpicks")}
        >
          Quick picks
        </div>
        <div
          className={`tab ${activeTab === "additionals" ? "active" : ""}`}
          onClick={() => handleTabClick("additionals")}
        >
          Additionals
        </div>
      </div>
      {renderSelectedComponent()}
    </div>
  );
};

export default Product;
