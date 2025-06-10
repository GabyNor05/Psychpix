import React from "react";
import SingleItemSelection from "./components/SingleItem";
import Carousel from "../_GeneralComponents/Carousel";
import CommentSection from './components/CommentPortal';
import Footer from "../home/components/Footer";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
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

async function GetSelectedItem(ItemID){
        try {
        const response = await fetch(`http://localhost:5000/api/items/${ItemID}`);

        if (response.ok) {
            const item = await response.json();
            console.log('Item data:', item);
            return item;
        } else {
            console.log(ItemID);
            alert('Item not found');
        }
        } catch (err) {
        console.error('Fetch failed:', err);
      }
    }

    let ImageData = '';
    try {
      const response = await fetch(`http://localhost:5000/api/items`);
      if (response.ok) {
        const item = await response.json();
        ImageData = item;
      } else {
        alert('Item not found');
      }
    } catch (err) {
      console.error('Fetch failed:', err);
    }

function SingleView() {

  const [ItemData, setItemData] = useState(null);

    const location = useLocation();
    const { selectedItem } = location.state || {};

    useEffect(() => {
        GetSelectedItem(selectedItem).then(data => setItemData(data)); 
    }, []);

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

  if(!ItemData){
    return(<p>...Loading</p>);
  }

  const TaggedImages = getImagesByTag(ImageData, ItemData.tags[0]);

  return (
   <>
      <SingleItemSelection ItemData={ItemData} />
      <div style={{margin: '256px'}}>

      </div>
      
      <Carousel slides={TaggedImages} Title={"Related"} />
      <CommentSection />
      <Footer />
   </>
  );
}

export default SingleView;