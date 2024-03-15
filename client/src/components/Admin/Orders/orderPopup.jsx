// OrderPopup.jsx
import React from "react";
import PropTypes from "prop-types";
import "./OrderPopup.css";

const OrderPopup = ({ itemData, onClose, userData }) => {
  console.log("userData:", userData);
  const extractBase64Data = (base64String) => {
    return base64String.substring("data:image/*;base64,".length);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Order Details</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
            }
            .order-popup-content {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
              color: #333;
              text-align: center;
            }
            /* Add more styles as needed */
          </style>
        </head>
        <body>
          <div class="order-popup-content">
            <h2>Order Details</h2>
            <div class="order-details">
              <div class="order-image">
                ${
                  itemData.itemImage
                    ? `<img src="data:image/*;base64,${extractBase64Data(
                        itemData.itemImage
                      )}" alt="Item Image" />`
                    : ""
                }
              </div>
              <div class="order-info">
                <p><strong>Date & Time of Order:</strong> ${new Date(
                  itemData.currentDate
                ).toLocaleString()}</p>
                <p><strong>Category:</strong> ${itemData.category}</p>
                <p><strong>Item Name:</strong> ${itemData.itemName}</p>
                <p><strong>Units:</strong> ${itemData.units}</p>
                <p><strong>Cost Per Unit:</strong> ${itemData.costPerUnit}</p>
                <p><strong>Discount:</strong> ${itemData.discount}</p>
                <p><strong>Description:</strong> ${itemData.description}</p>
                <p><strong>User ID:</strong> ${itemData.userId}</p>
                <p><strong>Payment Method:</strong> ${itemData.payment}</p>
                <p><strong>Count:</strong> ${itemData.count}</p>
                <p><strong>Price:</strong> ${itemData.price}</p>
                <p><strong>Order Status:</strong> ${itemData.orderStatus}</p>
              </div>
            </div>
          </div>
          <script>
            // Optional: You can include additional scripts if needed
          </script>
        </body>
      </html>
    `);

    // Close the print window after printing
    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    };
  };
  return (
    <div className="order-popup">
      <div className="order-popup-content">
        <h2>Kissan Mart</h2>
        <h2>Order Details</h2>
        <div className="order-details">
          <div className="order-image">
            {itemData.itemImage && (
              <img
                src={`data:image/*;base64,${extractBase64Data(
                  itemData.itemImage
                )}`}
                alt="Item Image"
              />
            )}
          </div>
          <div className="order-info">
            <p>
              <strong>Date & Time of Order:</strong>{" "}
              {new Date(itemData.currentDate).toLocaleString()}
            </p>
            <p>
              <strong>Category:</strong> {itemData.category}
            </p>
            <p>
              <strong>Item Name:</strong> {itemData.itemName}
            </p>
            <p>
              <strong>Units:</strong> {itemData.units}
            </p>
            <p>
              <strong>Cost Per Unit:</strong> {itemData.costPerUnit}
            </p>
            <p>
              <strong>Discount:</strong> {itemData.discount}
            </p>
            <p>
              <strong>Description:</strong> {itemData.description}
            </p>
            <p>
              <strong>User ID:</strong> {itemData.userId}
            </p>
            <p>
              <strong>Payment Method:</strong> {itemData.payment}
            </p>
            <p>
              <strong>Count:</strong> {itemData.count}
            </p>
            <p>
              <strong>Price:</strong> {itemData.price}
            </p>
            <p>
              <strong>Order Status:</strong> {itemData.orderStatus}
            </p>
          </div>
        </div>
        {/* User details */}
        <h2>User Details</h2>
        {userData && (
          <div className="user-details">
            <p>
              <strong>User Name:</strong> {userData.userName}
            </p>
            <p>
              <strong>Phone Number:</strong> {userData.phoneNumber}
            </p>
          </div>
        )}
        {/* Buttons */}
        <button className="print-button" onClick={handlePrint}>
          Print
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

OrderPopup.propTypes = {
  itemData: PropTypes.shape({
    itemImage: PropTypes.string, // assuming itemImage is optional
    currentDate: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    units: PropTypes.number.isRequired,
    costPerUnit: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    payment: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    orderStatus: PropTypes.string.isRequired,
  }).isRequired,
  userData: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default OrderPopup;
