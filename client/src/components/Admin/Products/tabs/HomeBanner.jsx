import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomeBanner.css";

const HomeBanner = () => {
  const [homes, setHomes] = useState([]);
  const [newHome, setNewHome] = useState({
    name: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/get-home");
      setHomes(response.data);
    } catch (error) {
      setError("Error fetching homes");
    } finally {
      setLoading(false);
    }
  };

  const deleteHome = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/delete-home/${id}`);
      setHomes(homes.filter((home) => home._id !== id));
    } catch (error) {
      setError("Error deleting home");
    }
  };

  const addHome = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", newHome.name);
      formData.append("image", newHome.image);
      await axios.post("http://localhost:4000/post-home", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNewHome({ name: "", image: "" }); // Reset the form
      fetchHomes(); // Fetch the updated list of homes
    } catch (error) {
      setError("Error adding home");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewHome({ ...newHome, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewHome({ ...newHome, image: e.target.files[0] });
  };

  return (
    <div className="home-banner">
      <h2>Home Banner</h2>
      <div className="input-container">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newHome.name}
          onChange={handleInputChange}
        />
        <input type="file" name="image" onChange={handleFileChange} />
        <button onClick={addHome}>Add Home Banner</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {homes.map((home) => (
            <div key={home._id} className="home-item">
              <img
                src={`data:image/png;base64,${home.image}`}
                alt={home.name}
              />
              <p>{home.name}</p>
              <button onClick={() => deleteHome(home._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeBanner;
