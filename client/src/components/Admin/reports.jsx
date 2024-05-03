import React from "react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("https://dashboard.razorpay.com/signin?screen=sign_in");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          fontWeight: "bold",
          fontSize: "50px",
        }}
        onClick={handleNavigate}
      >
        <img
          src="http://images.deccanchronicle.com/dc-Cover-u0b349upqugfio195s4lpk8144-20190213120303.Medi.jpeg"
          alt="razorpay"
          style={{ width: "300px", height: "200px" }}
        />
      </div>
    </>
  );
};

export default Reports;
