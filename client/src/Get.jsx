import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function FruitList() {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/fruits"); // Assuming your API endpoint is /api/fruits
        const data = await response.json();
        setFruits(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fruits:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Fruit List</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {fruits.map((fruit) => (
            <div key={fruit._id}>
              <h3>{fruit.itemname}</h3>
              <p>{fruit.description}</p>
              {/* Render other fruit details here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FruitList;
