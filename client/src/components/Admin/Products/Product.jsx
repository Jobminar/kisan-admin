import React, { useState, useEffect } from "react";
import "./Product.css"; // Assuming this contains your styling for tabs
import FreshFruits from "./tabs/FreshFruits";
import FreshVegetable from "./tabs/FreshVegetables";
import Offers from "./tabs/Offers";
import Additionals from "./tabs/Additionals";
import Quickpicks from "./tabs/Quickpicks";
import Leafyvegetables from "./tabs/Leafyvegetables";
import AdditionalCharges from "./tabs/AdditionalCharges";
import HomeBanner from "./tabs/HomeBanner";

const Product = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "freshfruits",
  );

  useEffect(() => {
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
      case "additionalCharges":
        return <AdditionalCharges />;
      case "homeBanner":
        return <HomeBanner />;
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
        <div
          className={`tab ${activeTab === "additionalCharges" ? "active" : ""}`}
          onClick={() => handleTabClick("additionalCharges")}
        >
          Additional Charges
        </div>
        <div
          className={`tab ${activeTab === "homeBanner" ? "active" : ""}`}
          onClick={() => handleTabClick("homeBanner")}
        >
          Home Banner
        </div>
      </div>
      {renderSelectedComponent()}
    </div>
  );
};

export default Product;
