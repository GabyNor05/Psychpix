import React from 'react';
import Footer from './components/Footer';
import BentoGrids from './components/BentoGrids';
import LinkScroll from './components/LinkScroll';
import GeneralCarousel from '../_GeneralComponents/Carousel';
import './Home.css';

import image1 from './images/bento1.jpg';
import image2 from './images/bento2.jpg';
import image3 from './images/bento3.jpg';
import image4 from './images/bento4.jpg';

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

function Home() {
  return (
    <>
      <BentoGrids />
      <GeneralCarousel slides={slides} Title={"Currently Trending"} />
      <LinkScroll />
      <Footer />
    </>
  );
}

export default Home;