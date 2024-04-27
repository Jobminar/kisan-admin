import React, { useState, useEffect } from "react";
import "./tabs.css";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const FreshFruits = () => {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const apiUrl = "http://localhost:4000/inventory"; // Assuming your backend is running locally on port 4000

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        // Filter items with category "freshFruits"
        const freshFruits = data.items.filter(
          (item) => item.category === "freshFruits"
        );
        setInventoryData(freshFruits);
        setIsLoading(false); // Set loading state to false after data fetching is complete
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading state to false in case of error
      }
    };

    fetchData();
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

      const deleteUrl = `https://localhost:4000/inventory/${itemId}`;

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
  const handleProduct = (item) => {
    navigate("/productupdate", { state: { selectedProduct: item } });
    console.log(item, "data");
  };

  return (
    <div className="main-product-con">
      {isLoading ? ( // Render CircularProgress if data is still loading
        <CircularProgress sx={{color:"green"}}/>
      ) : (
        inventoryData.map((item) => (
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
        ))
      )}
    </div>
  );
};

export default FreshFruits
