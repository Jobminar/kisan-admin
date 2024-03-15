
import './blogs.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Blogdata from './blogsdata';


const Blogs = () => {
  const navigate = useNavigate()






  // view page
  const [selectedblog, setSelectedblog] = useState('');
  
  const handleProduct = (item) => {
    setSelectedblog(item);
    navigate('/blogview', { state: { selectedblog: item } });
    console.log(item,'data')
  };

  return (
    <>
      <div className="blogs-con">
       <div className='side-head-blogs'>
       <h1>BLOGS</h1>
       </div>
       
        <p>
        “Made with Love in Hyderabad for Hyderabad"
        </p>
        <div className="blog-container">
          {Blogdata.map((blog, index) => (
            <div key={index} className="blog-item" >
              <img src={blog.img} alt={`Blog ${index + 1}`} onClick={() => handleProduct(blog)}/>
              <div className='relative-content'>
                <h2>{blog.title}</h2>
              </div>
            </div>
          ))}
        </div>

    
      </div>
    </>
  );
};

export default Blogs;
