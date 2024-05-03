const Razorpay = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          font: "Bold",
          fontSize: "50px",
        }}
        onClick={() => {
          // Navigate to the Reports URL
          window.location.href =
            "https://dashboard.razorpay.com/signin?screen=sign_in";
        }}
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

export default Razorpay;
