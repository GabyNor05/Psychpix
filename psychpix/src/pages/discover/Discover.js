import React from "react";
import Carousel from '../_GeneralComponents/Carousel';
import image1 from './exampleImages/ex1.jpeg';
import image2 from './exampleImages/ex2.jpg';
import image3 from './exampleImages/ex3.jpg';
import image4 from './exampleImages/ex4.jpg';
import image5 from './exampleImages/ex5.jpg';

const slides = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image1,
  image2,
  image3
]

function Discover() {
  return (
   <>
    <Carousel slides={slides} Title={"Paintings"}/>
   </>
  );
}

export default Discover;