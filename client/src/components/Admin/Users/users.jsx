import { useState, useEffect } from "react";
import "./users.css";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [contactForms, setContactForms] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Fetch users data from the API
    fetch("https://localhost:4000/users")
      .then((response) => response.json())
      .then((data) => setUsersData(data))
      .catch((error) => console.error("Error fetching users data:", error));

    // Fetch contact forms data from the API
    fetch("https://localhost:4000/contact-us")
      .then((response) => response.json())
      .then((data) => setContactForms(data))
      .catch((error) =>
        console.error("Error fetching contact forms data:", error)
      );
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <>
      <div className="users-con">
        <div className="sidebar">
          <IconButton onClick={toggleSidebar} className="hamburger-icon">
            <MenuIcon />
            New Contacts
          </IconButton>
          <Drawer
            anchor="left"
            open={isSidebarOpen}
            onClose={toggleSidebar}
            className="sidebar-drawer"
          >
            {/* Content for the sidebar */}
            <div className="sidebar-content">
              <p>New Contacts</p>
              {/* Display contact forms in cards */}
              {contactForms.map((form, index) => (
                <div key={index} className="contact-card">
                  <h2>Contact Form</h2>
                  <p>
                    <strong>Name:</strong> {form.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {form.email}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {form.phoneNo}
                  </p>
                  <p>
                    <strong>Message:</strong> {form.message}
                  </p>
                </div>
              ))}
            </div>
          </Drawer>
        </div>

        <h1>Customers</h1>
        <div className="users-main">
          {/* Display user cards */}
          {usersData.map((user, index) => (
            <div key={index} className="user-card">
              <h2>{user.userName}</h2>
              <p>
                <strong>User Name:</strong> {user.userName}
              </p>
              <p>
                <strong>Phone Number:</strong> {user.phoneNumber}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Users;
