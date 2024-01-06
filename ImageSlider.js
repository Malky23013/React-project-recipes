import React, { useState, useEffect } from "react";
import TestimonialSection from './TestimonialSection'
import './App.css';
import video from './pictures/video.mp4';
const ImageSlider = ({ images}) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, [currentImage, images.length]);

  return (
    <div className="image-slider">
      <video id="videoShow"
        src={video}
        autoPlay
        loop
        muted
      />  
      {/* //need to change the id to class */}
      <div>
      
        <h1 id="h2">Our Goodies</h1>
      </div>
      <div className="image-list">
        {images.map((image, index) => (
          <div key={index} className={index === currentImage ? "active" : ""}>
            <img
              src={image}
              alt={image}
              id={index === currentImage ? "picShow" : "picNotShow"}
           
            />
          </div>
        ))}
      </div>
      <TestimonialSection/>
    </div>
  );
};

export default ImageSlider;