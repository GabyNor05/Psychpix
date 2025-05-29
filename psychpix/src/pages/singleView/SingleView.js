import React from "react";
import SingleItemSelection from "./components/SingleItem";
import Carousel from "../_GeneralComponents/Carousel";
import CommentSection from './components/CommentPortal';
import Footer from "../home/components/Footer";
import './SingleView.css';

import image1 from '../home/images/bento/bento1.jpg';
import image2 from '../home/images/bento/bento2.jpg';
import image3 from '../home/images/bento/bento3.jpg';
import image4 from '../home/images/bento/bento4.jpg';

const slides = [
  image1,
  image2,
  image3,
  image4,
  image1,
  image1,
  image3,
  image2,
]

function SingleView() {
  return (
   <>
      <SingleItemSelection />
      <div style={{margin: '900px'}}>

      </div>
      <Carousel slides={slides} Title={"Related"} />
      <Carousel slides={slides} Title={"Recommended"} />
      <CommentSection />
      <Footer />
   </>
  );
}

export default SingleView;