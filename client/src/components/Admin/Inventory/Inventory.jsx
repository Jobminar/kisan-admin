import { useState } from "react";
import imageCompression from "browser-image-compression";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./Inventory.css"; // Ensure this file exists and is properly linked

const Inventory = () => {
  const [formData, setFormData] = useState({
    category: "",
    itemname: "",
    units: "",
    costPerUnit: "",
    discount: "",
    description: "",
    itemImage: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "itemImage" && formData[key]) {
        formDataToSend.append(key, formData[key], formData[key].name);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    const token = localStorage.getItem("token");
    console.log("Token:", token); // Check if the token is null or undefined.
    // Retrieve the token from local storage

    try {
      const response = await fetch("http://localhost:4000/additem", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Successfully uploaded");
        // Additional logic for handling successful upload
      } else {
        console.error("Failed to upload data", response.statusText);
        // Additional logic for handling errors
      }
    } catch (error) {
      console.error("Error in submission:", error);
      // Additional error handling logic
    }
  };

  return (
    <>
      <Typography variant="h4" className="inventory-head">
        Add Your Products Here
      </Typography>
      <Box
        className="inventory-con"
        sx={{ maxWidth: "600px", width: "100%", mx: "auto" }}
      >
        <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
          <InputLabel htmlFor="category">Category *</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="freshVegetables">Fresh vegetables</MenuItem>
            <MenuItem value="freshFruits">Fresh Fruits</MenuItem>
            <MenuItem value="leafyVegetables">Leafy vegetables</MenuItem>
            <MenuItem value="quickPicks">Quickpicks</MenuItem>
            <MenuItem value="offerZone">Offers</MenuItem>
            <MenuItem value="additionals">Additionals</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          required
          id="itemname"
          name="itemname"
          label="Item Name *"
          type="text"
          variant="standard"
          value={formData.itemname}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
          <InputLabel htmlFor="units">Units *</InputLabel>
          <Select
            labelId="units-label"
            id="units"
            required
            name="units"
            value={formData.units}
            onChange={handleChange}
          >
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="Grams">Grams</MenuItem>
            <MenuItem value="Dozen">Dozen</MenuItem>
            <MenuItem value="Number">Number</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          required
          id="costPerUnit"
          name="costPerUnit"
          label="Cost Per Unit *"
          type="text"
          variant="standard"
          value={formData.costPerUnit}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          id="discount"
          name="discount"
          label="Discount"
          type="number"
          variant="standard"
          value={formData.discount}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          required
          id="description"
          name="description"
          label="Description *"
          type="text"
          variant="standard"
          value={formData.description}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <label
          htmlFor="itemImage"
          style={{ display: "block", marginTop: "20px" }}
        >
          Item Images:
          <input
            type="file"
            id="itemImage"
            name="itemImage"
            multiple
            required
            onChange={handleFileChange}
            style={{ display: "block", width: "100%" }}
          />
        </label>

        <Button
          variant="contained"
          sx={{ mt: 2, width: "50%", alignSelf: "center" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default Inventory;
