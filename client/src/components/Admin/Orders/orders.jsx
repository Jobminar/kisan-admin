import { useEffect, useState } from "react";
import axios from "axios";
import useRazorpay from "react-razorpay";
import "./orders.css";
import OrderPopup from "./orderPopup";
import { io as socketIo } from "socket.io-client";
import Kissanlogo from "../../../assets/images/Kissanlogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = socketIo("https://kisanmart.onrender.com", {
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "http://localhost:5173",
  },
});

socket.on("connect", () => {
  console.log("Connected to socket");
});

socket.on("connect", () => {
  console.log("Connected to socket");
});
const Orders = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [Razorpay] = useRazorpay();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "https://kisanmart.onrender.com/getorders"
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
    const inactivityTimer = setTimeout(() => {
      toast.info("Reloading page to fetch new orders.", {
        autoClose: 8000, // Set duration in milliseconds (2 seconds)
      });
      window.location.reload();
    }, 60000);

    // Clear the timer when the component is unmounted or when there's user activity
    const clearTimer = () => clearTimeout(inactivityTimer);

    // Attach event listeners to detect user activity
    document.addEventListener("mousemove", clearTimer);
    document.addEventListener("keydown", clearTimer);

    // Clean up the event listeners when the component is unmounted this is conatctus
    return () => {
      document.removeEventListener("mousemove", clearTimer);
      document.removeEventListener("keydown", clearTimer);
    };
  }, []);

  const extractBase64Data = (base64String) => {
    return base64String.substring("data:image/*;base64,".length);
  };

  const removeItem = async (orderId, item) => {
    try {
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        `Are you sure you want to remove the order for ${item.itemName}?`
      );

      if (!isConfirmed) {
        return; // Do nothing if the user cancels the confirmation
      }

      // Make a DELETE request to remove the item
      const response = await axios.delete(
        `https://kisanmart.onrender.com/orders/${orderId}`
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
  //Logic for initiating refund
  const initiateRefund = async (orderId, item, userData) => {
    try {
      if (!item) {
        console.error("Item is undefined in initiateRefund");
        return;
      }
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        `Are you sure you want to initiate a refund for ${item.itemName}?`
      );

      if (!isConfirmed) {
        return; // Do nothing if the user cancels the confirmation
      }

      const options = {
        key: "rzp_test_F0NFXQAieRykHN",
        amount: (item.price * 100).toString(),
        currency: "INR",
        name: "Kisan mart",
        payment_capture: "1",
        capture_after: "30",
        description: `Refund Transaction for ${item.itemName}`,
        image: { Kissanlogo },

        handler: async (res) => {
          console.log(res);
          // Check if payment was successful before initiating refund
          if (res.razorpay_payment_id) {
            await handleRefundSuccess(orderId, item);
          }
        },
        prefill: {
          name: userData ? userData.userName : "Piyush Garg",
          email: "youremail@example.com", // You can use userData.email if available
          contact: userData ? userData.phoneNumber : "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
          category: item.category,
          units: item.units,
          costPerUnit: item.costPerUnit,
          discount: item.discount,
          description: item.description,
          userId: item.userId,
          paymentMethod: item.payment,
          count: item.count,
          orderId: orderId,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    } catch (error) {
      console.error("Error initiating refund:", error);
    }
  };

  const handleRefundSuccess = async (orderId, item) => {
    try {
      // Make a POST request to update the order status to "refunded"
      const response = await axios.put(
        "https://kisanmart.onrender.com/orderId/status",
        {
          orderId: orderId,
          newOrderStatus: "refunded",
        }
      );

      console.log("Order status updated:", response.data);

      // Emit socket event after a successful response
      if (response.data) {
        console.log("Before socket emission");
        const successMessage = `Refund processed successfully for ${item.itemName}. Price: ${item.price}, Units: ${item.units}, Discount: ${item.discount}`;
        socket.emit("successMessage", {
          userId: item.userId,
          message: successMessage,
        });
        console.log("Refund Success Message Sent:", successMessage);

        // Log a message after sending the success message
        console.log("sendMessage after refund success");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDelivery = async (orderId, item) => {
    try {
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        `Are you sure you want to mark the order for ${item.itemName} as delivered?`
      );

      if (!isConfirmed) {
        return; // Do nothing if the user cancels the confirmation
      }

      const response = await axios.put(
        "https://kisanmart.onrender.com/orderId/status",
        {
          orderId: orderId,
          newOrderStatus: "delivered",
        }
      );

      console.log("Order status updated:", response.data);

      // Emit socket event after successful response
      if (response.data) {
        const successMessage = `Order initiated for delivery successfully for ${item.count} Number of ${item.itemName}. Price: ${item.price}, Units: ${item.units}, Discount: ${item.discount}`;
        socket.emit("successMessage", {
          userId: item.userId,
          message: successMessage,
        });
        console.log("Delivery Success Message Sent:", successMessage);

        // Log a message after sending the success message
        console.log("sendMessage after delivery success");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  //fetching user data_____________________________________________________________
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch("https://kisanmart.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

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
      throw error; // Throw the error to handle it in the calling code
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
                    item.itemImage
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
              Open Popup
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
