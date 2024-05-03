import React, { useState } from "react";

const CreateFruitForm = () => {
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      itemImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Check if any mandatory fields are empty
      for (const key in formData) {
        if (formData.hasOwnProperty(key) && formData[key] === "") {
          throw new Error(`Please fill in all fields (${key})`);
        }
      }

      const formDataToSend = new FormData();
      formDataToSend.append("category", formData.category);
      formDataToSend.append("itemname", formData.itemname);
      formDataToSend.append("units", formData.units);
      formDataToSend.append("costPerUnit", formData.costPerUnit);
      formDataToSend.append("discount", formData.discount);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("itemImage", formData.itemImage);

      const response = await fetch(
        "https://kisanmart.onrender.com/post-fruit",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Show success message
      alert("Item added successfully");

      // Optionally, you can handle success response here (e.g., redirect to another page)
    } catch (error) {
      console.error("Error adding fruit:", error);
      // Optionally, you can handle error response here (e.g., show an error message)
    }
  };

  return (
    <div>
      <h2>Add a New Fruit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="itemname">Item Name:</label>
          <input
            type="text"
            id="itemname"
            name="itemname"
            value={formData.itemname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="units">Units:</label>
          <input
            type="text"
            id="units"
            name="units"
            value={formData.units}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="costPerUnit">Cost Per Unit:</label>
          <input
            type="number"
            id="costPerUnit"
            name="costPerUnit"
            value={formData.costPerUnit}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="discount">Discount:</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="itemImage">Image:</label>
          <input
            type="file"
            id="itemImage"
            name="itemImage"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Add Fruit</button>
      </form>
    </div>
  );
};

export default CreateFruitForm;
