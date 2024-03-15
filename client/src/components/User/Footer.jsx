import "../styles/footer.css";
// import facebook from './footer-images/facebook.png'
// import instagram from './footer-images/instagram.png'
// import youtube from './footer-images/youtube.png'
import logo from "../../assets/images/Kissanlogo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import playapp from "../../assets/userimages/play-app.png";

const Footer = () => {
  const navigate = useNavigate();
  const [showCompanyContent, setShowCompanyContent] = useState(true);

  const toggleCompanyContent = () => {
    setShowCompanyContent(!showCompanyContent);
  };

  return (
    <>
      <div className="footer-section">
        {/* <div className='footer-logo'>
                    <img src={logo} alt='logo'/>
                  </div> */}
        <div className="footer-content">
          <div className="company">
            <h1>Quick Links</h1>
            <p
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </p>
            <p
              onClick={() => {
                navigate("/aboutus");
              }}
            >
              About Us
            </p>
            <p
              onClick={() => {
                navigate("/blogs");
              }}
            >
              Blogs
            </p>
            <p
              onClick={() => {
                navigate("/");
              }}
            >
              Login
            </p>
            {/* <div className='social-media'>
                                <a><img src={facebook} alt='facebook'/></a>
                                <a><img src={instagram} alt='instagram'/></a>
                                <a><img src={youtube} alt='youtube'/></a>
                            </div> */}
          </div>
          <div className="Information">
            <h1>Information</h1>
            <p
              onClick={() => {
                navigate("/refund&cancellation");
              }}
            >
              Refund and cancellation policy
            </p>
            <p
              onClick={() => {
                navigate("/shippingpolicy");
              }}
            >
              Shipping Policy
            </p>
            <p
              onClick={() => {
                navigate("/return&exchange");
              }}
            >
              Return & Exchange Policy
            </p>
            <p
              onClick={() => {
                navigate("/privacypolicy");
              }}
            >
              Privacy Policy
            </p>
            <p
              onClick={() => {
                navigate("/termsconditions");
              }}
            >
             Terms and Conditions
            </p>
          </div>
          <div className="contactus">
            <h1>Contact Us</h1>
            <p>+91 6301086714</p>
            <p>Support@thekisanmarket.com</p>
            <div className="play-app">
              <img src={playapp} alt="play&app" />
            </div>
          </div>
          <div className="workingsales">
            <h1>Address </h1>
            <p>
              VEDEHI NAGAR <br />
              NEAR BDL COMPLEX
              <br />
              BN Reddy Nagar, Gurramguda Road
              <br />
              Hyderabad , Rangareddy <br />
              Telangana , 500070
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
