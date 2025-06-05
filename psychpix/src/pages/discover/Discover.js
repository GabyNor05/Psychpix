import React from "react";
import Carousel from '../_GeneralComponents/Carousel';
import Footer from '../home/components/Footer';
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

const PsychedelicImages = getImagesByTag(data, 'Psychedelic');
const GalaxyImages = getImagesByTag(data, 'Galaxy');
const AfricanImages = getImagesByTag(data, 'African');
const DigitalImages = getImagesByTag(data, 'Digital Artworks');
const PaintingImages = getImagesByTag(data, 'Paintings');
const PhotoImages = getImagesByTag(data, 'Photography');
const SculptImages = getImagesByTag(data, 'Sculptures');
const AI_Images = getImagesByTag(data, 'Artificial Intelligence');

function Discover() {
  return (
   <div style={{ paddingTop: '32px'}}>
    <Carousel slides={PsychedelicImages} Title={"Psychedelic"}/>
    <Carousel slides={GalaxyImages} Title={"Galaxy"}/>
    <Carousel slides={AfricanImages} Title={"African"}/>
    <Carousel slides={DigitalImages} Title={"Digital Artworks"}/>
    <Carousel slides={PaintingImages} Title={"Paintings"}/>
    <Carousel slides={PhotoImages} Title={"Photography"}/>
    <Carousel slides={SculptImages} Title={"Sculptures"}/>
    <Carousel slides={AI_Images} Title={"Artificial Intelligence"}/>
    <Footer />
   </div>
  );
}

export default Discover;