import '../styles/home.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

// images 
import homemain from '../../assets/userimages/main-image.jpeg'
import user1 from '../../assets/userimages/user-1.jpeg'
import user2 from '../../assets/userimages/user-2.jpeg'
import user3 from '../../assets/userimages/user-3.jpeg'
import user5 from '../../assets/userimages/user-5.jpg'


const Home=(()=>{
    const navigate = useNavigate()



    return(
        <>
             <div className="home-section">
                {/* home-img-container */}
                <div>
                    <div className="home-img-con">
                    <img src={homemain} alt="homr-img-con" />

                    </div>
                    <p className='image-content'>“Made with Love in Hyderabad for Hyderabad"</p>
                </div>
                <div className='home-main-info'>
                <h2 className='content-head-h'>WELCOME TO KISSAN MARKET</h2>
                <span><p className='content-content-h'>Welcome to Kisan Market, a family-managed retail unit rooted in a deep connection to farming since generations. Established in 2024, our story began as humble farmers, navigating the fields and embracing the essence of agriculture. As time unfolded, our journey led us to the vibrant world of retail, where we are creating a bridge between farmers and customers, making both customers and farmers profitable by cutting down the traditional middleman model of bringing farm-grown products from farmers to customers.<p className='readmore-h' onClick={()=>{navigate('/aboutus')}}>Readmore</p>
                </p></span>

                </div>

            <div className="cards">
                <div className="card">
                <h2>Our Mission</h2>
                <p className="two-lines">
                    "To empower farmers and customers alike, KISSAN MART is dedicated to
                    delivering fresh, quality fruits and vegetables. We maximize farmer
                    profits by eliminating middlemen, ensuring fair compensation, while
                    offering customers cost-effective, top-tier produce."
                </p>
                </div>

                <div className="card">
                <h2>Our Vision</h2>
                <p className="two-lines">
                    "At KISSAN MART, we envision a future where a direct, transparent
                    supply chain transforms the way we access and appreciate fresh
                    produce. Through our platform, we strive to create a sustainable,
                    mutually beneficial connection between farmers and consumers."
                </p>
                </div>
            </div>

                <div className='working-towards'>
                        <h2 className='content-head-h-sub'>Blogs</h2>
                        <div className='working-links'>
                             <div className='working-sub-links' onClick={()=>{navigate('/blogs')}}>
                                 <img src={user1} alt='ambitions-home' />
                             </div>
                             <div className='working-sub-links'  onClick={()=>{navigate('/blogs')}}>
                                 <img src={user2} alt='ambitions-home'  />              
                             </div>
                             <div className='working-sub-links'  onClick={()=>{navigate('/blogs')}}>
                                  <img src={user3} alt='ambitions-home' />   
                            </div>
                            <div className='working-sub-links'  onClick={()=>{navigate('/blogs')}}>
                                 <img src={user5} alt='ambitions-home' />   
                            </div>
                        </div>
                
                
             </div>
          
             </div>
        </>
    )
})
export default Home
