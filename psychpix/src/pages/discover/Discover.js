import React from "react";
import Carousel from '../_GeneralComponents/Carousel';
import image1 from './exampleImages/ex1.jpeg';
import image2 from './exampleImages/ex2.jpg';
import image3 from './exampleImages/ex3.jpg';
import image4 from './exampleImages/ex4.jpg';
import image5 from './exampleImages/ex5.jpg';

import image6 from './exampleImages/static/af1.jpg';
import image7 from './exampleImages/static/af2.jpg';
import image8 from './exampleImages/static/af3.jpg';
import image9 from './exampleImages/static/af4.jpg';
import image10 from './exampleImages/static/af5.jpg';

const slides = {
  paintings: [
    image1,
  image2,
  image3,
  image4,
  image5,
  image1,
  image2,
  image3
  ],

  african: [
    image6,
    image7,
    image8,
    image9,
    image10
  ]
  
}

function Discover() {
  return (
   <div style={{ paddingTop: '32px'}}>
    <Carousel slides={slides.african} Title={"African"}/>
    <Carousel slides={slides.paintings} Title={"Paintings"}/>
   </div>
  );
}

export default Discover;