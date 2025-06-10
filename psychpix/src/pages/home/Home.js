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

let data = '';
try {
  const response = await fetch(`http://localhost:5000/api/items`);
  if (response.ok) {
    const item = await response.json();
    data = item;
  } else {
    alert('Item not found');
  }
} catch (err) {
  console.error('Fetch failed:', err);
}

function getImagesByTag(data, tag){
  const filtered = data.filter(item => item.tags.includes(tag));
  if (filtered.length === 0) return [];

  const slides = filtered.map(item => ({
    imageUrl: item.imageUrl,
    id: item._id,
    name: item.title,
    price: FormatPrice(item.price * (1 - (item.discount / 100))),
  }));

  return slides;
}

function FormatPrice(price){
    let result = '';
    let stringPrice = String(Math.floor(price));
    for (let index = stringPrice.length - 1; index >= 0; index--) {
        result += stringPrice[stringPrice.length - index - 1];
        if(index % 3 == 0 && index != 0){
            result += ',';
        }
    }
    return result;
}

const TrendingImages = getImagesByTag(data, 'Trending');

function Home() {
  return (
    <>
      <BentoGrids />
      <LinkScroll />
      <GeneralCarousel slides={TrendingImages} Title={"Currently Trending"} />
      <Footer />
    </>
  );
}

export default Home;