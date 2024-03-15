// AboutUs.js
import React from "react";
import AboutImage from "../../assets/images/KissanMartbanner.jpeg";
import "../styles/AboutUs.css"; // Import the CSS file

const AboutUs = () => {
  return (
    <div>
     
        <div className="image-box">
          <img src={AboutImage} alt="About us" className="about-image" />
        </div>

        <p className="main-content">
          Welcome to Kisan Market, a family-managed retail unit rooted in a deep
          connection to farming since generations. Established in 2024, our
          story began as humble farmers, navigating the fields and embracing the
          essence of agriculture. As time unfolded, our journey led us to the
          vibrant world of retail, where we are creating a bridge between
          farmers and customers, making both customers and farmers profitable by
          cutting down the traditional middleman model of bringing farm-grown
          products from farmers to customers. Fueled by a passion for providing
          the community with quality produce, we have amalgamated our extensive
          experience in both farming and retail to bring you Kisan Market – a
          delivery app dedicated to delivering fresh, farm-grown products
          directly to your doorstep at affordable prices. At Kisan Market, we
          understand the importance of fostering a direct connection between
          farmers and consumers. Through our app, we aim to bridge the gap,
          ensuring that you receive the freshest produce while supporting local
          farmers. Our commitment to quality, affordability, and sustainability
          defines our mission. Join us on this journey, where the simplicity of
          farm life meets the convenience of modern technology. Experience the
          taste of freshness, handpicked, and delivered with care. Welcome to
          Kisan Market – where farm-fresh goodness is just a click away!
        </p>

        {/* <div className="cards">
        <div className="card">
          <h2>Mission</h2>
          <p className="two-lines">
            "To empower farmers and customers alike, KISSAN MART is dedicated to
            delivering fresh, quality fruits and vegetables. We maximize farmer
            profits by eliminating middlemen, ensuring fair compensation, while
            offering customers cost-effective, top-tier produce."
          </p>
        </div>

        <div className="card">
          <h2>Vision</h2>
          <p className="two-lines">
            "At KISSAN MART, we envision a future where a direct, transparent
            supply chain transforms the way we access and appreciate fresh
            produce. Through our platform, we strive to create a sustainable,
            mutually beneficial connection between farmers and consumers."
          </p>
        </div>
        </div> */}
      
      </div>
    
  );
};

export default AboutUs;
