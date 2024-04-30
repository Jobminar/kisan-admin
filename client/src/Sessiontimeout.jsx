import { useState, useEffect, useRef } from "react";

const Sessiontimeout = () => {
  const [isLoggedIn, setLoggedIn] = useState(true); // Simulate a login state
  const timeoutRef = useRef(null);

  // Function to handle logout
  const handleLogout = () => {
    alert("Your session has timed out. You will be logged out.");
    localStorage.removeItem("token"); // Clear the token from localStorage
    sessionStorage.removeItem("isLoggedIn"); // Clear the session flag
    setLoggedIn(false); // Update state to reflect logout
    // Navigate to login page or perform additional cleanup here
  };

  // Reset the timer
  const resetTimeout = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleLogout();
    }, 900000); // Set the timeout for 15 minutes (900,000 milliseconds)
  };

  // Set up the event listeners
  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll"];
    events.forEach((event) => {
      window.addEventListener(event, resetTimeout);
    });

    // Start the initial timeout
    resetTimeout();

    return () => {
      // Clean up
      clearTimeout(timeoutRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimeout);
      });
    };
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <h6>
          Session active. Move the mouse, scroll, or press any key to keep it
          active.
        </h6>
      ) : (
        <h6>Your session has ended. Please log in again.</h6>
      )}
    </div>
  );
};

export default Sessiontimeout;
