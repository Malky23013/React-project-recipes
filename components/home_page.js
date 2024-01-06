import React from 'react';
// import '../App.css';
import '../style/bootstrap.min.css';

import ImageSlider from '../style/ImageSlider';
import localImage from '../pictures/pic1.jpg'; 
import localImage2 from '../pictures/pic2.jpg';
import localImage3 from '../pictures/pic3.jpg';
import localImage4 from '../pictures/pic4.jpg';
import Menu from '../style/Menu';
const Home = () => {
  const images = [
    localImage,
    localImage2,
    localImage3,
    localImage4,
  ];

  return (
    <div>
      <Menu/>
      <ImageSlider images={images} />
    </div>
  );
};

export default Home;
