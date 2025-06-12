import lineSquare from '../../_GeneralComponents/icons/lilsquare.png';
import { XIcon, PlusIcon, MinusIcon } from '@phosphor-icons/react';
import Rating from './Rating';
import { useState, useEffect, useRef } from 'react';
import { useLocation,  useNavigate} from 'react-router-dom';
import WoodFrame from '../images/woodFrame.jpg';
import WoodFrame2 from '../images/WoodFrame5.jpeg';
import WoodFrame3 from '../images/WoodFrame8.jpeg';
import { toast } from 'react-toastify';

function SingleItemSelection({ItemData})
{
    const navigate = useNavigate();

    const woodFrames = [{
        image: WoodFrame,
        name: 'OakWood'
    },
    {
        image: WoodFrame2,
        name: 'BlackWood'
    },
    {
        image: WoodFrame3,
        name: 'BloodWood'
    },]
    
    const[CurrentWoodFrame, setWoodFrame] = useState(woodFrames[0]);
    const[showItemDesc, toggleItemDescription] = useState(0);
    const descRef = useRef(null);
    
    const[CopiesLeft, setCopiesLeft] = useState(0);
    const[CopiesAdded, setCopies] = useState(0);
    
    let frameSizes = ['XL', 'L', 'M', 'S', 'XS'];
    let frameDimensions = ['72 x 102 cm', '41 x 51 cm', '25 x 30 cm', '13 x 13 cm', '5 x 5 cm'];
    const[currentFrameSize, setFrameSize] = useState(frameDimensions[0]);
    const[currentWoodSizeSymbol, setSizeSymbol] = useState(frameSizes[0]);

    useEffect(() => {
        const el = document.querySelector('.woodFrame');
        if (el) {
            el.style.backgroundSize = '50%';
        }
    }, [CurrentWoodFrame]);

    useEffect(() => {
        if (descRef.current) {
            descRef.current.style.pointerEvents = showItemDesc == 1 ? 'all' : 'none';
        }
    }, [showItemDesc]);

    useEffect(() => {
        if(ItemData)
            setCopiesLeft(ItemData.stock);
    }, [ItemData])

    if(!ItemData){
        return <p>Loading...</p>;
    }

    function handleCopies(dir){
        if(dir > 0 && CopiesLeft > 0){
            setCopies(CopiesAdded + dir);
            setCopiesLeft(CopiesLeft - dir);
        }

        if(dir < 0 && CopiesAdded > 0){
            setCopies(CopiesAdded + dir);
            setCopiesLeft(CopiesLeft - dir);
        }
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

    function expandDescription(description){
        let shortDescription = '';
        for (let index = 0; index < description.length; index++) {
            if(index <= 190){
                shortDescription += description[index]; 
            }else{
                return(<>{shortDescription + '-'} <h5 onClick={() => toggleItemDescription(1)} style={{ cursor: 'pointer', color: '#1b548d'}}>...Read More</h5></>);
            }
        }
        return(shortDescription);
    }


    async function handleAddToCart() {
        console.log(currentFrameSize);
      if (CopiesAdded < 1) {
        toast.error("Please select at least one copy.");
        return;
      }

      // Decrement stock in the database
      const res = await fetch(`http://localhost:5000/api/items/items/decrement-stock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({ itemId: ItemData._id, quantity: CopiesAdded })
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to update stock.");
        return;
      }

      // Update cart in localStorage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const index = cart.findIndex(item => item._id === ItemData._id);
      const newSymbol = frameSizes[index];
    setSizeSymbol(newSymbol);
    console.log(newSymbol); // This is safe—it’s just a normal variable
      const existing = index !== -1 ? cart[index] : null;
      if (existing) {
        
        existing.quantity += CopiesAdded;
        cart[index].woodframe = CurrentWoodFrame;
        cart[index].framesize = currentFrameSize;
        cart[index].framesymbol = newSymbol;
        console.log(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        cart.push({
          _id: ItemData._id,
          product: ItemData.title,
          price: ItemData.price,
          discount: ItemData.discount, // <-- Make sure this is included!
          quantity: CopiesAdded,
          image: ItemData.imageUrl,
          woodframe: CurrentWoodFrame,
          framesize: currentFrameSize,
          framesymbol: newSymbol,
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Added to cart!");
      navigate("/cart");
    }

    return(
    <>
        <div className="singleItemOverlay">
        
        </div>

        <div className='DescriptionModal' style={{ opacity: showItemDesc}}>
            <div className='DescriptionModalContent' ref={descRef}>
                <div className='DesciptionBlock'>
                    <XIcon onClick={() => toggleItemDescription(0)} size={48} id='xIcon' />
                    <h2 className='domine-Label' style={{ textAlign: 'center', paddingTop: '32px'}}>Description</h2>
                    <div className='DesciptionBlockContent'>
                        <img src={ItemData.imageUrl} style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '16px'}} />
                        <div className='DTextWrapper'>
                            <div className='D-Block-Text'>
                                <h4 className='DescriptionBlockText jost-regular'>{ItemData.description}</h4>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <div className="gridSingleItem">
            <div className="ItemDisplayContainer" style={{gridArea: 'ItemDisplay'}}>
                <div className="ItemDisplay">
                    <div id='imageBlock'>
                        <div className="catagoryText"><h1>{ItemData.tags[0]}</h1></div>
                        <div className='woodFrame' style={{background: `url('${CurrentWoodFrame.image}')`}}>
                            <img src={ItemData.imageUrl} id='itemImage' />
                        </div>
                    </div>
                    
                    <div className="yearDisplay"><h1>{ItemData.year}</h1></div>
                </div>
            </div>
            
            <div className="artInfo" style={{gridArea: 'ItemInfo'}}>
                <div >
                    <div className="ItemTitle">
                        <h1 className='domine-Label' style={{ letterSpacing: '8px'}}>{ItemData.title}</h1>
                        <div style={{ position: 'relative', width: 'fit-content'}}>
                            <h3 className='jost-bold ItemCreaterTitle' style={{ letterSpacing: '4px'}}>{ItemData.creator}</h3>
                            <img className='lineSquareBR' src={lineSquare} alt='lilSquare' style={{ paddingBottom: '5px', width: '17px', height: '17px'}}/>
                        </div>
                        
                    </div>
                    
                    <div className="ItemDetails">
                        {ItemData.discount > 0? (
                            <div style={{ display: 'flex'}}>
                                <h1 style={{ paddingRight: '32px'}} className='jost-light discountedPrice'><strike>R {FormatPrice(ItemData.price)}</strike></h1>
                                <h1 className='jost-light'>R {FormatPrice(ItemData.price * (1 - (ItemData.discount / 100)))}</h1>
                            </div>
                            ) : (<h1 className='jost-light'>R {FormatPrice(ItemData.price)}</h1>)}
                        <Rating userRating={ItemData.rating} canRate={false} />
                        <h5 className='jost-light'>{ItemData.commentsId.length} reviews</h5>
                        
                        <div style={{ position: 'relative', borderBottom: '4px solid', marginBottom: '16px'}}>
                            <div id='quoteUD'>
                                <h4 className='jost-regular'>
                                    {expandDescription(ItemData.description)}
                                </h4>
                            </div>
                            <img className='lineSquareBR' src={lineSquare} alt='lilSquare' style={{ paddingBottom: '5px', width: '17px', height: '17px', bottom: '-15px'}}/>
                        </div>
                        
                    </div>

                    <div className="userSelect">
                        <div className="selectBoxWrapper">
                            <h5>Wood Frame</h5>
                            <div className="selectBox">
                                <span data-text="Oak Wood" onClick={() => setWoodFrame(woodFrames[0])} style={{ '--accent-color': '#FFAA44'}}><div className="woodItem" style={{ background: `url('${WoodFrame}')`, backgroundSize: 'cover', border: CurrentWoodFrame.image == WoodFrame? '2px solid white': '2px solid transparent'}}></div></span>
                                <span data-text="Black Walnut" onClick={() => setWoodFrame(woodFrames[1])} style={{'--accent-color': '#442000'}}><div className="woodItem" style={{ background: `url('${WoodFrame2}')`, backgroundSize: 'cover', border: CurrentWoodFrame.image == WoodFrame2? '2px solid white': '2px solid transparent' }}></div></span>
                                <span data-text="Bloodwood" onClick={() => setWoodFrame(woodFrames[2])} style={{ '--accent-color': '#880000'}}><div className="woodItem" style={{ background: `url('${WoodFrame3}')`, backgroundSize: 'cover', border: CurrentWoodFrame.image == WoodFrame3? '2px solid white': '2px solid transparent' }}></div></span>
                            </div>
                        </div>
                        
                        {/* <div className="selectBoxWrapper">
                            <h5>Orientation</h5>
                            <div className="selectBox">

                            </div>
                        </div> */}

                        <div className="selectBoxWrapper">
                            <h5>Size</h5>
                            <div className="selectBox">
                                <div className="sizeSelection">
                                    {
                                        frameSizes.map((item, index) => {
                                            function compare(x){
                                                if(x == currentFrameSize){
                                                    return 1;
                                                }else{
                                                    return 0;
                                                }
                                            }
                                            return(<span data-text={frameDimensions[index]} style={{ '--accent-color': '#000000'}}><div><h1 onClick={() => setFrameSize(frameDimensions[index])} style={{ '--selected-color': compare(frameDimensions[index]), cursor: 'pointer' }}>{item}</h1></div></span>);
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='jost-regular' style={{ alignSelf: 'flex-end'}}>
                    <div className="checkoutSection" style={{ columnCount: 1}}>
                        <div className="AddItemWrapper">
                            <h4 className='jost-regular' style={{ padding: '8px'}}>{CopiesLeft} Copies Left</h4>
                            <div className="AddItem">
                                <button style={{'--accent-color': '#FF004422'}} onClick={() => handleCopies(-1)}><MinusIcon size={48} color="#FFFFFF" weight="bold" /></button>
                                <span style={{ width: '64px'}}>{CopiesAdded}</span>
                                <button style={{'--accent-color': '#0088FF22'}} onClick={() => handleCopies(1)}><PlusIcon size={48} color="#FFFFFF" weight="bold" /></button>
                            </div>
                        </div>

                        <div className="AddToCart" onClick={handleAddToCart}>
                          <h3 className='jost-regular' style={{ letterSpacing: '4px' }}>
                            Add To Cart
                          </h3>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </>
    )
}

export default SingleItemSelection;