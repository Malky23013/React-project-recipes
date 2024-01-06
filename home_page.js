import React from 'react';
// import './App.css';
import './bootstrap.min.css';

import ImageSlider from './ImageSlider';
import localImage from './pictures/pic1.jpg'; 
import localImage2 from './pictures/pic2.jpg';
import localImage3 from './pictures/pic3.jpg';
import Menu from './Menu';
const Home = () => {
  const images = [
    localImage,
    localImage2,
    localImage3,
  ];

  return (
    <div>
      <Menu/>
      <ImageSlider images={images} />
    </div>
  );
};

export default Home;
