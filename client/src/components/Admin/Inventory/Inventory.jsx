import { useState } from "react";
import "./Inventory.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2"; // Import Swal for displaying alerts
import axios from "axios";

const Inventory = () => {
  const [formData, setFormData] = useState({
    category: "",
    itemname: "",
    description: "",
    units: "kg",
    costPerUnit: "",
    discount: "0",
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

    // Check if all mandatory fields are filled
    for (const key in formData) {
      if (!formData[key]) {
        // Show an error message using Swal if any field is empty
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please fill all mandatory fields",
        });
        return;
      }
    }

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
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:4000/addItem",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        // Show a success message using Swal
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Item added successfully",
        });
        console.log(formData)
        // Reset the form data
        setFormData({
          category: "",
          itemname: "",
          description: "",
          units: "kg",
          costPerUnit: "",
          discount: "0",
          itemImage: null,
        });
      }
    } catch (error) {
      console.error("Error adding item:", error);
      // Show an error message using Swal
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add item to inventory",
      });
    }
  };

  return (
    <>
      <h1 className="inventoty-head">Add Your Products here..</h1>
      <div className="inventory-con">
        <FormControl variant="standard" sx={{ m: 0, minWidth: "85%" }}>
          <InputLabel id="category-label">Category *</InputLabel>
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
            label="Item Name *"
            name="itemname"
            type="string"
            variant="standard"
            value={formData.itemname}
            onChange={(e) => handleChange(e)}
          />
        </Box>

        <FormControl variant="standard" sx={{ m: 0, minWidth: "85%" }}>
          <InputLabel id="units-label">Units *</InputLabel>
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
            label="costPerUnit *"
            type="string"
            name="costPerUnit"
            variant="standard"
            required
            value={formData.costPerUnit}
            onChange={(e) => handleChange(e)}
          />
        </Box>

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
            value={formData.discount}
            onChange={(e) => handleChange(e)}
          />
        </Box>

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
            label="description *"
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
          <input
            type="file"
            name="itemImage"
            multiple
            required
            onChange={handleFileChange}
          />
        </label>

        <Button
          variant="contained"
          sx={{
            width: "30%",
            backgroundColor: "green",
            margin: "auto",
            display: "block",
            "&:active": {
              backgroundColor: "darkgreen",
              boxShadow: "none",
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
