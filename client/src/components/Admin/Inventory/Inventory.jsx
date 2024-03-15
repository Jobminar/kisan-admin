import { useState } from "react";
import "./Inventory.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import axios from "axios";

const Inventory = () => {
  const [formData, setFormData] = useState({
    category: "",
    itemname: "",
    description: "",
    units: "kg",
    costPerUnit: "",
    discount: "0",
    // quantity: "0",
    itemImage: null,
  });

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      itemImage: e.target.files[0],
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to add this item?"
    );

    if (!isConfirmed) {
      return; // Do nothing if the user cancels the confirmation
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await axios.post(
        "https://kisanmart.onrender.com/addItem",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show a success message
      alert("Item added successfully");

      // Optionally, you can redirect the user to another page or update the UI
      setFormData({
        category: "",
        itemname: "",
        description: "",
        units: "kg",
        costPerUnit: "",
        discount: "0",
        // quantity: "0",
        itemImages: null,
      });
    } catch (error) {
      console.error("Error adding item:", error);

      // Show an error message
      alert("Error adding item to inventory");
    }
  };

  return (
    <>
      <h1 className="inventoty-head">Add Your Products here..</h1>
      <div className="inventory-con">
        {/* categeory */}
        <FormControl variant="standard" sx={{ m: 0, minWidth: "85%" }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            required
            name="category"
            value={formData.category}
            onChange={(e) => handleChange(e)}
            label="Category"
            sx={{ background: "transparent" }}
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

        {/* item namee */}

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 2,
              width: "90%",
              "&:hover": {
                "& fieldset": {
                  borderColor: "green",
                },
              },
              "&:focus-within": {
                "& fieldset": {
                  borderColor: "green",
                },
              },
            },
            width: "90%",
            margin: "auto",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            required
            label="Item Name"
            name="itemname"
            type="string"
            variant="standard"
            value={formData.itemname}
            onChange={(e) => handleChange(e)}
          />
        </Box>

        {/* Units */}
        <FormControl variant="standard" sx={{ m: 0, minWidth: "85%" }}>
          <InputLabel id="units-label">Units</InputLabel>
          <Select
            labelId="units-label"
            id="units"
            required
            name="units"
            value={formData.units}
            onChange={(e) => handleChange(e)}
            label="Units"
            sx={{ background: "transparent" }}
          >
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="Grams">Grams</MenuItem>
            <MenuItem value="Dozen">Dozen</MenuItem>
            <MenuItem value="Number">Number</MenuItem>
          </Select>
        </FormControl>
        {/* cost */}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "90%" },
            width: "90%",
            margin: "auto",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            label="costPerUnit"
            type="string"
            name="costPerUnit"
            variant="standard"
            required
            value={formData.costPerUnit}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        {/* discount */}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "90%" },
            width: "90%",
            margin: "auto",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            label="Discount"
            type="number"
            name="discount"
            variant="standard"
            required
            value={formData.discount}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        {/* quantity */}
        {/* <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2, width: '90%' },
            width: '90%',
            margin: 'auto',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            label="Quantity"
            type="number"
            variant="standard"
            required
            name='quantity'
            value={formData.quantity}
            onChange={(e) => handleChange(e)}
          />
        </Box> */}
        {/* description */}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "90%" },
            width: "90%",
            margin: "auto",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            label="description"
            type="string"
            variant="standard"
            required
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <label>
          Item Images:
          <label>
            Item Images:
            <input
              type="file"
              name="itemImage"
              multiple
              onChange={handleFileChange}
            />
          </label>
        </label>

        <Button
          variant="contained"
          sx={{
            width: "30%",
            backgroundColor: "green",
            margin: "auto",
            display: "block",
            "&:active": {
              backgroundColor: "darkgreen", // Change the color when the button is clicked
              boxShadow: "none", // You can customize other styles as well
            },
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default Inventory;
