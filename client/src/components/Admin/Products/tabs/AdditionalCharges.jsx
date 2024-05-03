import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Charges.css";
const AdditionalCharges = () => {
  const [charges, setCharges] = useState({});
  const [newCharge, setNewCharge] = useState({
    deliveryCharges: "",
    handlingCharges: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCharges();
  }, []);

  const fetchCharges = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://kisanmart.onrender.com/get-charges",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCharges(response.data);
    } catch (error) {
      setError("Error fetching charges");
    } finally {
      setLoading(false);
    }
  };

  const addOrUpdateCharge = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      let response;
      if (charges._id) {
        response = await axios.patch(
          "https://kisanmart.onrender.com/update-charges",
          newCharge,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        response = await axios.post(
          "https://kisanmart.onrender.com/post-charges",
          newCharge,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
      setCharges(response.data.charge);
      window.location.reload();
      setNewCharge({ deliveryCharges: "", handlingCharges: "" }); // Reset the form
    } catch (error) {
      setError("Error adding/updating charge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="charges-container">
      <h2>Charges</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <p>
            Delivery Charges: {charges.deliveryCharges}, Handling Charges:{" "}
            {charges.handlingCharges}
          </p>
          <h3>Update Charges</h3>
          <label>
            Delivery Charges:
            <input
              type="number"
              value={newCharge.deliveryCharges}
              onChange={(e) =>
                setNewCharge({ ...newCharge, deliveryCharges: e.target.value })
              }
            />
          </label>
          <label>
            Handling Charges:
            <input
              type="number"
              value={newCharge.handlingCharges}
              onChange={(e) =>
                setNewCharge({ ...newCharge, handlingCharges: e.target.value })
              }
            />
          </label>
          <button id="chargesButton" onClick={addOrUpdateCharge}>
            {charges._id ? "Update Charge" : "Add Charge"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdditionalCharges;
