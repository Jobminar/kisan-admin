import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, DialogActions, Button, MenuItem } from "@mui/material";
import axios from "axios";

const ProductUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct || null;

  const [editformData, setEditFormData] = useState({
    category: "",
    itemname: "",
    description: "",
    units: "kg",
    costPerUnit: "",
    discount: "0",
    itemImage: null,
  });

  useEffect(() => {
    if (selectedProduct) {
      setEditFormData({
        category: selectedProduct.category || "",
        itemname: selectedProduct.itemname || "",
        description: selectedProduct.description || "",
        units: selectedProduct.units || "kg",
        costPerUnit: selectedProduct.costPerUnit || "",
        discount: selectedProduct.discount || "0",
        itemImage: selectedProduct.itemImage || null,
      });
    }
  }, [selectedProduct]);

  const handleChange = (event, fieldName) => {
    const { value } = event.target;
    setEditFormData({ ...editformData, [fieldName]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64Image = await convertToBase64(file);
      setEditFormData({ ...editformData, itemImage: base64Image });
    }
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  // const handleFieldUpdate = async (fieldName, value) => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:3000/updateItem/${selectedProduct._id}`,
  //       {
  //         [fieldName]: value,
  //       },
  //       {
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );

  //     if (response.status === 200) {
  //       alert(`${fieldName} updated successfully`);
  //     } else {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error(`Error updating ${fieldName}:`, error);
  //     alert(`Error updating ${fieldName} in inventory`);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        "Are you sure you want to update this item?",
      );

      if (!isConfirmed) {
        return; // Do nothing if the user cancels the confirmation
      }

      const response = await axios.put(
        `http://localhost:4000/updateItem/${selectedProduct._id}`,
        {
          category: editformData.category,
          itemname: editformData.itemname,
          description: editformData.description,
          units: editformData.units,
          costPerUnit: editformData.costPerUnit,
          discount: editformData.discount,
          itemImage: editformData.itemImage,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.status === 200) {
        // Show a success message
        alert("Item updated successfully");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating item:", error);
      // Show an error message
      alert("Please upload the images less than 20KB");
    }
  };

  return (
    <div className="updated-form-con">
      <div>
        <TextField
          select
          name="category"
          value={editformData.category}
          onChange={(e) => handleChange(e, "category")}
          variant="standard"
          label="Category"
          fullWidth
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
        </TextField>
        {/* <Button
          onClick={() => handleFieldUpdate("category", editformData.category)}
        >
          Update Category
        </Button> */}
      </div>

      <div>
        <TextField
          autoFocus
          margin="dense"
          id="itemname"
          name="itemname"
          type="text"
          fullWidth
          variant="standard"
          value={editformData.itemname}
          onChange={(e) => handleChange(e, "itemname")}
        />
        {/* <Button
          onClick={() => handleFieldUpdate("itemname", editformData.itemname)}
        >
          Update Item Name
        </Button> */}
      </div>

      <div>
        <TextField
          autoFocus
          margin="dense"
          id="units"
          name="units"
          value={editformData.units}
          onChange={(e) => handleChange(e, "units")}
          variant="standard"
          label="Units"
          fullWidth
        >
          <MenuItem value="kg">kg</MenuItem>
          <MenuItem value="Grams">Grams</MenuItem>
          <MenuItem value="Dozen">Dozen</MenuItem>
          <MenuItem value="Number">Number</MenuItem>
        </TextField>
        {/* <Button onClick={() => handleFieldUpdate("units", editformData.units)}>
          Update Units
        </Button> */}
      </div>

      <div>
        <TextField
          autoFocus
          margin="dense"
          id="costPerUnit"
          name="costPerUnit"
          type="number"
          fullWidth
          variant="standard"
          value={editformData.costPerUnit}
          onChange={(e) => handleChange(e, "costPerUnit")}
        />
        {/* <Button
          onClick={() =>
            handleFieldUpdate("costPerUnit", editformData.costPerUnit)
          }
        >
          Update Cost Per Unit
        </Button> */}
      </div>

      <div>
        <TextField
          autoFocus
          margin="dense"
          id="discount"
          name="discount"
          type="number"
          fullWidth
          variant="standard"
          value={editformData.discount}
          onChange={(e) => handleChange(e, "discount")}
        />
        {/* <Button
          onClick={() => handleFieldUpdate("discount", editformData.discount)}
        >
          Update Discount
        </Button> */}
      </div>

      <div>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          name="description"
          type="text"
          fullWidth
          variant="standard"
          value={editformData.description}
          onChange={(e) => handleChange(e, "description")}
        />
        {/* <Button
          onClick={() =>
            handleFieldUpdate("description", editformData.description)
          }
        >
          Update Description
        </Button> */}
      </div>

      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {editformData.itemImage && (
          <img
            src={`data:image/png;base64, ${editformData.itemImage}`}
            alt={`Item ${editformData.itemname}`}
          />
        )}
        {/* <Button
          onClick={() => handleFieldUpdate("itemImage", editformData.itemImage)}
        >
          Update Item Image
        </Button> */}
      </div>

      <DialogActions className="formbuttons">
        <Button onClick={() => navigate(-1)}>Close</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </div>
  );
};

export default ProductUpdate;
