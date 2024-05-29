import { useEffect, useState } from "react";
import axios from "axios";
import useRazorpay from "react-razorpay";
import "./orders.css";
import OrderPopup from "./orderPopup";
// import { io as socketIo } from "socket.io-client";
import Kissanlogo from "../../../assets/images/Kissanlogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const socket = socketIo("https://localhost:4000", {
//   withCredentials: true,
//   extraHeaders: {
//     "Access-Control-Allow-Origin": "http://localhost:5173",
//   },
// });

// socket.on("connect", () => {
//   console.log("Connected to socket");
// });

// socket.on("connect", () => {
//   console.log("Connected to socket");
// });
const Orders = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [Razorpay] = useRazorpay();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token"); // Ensure 'token' is the key used when the token is stored

      try {
        const response = await axios.get(
          "https://kisan-be-odvc.onrender.com/getorders",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the retrieved token here
            },
          },
        );
        console.log("Response data:", response.data); // Log the response data
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    // Function to initiate data fetch
    fetchCartItems();

    // Setup the inactivity timer
    let inactivityTimer = setTimeout(() => {
      toast.info("Reloading page to fetch new orders.", {
        autoClose: 8000, // Notification closes after 8 seconds
      });
      window.location.reload(); // Reload the page to potentially fetch new data
    }, 30000); // 30 seconds of inactivity timer

    // Function to reset the inactivity timer on user activity
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        toast.info("Reloading page to fetch new orders.", {
          autoClose: 8000,
        });
        window.location.reload();
      }, 30000); // Reset to 30 seconds after any detected activity
    };

    // Attach event listeners to detect user activity (mousemove and keydown)
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keydown", resetTimer);

    // Cleanup function to remove event listeners and clear the timer
    return () => {
      clearTimeout(inactivityTimer); // Clear the current timer
      document.removeEventListener("mousemove", resetTimer); // Remove listener for mouse movement
      document.removeEventListener("keydown", resetTimer); // Remove listener for keyboard activity
    };
  }, []);

  // Note: Dependencies array is empty, indicating this effect runs once on mount

  const extractBase64Data = (base64String) => {
    return base64String.substring("data:image/*;base64,".length);
  };

  const removeItem = async (orderId, item) => {
    try {
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        `Are you sure you want to remove the order for ${item.itemName}?`,
      );

      if (!isConfirmed) {
        return; // Do nothing if the user cancels the confirmation
      }

      // Make a DELETE request to remove the item
      const response = await axios.delete(
        `https://kisan-be-odvc.onrender.com/orders/${orderId}`,
      );

      console.log("Item removed:", response.data);

      // Log a message after successful response
      console.log("Item removed successfully");

      // Reload the page
      window.location.reload();

      // You can choose to emit a socket event here if needed
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
  //Initiating Refund for customer__________//

  const initiateRefund = async (orderId, item) => {
    if (!item) {
      alert("No item data available for refund.");
      return;
    }

    const isConfirmed = window.confirm(`Confirm refund for ${item.itemName}?`);
    if (!isConfirmed) return;

    try {
      // Get the paymentId from the item object or wherever it is stored
      const paymentId = item.paymentId;

      const response = await axios.post(
        `https://api.razorpay.com/v1/payments/${paymentId}/refund`,
        {
          amount: item.price * 100, // Convert amount to the smallest currency unit
        },
        {
          auth: {
            username: "rzp_live_pbJYaEW4zKJXLH",
            password: "97ICNOHljIFUQwibZmRXvWv",
          },
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        alert(`Refund initiated for ${item.itemName}.`);
        handleRefundSuccess(orderId, item);
      } else {
        throw new Error("Refund initiation failed");
      }
    } catch (error) {
      alert("No enough balance refund. Please try again or contact support.");
      handleRefundError(error);
      console.error("Error initiating refund:", error);
      // RazorpayCheckout(item);
      processRefund(item.paymentId, item.price);
      if (error.response && error.response.data) {
        const apiErrorMessage =
          error.response.data.error || "Refund initiation failed";
        handleRefundError(apiErrorMessage);
      } else {
        alert("Error during refund. Please try again or contact support.");
      }
    }
  };
  const handleRefundError = (errorMessage) => {
    if (errorMessage) {
      // Open Razorpay dashboard in a new tab for the user to add funds
      window.open(
        "https://accounts.razorpay.com/auth/?redirecturl=https%3A%2F%2Fdashboard.razorpay.com&auth_intent=login",
        "_blank",
      );
    } else {
      // Handle other errors
      alert(errorMessage);
    }
  };

  //   if (!item || !item.razorpayDetails) {
  //     alert("No item data available for refund.");
  //     return;
  //   }

  //   const isConfirmed = window.confirm(`Confirm refund for ${item.itemName}?`);
  //   if (!isConfirmed) return;

  //   try {
  //     const response = await axios.post(
  //       "https://kisan-be-odvc.onrender.com/refund",
  //       {
  //         paymentId: item.razorpayDetails.id,
  //         amount: item.price * 100, // Send amount in the smallest currency unit (e.g., paisa for INR)
  //         upi_details: {
  //           payer_account_type: item.razorpayDetails.payer_account_type,
  //           vpa: item.razorpayDetails.vpa,
  //           wallet: item.razorpayDetails.wallet,
  //         },
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       },
  //     );

  //     if (response.data.success) {
  //       alert(`Refund initiated for ${item.itemName}.`);
  //       handleRefundSuccess(orderId, item);
  //     } else {
  //       throw new Error(response.data.message || "Refund initiation failed");
  //     }
  //   } catch (error) {
  //     console.error("Error initiating refund:", error);
  //     if (error.response && error.response.data) {
  //       const apiErrorMessage =
  //         error.response.data.error || "Refund initiation failed";
  //       if (apiErrorMessage.includes("Insufficient balance")) {
  //         alert("Insufficient balance. Opening Razorpay to add funds.");
  //         RazorpayCheckout(item);
  //       } else {
  //         alert(apiErrorMessage);
  //       }
  //     } else {
  //       alert("Error during refund. Please try again or contact support.");
  //     }
  //   }
  // };
  const processRefund = async (paymentId, amount) => {
    try {
      const response = await axios.post(
        "https://kisan-be-odvc.onrender.com/refund",
        {
          paymentId: paymentId,
          amount: amount,
        },
      );

      // Handle the refund response
      if (response.data.success) {
        alert("Refund initiated successfully");
        // Handle refund success
      } else {
        alert("Failed to initiate refund");
        // Handle refund failure
      }
    } catch (error) {
      console.error("Error processing refund:", error);
      handleRefundError(error);
      // Handle error
    }
  };
  // const RazorpayCheckout = (item) => {
  //   if (!item || !item.razorpayDetails) {
  //     console.error("razorpayDetails not found within item object");
  //     return;
  //   }

  //   const { razorpayDetails } = item;

  //   const options = {
  //     key: "rzp_live_pbJYaEW4zKJXLH", // Replace with your actual Razorpay Key ID
  //     amount: razorpayDetails.amount,
  //     currency: razorpayDetails.currency,
  //     name: "The Kissan Mart",
  //     description: "Payment Request",
  //     image: Kissanlogo, // Replace with a valid URL to your logo
  //     order_id: razorpayDetails.orderId, // Use the order ID from razorpayDetails
  //     handler: function (response) {
  //       alert("Payment successful: " + response.razorpay_payment_id);
  //       // Handle successful payment here
  //     },
  //     prefill: {
  //       name: razorpayDetails.vpa.split("@")[0],
  //       email: razorpayDetails.email,
  //       contact: razorpayDetails.contact,
  //       vpa: razorpayDetails.vpa,
  //     },
  //     notes: razorpayDetails.notes,
  //     theme: {
  //       color: "#F37254",
  //     },
  //   };

  //   const rzp1 = new Razorpay(options);
  //   rzp1.on("payment.failed", function (response) {
  //     alert("Payment failed: " + response.error.description);
  //     // Handle payment failure here
  //   });

  //   rzp1.open();
  // };

  const handleRefundSuccess = async (orderId, item) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://kisan-be-odvc.onrender.com/orders/${orderId}/status`,
        {
          newOrderStatus: "refunded",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data) {
        const successMessage = `Refund successful for ${item.itemName}.`;
        toast.success(successMessage);
        console.log("Order status updated:", response.data);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  const handleDelivery = async (orderId, item) => {
    try {
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        `Are you sure you want to mark the order for ${item.itemName} as delivered?`,
      );

      if (!isConfirmed) {
        return; // Do nothing if the user cancels the confirmation
      }

      // Retrieve the token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, authorization is required");
        return;
      }

      const response = await axios.put(
        `https://kisan-be-odvc.onrender.com/orders/${orderId}/status`,
        {
          newOrderStatus: "delivered",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Authorization header with the Bearer token
          },
        },
      );

      console.log("Order status updated:", response.data);

      // Check if the response is successful and if it is, proceed to log success
      if (response.data) {
        const successMessage = `Order marked as delivered for ${item.itemName}. Price: ${item.price}, Units: ${item.units}, Discount: ${item.discount}`;
        console.log("Delivery Success Message Sent:", successMessage);
        // Optionally, display a success message to the user
        alert(successMessage);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      // Optionally, inform the user about the error
      alert(`Failed to update status for ${item.itemName}: ${error.message}`);
    }
  };

  //fetching user data_____________________________________________________________
  const fetchUserData = async (userId) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token"); // Ensure 'token' is the key used when the token is stored

    try {
      const response = await fetch(
        "https://kisan-be-odvc.onrender.com/getuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the Authorization header with the Bearer token
          },
          body: JSON.stringify({ userId }),
        },
      );

      if (!response.ok) {
        throw new Error("Error fetching user details");
      }

      const userData = await response.json();
      console.log("User Details:", userData);

      // Update the userData state
      setUserData(userData);

      return userData;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error; // Propagate the error to be possibly caught by calling code
    }
  };

  const openPopup = (item) => {
    setSelectedItem(item);
    // Fetch user details when the popup is opened
    fetchUserData(item.userId);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <ToastContainer />
      <h2>ORDERS FROM CUSTOMERS</h2>
      <div className="main-orders-con">
        {cartItems.map((item) => (
          <div key={item._id} className="sub-orders-con">
            <div className="order-image">
              {item.itemImage && (
                <img
                  src={`data:image/*;base64,${extractBase64Data(
                    item.itemImage,
                  )}`}
                  alt="Item Image"
                />
              )}
            </div>
            <p>
              Date & Time of Order:{" "}
              {new Date(item.currentDate).toLocaleString()}
            </p>
            <p>Category: {item.category}</p>
            <p>Item Name: {item.itemName}</p>
            <p>Units: {item.units}</p>
            <p>Cost Per Unit: {item.costPerUnit}</p>
            <p>Discount: {item.discount}</p>
            <p>Description: {item.description}</p>

            <p>User ID: {item.userId}</p>
            <p>Payment Method: {item.payment}</p>
            <p>Count: {item.count}</p>
            <p>Price: {item.price}</p>
            <p>Order Status: {item.orderStatus}</p>
            {(item.orderStatus === "delivered" ||
              item.orderStatus === "refunded") &&
              item.payment === "yes" && (
                <button
                  className="remove-button"
                  onClick={() => removeItem(item._id, item)}
                >
                  Remove
                </button>
              )}
            {item.orderStatus === "cancel" && item.payment === "yes" && (
              <button
                className="refund-button"
                onClick={() => initiateRefund(item._id, item)}
              >
                Refund
              </button>
            )}
            {item.orderStatus === "Pending" && item.payment === "yes" && (
              <button
                className="deliver-button"
                onClick={() => handleDelivery(item._id, item)}
              >
                Deliver
              </button>
            )}
            <button className="popup-button" onClick={() => openPopup(item)}>
              Order Details
            </button>
          </div>
        ))}
      </div>
      {selectedItem && (
        <OrderPopup
          userData={userData}
          itemData={selectedItem}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default Orders;
