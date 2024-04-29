import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField } from "@mui/material";

const EditFruitPopup = ({ onClose, category, id }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    units: "",
    costPerUnit: "",
    discount: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Define API endpoints based on the category
      let apiUrl = "";
      switch (category) {
        case "freshFruits":
          apiUrl = `http://localhost:4000/fresh-fruits/${id}`;
          break;
        case "dryFruits":
          apiUrl = `http://localhost:4000/dry-fruits/${id}`;
          break;
        case "exoticFruits":
          apiUrl = `http://localhost:4000/exotic-fruits/${id}`;
          break;
        default:
          throw new Error("Invalid category");
      }

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update item. Status: ${response.status}`);
      }

      console.log("Item updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating item:", error);
      alert(`Error updating item: ${error.message}`);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Edit Fruit</h2>
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
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={onClose}>Close</Button>
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
