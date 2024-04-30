import "../styles/contactus.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log("Before submission - Form Data:", formData);

      const response = await fetch(`https://localhost:4000/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("After submission - Server Response:", response);

      if (response.ok) {
        console.log("Contact form submitted successfully");
        // Optionally, you can reset the form here
        setFormData({
          name: "",
          email: "",
          mobileNo: "",
          message: "",
        });
        alert("Contact form submitted successfully"); // Success alert
      } else {
        console.error("Failed to submit contact form");
        alert("Failed to submit contact form. Please try again."); // Error alert
      }
    } catch (error) {
      console.error("Error submitting contact form", error);
      alert("Error submitting contact form. Please try again."); // Error alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <>
        <h1>Contact us</h1>
        <div className="contact-con">
          <form onSubmit={handleSubmit}>
            <TextField
              className="inputs"
              label="Name"
              multiline
              maxRows={4}
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
            />
            <TextField
              className="inputs"
              label="Email"
              multiline
              maxRows={4}
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
            />
            <TextField
              className="inputs"
              label="Mobile No"
              multiline
              maxRows={4}
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              type="text"
            />
            <TextField
              className="inputs"
              label="Message"
              multiline
              maxRows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              type="text"
            />

            <Button
              type="submit"
              disabled={loading}
              sx={{
                background: "green",
                borderRadius: "10px",
                color: "white",
                "&:hover": {
                  background: "green",
                },
              }}
              className="submit"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </>
    </div>
  );
};

export default Contactus;
