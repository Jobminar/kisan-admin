import React, { useState, useEffect, useRef } from "react";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import "./tabs.css";

const Offers = () => {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const fetched = useRef(false); // Ref to track if the fetchInventory has been called

  useEffect(() => {
    if (fetched.current) {
      return; // If fetchInventory has already been called, do nothing
    }
    fetched.current = true; // Set fetched to true to prevent future executions

    const fetchInventory = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      const token = localStorage.getItem("token");
      const apiUrl = `http://localhost:4000/get-offer`;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const result = await response.json();
        console.log("Received data:", result);

        if (!Array.isArray(result) || result.length === 0) {
          setHasMore(false);
          console.error("Data is empty or not in expected format:", result);
          return;
        }

        setInventoryData((prev) => [...prev, ...result]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [loading, hasMore]); // Include loading and hasMore in the dependency array

  const handleItemDelete = async (itemId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const deleteUrl = `http://localhost:4000/deletefruit/${itemId}`; // Use the item ID in the delete URL
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item. Status: ${response.status}`);
      }

      setInventoryData((prevData) =>
        prevData.filter((item) => item._id !== itemId),
      );
      alert("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert(`Error deleting item: ${error.message}`);
    }
  };

  const handleProduct = (item) => {
    navigate("/productupdate", { state: { selectedProduct: item } });
  };

  return (
    <div className="main-product-con">
      {inventoryData.map((item) => (
        <div key={item._id} className="product-sub-con">
          <div className="product-image">
            <img
              src={`data:image/png;base64,${item.itemImage}`}
              alt={`Item ${item.itemName}`}
            />
          </div>
          <div className="product-content">
            <h4>{item.itemName}</h4>
            <div className="grid-container">
              <div className="grid-item label">Price per Unit:</div>
              <div className="grid-item">{item.costPerUnit}</div>
              <div className="grid-item label">Discount:</div>
              <div className="grid-item">{item.discount}</div>
              <div className="grid-item label">Available Units:</div>
              <div className="grid-item">{item.units}</div>
              <div className="grid-item label">Description:</div>
              <div className="grid-item">{item.description}</div>
            </div>
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
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more items to load.</p>}
    </div>
  );
};

export default Offers;
