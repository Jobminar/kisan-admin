import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
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

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
    onClose(); // Close the popup after submission
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

// Prop validation using PropTypes
EditFruitPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default EditFruitPopup;
