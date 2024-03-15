import React, { useState } from 'react';
import './Product.css'
import FreshFruits from './tabs/FreshFruits';
import FreshVegetable from './tabs/FreshVegetables';
import Offers from './tabs/Offers';
import Additionals from './tabs/Additionals';
import Quickpicks from './tabs/Quickpicks';
import Leafyvegetables from './tabs/Leafyvegetables';




const Product = () => {
  const [activeTab, setActiveTab] = useState('freshfruits');

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case 'freshfruits':
        return <FreshFruits/>
      case 'freshvegetable':
        return <FreshVegetable />;
      case 'leafyvegetables':
        return <Leafyvegetables />;
      case 'offers':
        return <Offers />;
      case 'quickpicks':
        return <Quickpicks />;
      case 'additionals':
        return <Additionals />;
      default:
        return null;
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div  className='services-container'>
  
      <div className="tabs-container">
        <div
          className={`tab ${activeTab === 'freshfruits' && 'active'}`}
          onClick={() => handleTabClick('freshfruits')}
        >
          {/* <img src={general} alt="" width={30}/> */}
          Fresh Fruits
        </div>
        <div
          className={`tab ${activeTab === 'freshvegetable' && 'active'}`}
          onClick={() => handleTabClick('freshvegetable')}
        >
          {/* <img src={denting} alt="" width={30}/> */}
          Fresh Vegetables
        </div>
        <div
          className={`tab ${activeTab === 'leafyvegetables' && 'active'}`}
          onClick={() => handleTabClick('leafyvegetables')}
        >
          {/* <img src={denting} alt="" width={30}/> */}
          Leafy Vegetables
        </div>
        <div
          className={`tab ${activeTab === 'offers' && 'active'}`}
          onClick={() => handleTabClick('offers')}
        >
          {/* <img src={ac} alt="" width={30}/> */}
          Offers
        </div>
        <div
          className={`tab ${activeTab === 'quickpicks' && 'active'}`}
          onClick={() => handleTabClick('quickpicks')}
        >
          {/* <img src={accident} alt="" width={30}/> */}
          Quick picks
        </div>
        <div
          className={`tab ${activeTab === 'additionals' && 'active'}`}
          onClick={() => handleTabClick('additionals')}
        >
          {/* <img src={battery} alt="" width={30}/> */}
          Additionals
        </div>
      </div>
      {renderSelectedComponent()}
    </div>
  );
};

export default Product;
