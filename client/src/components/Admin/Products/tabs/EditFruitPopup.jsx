import { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField } from "@mui/material";
import imageCompression from "browser-image-compression";
import CloseIcon from "@mui/icons-material/Close"; // Ensure MUI icons are installed

const EditFruitPopup = ({ onClose, category, id }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    units: "",
    costPerUnit: "",
    discount: "",
    description: "",
    itemImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected.");
      return;
    }

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      setFormData({ ...formData, itemImage: compressedFile });
    } catch (error) {
      console.error("Error compressing the image:", error);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token"); // Fetch the token from local storage
    if (!token) {
      alert("No token found, please login again.");
      return;
    }

    let apiUrl = "";
    console.log("Category selected:", category); // Logging the category

    try {
      switch (category) {
        case "freshFruits":
          apiUrl = `http://localhost:4000/fruits/${id}`;
          break;
        case "freshVegitables":
          apiUrl = `http://localhost:4000/update/veg/${id}`;
          break;
        case "leafyVegitables":
          apiUrl = `http://localhost:4000/update/leaf/${id}`;
          break;
        case "offerZone":
          apiUrl = `http://localhost:4000/update/offer/${id}`;
          break;
        case "additionals":
          apiUrl = `http://localhost:4000/update/add/${id}`;
          break;
        case "quickPicks":
          apiUrl = `http://localhost:4000/update/quick/${id}`;
          break;
        default:
          throw new Error("Invalid category");
      }

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update item. Status: ${response.status}`);
      }
      alert("Item updated successfully");
      console.log("Item updated successfully");
      window.location.reload();

      onClose(); // Closing the popup
    } catch (error) {
      console.error("Error updating item:", error);
      alert(`Error updating item: ${error.message}`);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
        <h2>Edit Item</h2>
        <TextField
          name="itemName"
          label="Item Name"
          value={formData.itemName}
          onChange={handleChange}
        />
        <TextField
          name="units"
          label="Units"
          value={formData.units}
          onChange={handleChange}
        />
        <TextField
          name="costPerUnit"
          label="Cost per Unit"
          value={formData.costPerUnit}
          onChange={handleChange}
        />
        <TextField
          name="discount"
          label="Discount"
          value={formData.discount}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <Button onClick={handleSubmit}>Update Item</Button>
      </div>
    </div>
  );
};

EditFruitPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default EditFruitPopup;
