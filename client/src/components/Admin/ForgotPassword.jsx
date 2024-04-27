import React, { useState } from "react";
import "./ForgotPassword.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/Kissanlogo.png";
const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [hideButton, setHideButton] = useState(true);

  // Function to generate a random 4-digit OTP
  const generateRandomNumber = () => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000);
    setGeneratedOtp(generatedOtp);

    // Call sendingApi with the generated OTP
    sendingApi(generatedOtp.toString());

    return generatedOtp;
  };

  // Function to send OTP via email
  const generateEmailContent = () => {
    const generatedOtp = generateRandomNumber();

    const emailData = {
      service_id: "service_vn36q2e",
      template_id: "template_6um9rf9",
      user_id: "-Q8_wlFJhIcaHOpjO",
      template_params: {
        from: "Kissan-Mart",
        to: email,
        message: generatedOtp.toString(),
        reply_to: email,
        Bcc: "jobminarinfo@gmail.com",
        cc: "sameerg1810@gmail.com",
      },
    };

    axios
      .post("https://api.emailjs.com/api/v1.0/email/send", emailData)
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => {
            alert("OTP sent successfully!");
          }, 1000);
        } else {
          handleApiError(response, "Failed to send OTP. Please try again.");
        }
      })
      .catch((error) => {
        handleApiError(error, "Failed to send OTP. Please try again.");
      });
  };

  const sendingApi = (otp) => {
    const apiUrl = "http://localhost:4000/otp/save";
    const requestBody = {
      email: email,
      otp: otp,
    };

    // Log the API request details for debugging
    console.log("Sending API Request:", {
      apiUrl: apiUrl,
      method: "POST",
      requestBody: requestBody,
    });

    axios
      .post(apiUrl, requestBody)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          fetchData();
          alert("OTP saved successfully!");
        } else {
          handleApiError(response, "Failed to save OTP. Please try again.");
        }
      })
      .catch((error) => {
        handleApiError(
          error,
          "Failed to save OTP. Please try again after 5 minuntes."
        );
      });
  };

  // Rest of your code...

  // Function to fetch OTP from the backend
  const fetchData = () => {
    axios
      .get(`http://localhost:4000/otp/${email}`)
      .then((response) => {
        setOtp(response.data.otp);
      })
      .catch((error) => {
        handleApiError(error, "Failed to fetch OTP. Please try again.");
      });
  };

  // Function to update password
  const setNewPasswordApi = () => {
    const apiUrl = "http://localhost:4000/update-password";
    const requestBody = {
      email: email,
      newPassword: newPassword,
    };

    axios
      .put(apiUrl, requestBody)
      .then((response) => {
        fetchData();
        handleApiResponse(response, "Password reset successfully!", "/");
      })
      .catch((error) => {
        handleApiError(error, "Failed to reset password. Please try again.");
      });
  };

  // Function to handle success responses
  const handleApiResponse = (response, successMessage, redirectUrl) => {
    console.log(response);
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: successMessage,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate(redirectUrl);
    });
  };

  // Function to handle form submission
  const handleDetails = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (email) {
      generateEmailContent();
      setShowOtp(true);
      setHideButton(false);
    }
  };

  // Function to handle go back action

  // Function to handle redirect to login
  const handleRedirectToLogin = () => {
    navigate("/");
  };

  // Function to handle redirect to signup
  const handleRedirectToSignup = () => {
    navigate("/signup");
  };

  // Function to handle API errors
  const handleApiError = (error, errorMessage) => {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: errorMessage,
    });
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <div>
          <strong id="title">KISSAN MART</strong>
        </div>
        <div id="logo">
          <img src={logo} className="image1" alt="KISSAN MART Logo" />
        </div>
        <div>
          <span id="title2">Forgot Password</span>
          <br />
        </div>
      </div>
      <div className="forgot-password-input-container">
        <form onSubmit={handleDetails}>
          <div className="forgot-password-div">
            <fieldset className="line">
              <legend>Email</legend>
              <div className="number-input">
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input-box1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </fieldset>
          </div>

          <div style={{ display: hideButton ? "block" : "none" }}>
            <button type="submit" className="submit-button">
              Get OTP
            </button>
          </div>
        </form>
        <div
          className="forgot-password-div"
          style={{ display: showOtp ? "block" : "none" }}
        >
          <fieldset className="line">
            <legend>OTP</legend>
            <div className="number-input">
              <div>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  className="input-box1"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="line">
            <legend>New Password</legend>
            <div className="number-input">
              <div>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="input-box1"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          <div>
            <button
              type="button"
              className="submit-button"
              onClick={setNewPasswordApi}
            >
              Set Password
            </button>
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button onClick={handleRedirectToLogin}>Go to Login</button>
        <button onClick={handleRedirectToSignup}>Go to Signup</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
