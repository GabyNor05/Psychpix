import React from 'react';
import Footer from './components/Footer';
import BentoGrids from './components/BentoGrids';
import LinkScroll from './components/LinkScroll';
import GeneralCarousel from '../_GeneralComponents/Carousel';
import './Home.css';

import image1 from './images/bento/bento1.jpg';
import image2 from './images/bento/bento2.jpg';
import image3 from './images/bento/bento3.jpg';
import image4 from './images/bento/bento4.jpg';

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
      <LinkScroll />
      <GeneralCarousel slides={slides} Title={"Currently Trending"} />
      <Footer />
    </>
  );
}

export default Home;