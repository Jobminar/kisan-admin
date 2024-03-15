import React, { useState, useEffect } from "react";
import "./tabs.css";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";

const FreshVegetable = () => {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const apiUrl = "https://kisanmart.onrender.com/inventory";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Filter items with category "freshVegetables"
        const freshVegetables = data.items.filter(
          (item) => item.category === "offerZone"
        );
        setInventoryData(freshVegetables);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // handle delete
  const handleItemDelete = async (itemId) => {
    try {
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );

      if (!isConfirmed) {
        return; // Do nothing if the user cancels the confirmation
      }

      const deleteUrl = `https://kisanmart.onrender.com/inventory/${itemId}`;

      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item. Status: ${response.status}`);
      }

      // Remove the deleted item from the local state
      setInventoryData((prevData) =>
        prevData.filter((item) => item._id !== itemId)
      );

      // Show a success message
      alert("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      // Show an error message
      alert(`Error deleting item: ${error.message}`);
    }
  };

  // handle update
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleProduct = (item) => {
    setSelectedProduct(item);
    navigate("/productupdate", { state: { selectedProduct: item } });
    console.log(item, "data");
  };

  return (
    <div className="main-product-con">
      {inventoryData.map((item) => (
        <div key={item._id} className="product-sub-con">
          <div className="product-image">
            <img
              src={`data:image/png;base64, ${item.itemImage}`}
              alt={`Item ${item.itemName}`}
            />
          </div>
          <div className="product-content">
            <p>{item.itemname}</p>
            <p>{item.costPerUnit}</p>
          </div>
          <div className="edit-delete-buttons">
            <div onClick={() => handleProduct(item)}>
              <CreateOutlinedIcon />
            </div>
            <div onClick={() => handleItemDelete(item._id)}>
              <DeleteOutlineOutlinedIcon />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FreshVegetable;
