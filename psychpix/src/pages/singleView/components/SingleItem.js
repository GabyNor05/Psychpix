import lineSquare from '../../_GeneralComponents/icons/lilsquare.png';
import { XIcon } from '@phosphor-icons/react';
import { GetItemsData } from '../../../ItemsData';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import WoodFrame from '../images/woodFrame.jpg';
import WoodFrame2 from '../images/WoodFrame5.jpeg';
import WoodFrame3 from '../images/WoodFrame8.jpeg';

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

function SingleItemSelection()
{
    const location = useLocation();
    const { selectedItem } = location.state || {};

    const [ItemData, setItemData] = useState(null);

    const[CurrentWoodFrame, setWoodFrame] = useState(WoodFrame);

    const[currentFrameSize, setFrameSize] = useState(0);

    const[showItemDesc, toggleItemDescription] = useState(0);
    const descRef = useRef(null);

    const[CopiesLeft, setCopiesLeft] = useState(0);
    const[CopiesAdded, setCopies] = useState(0);

    let frameSizes = ['XL', 'L', 'M', 'S', 'XS'];
    let frameDimensions = ['72 x 102 cm', '41 x 51 cm', '25 x 30 cm', '13 x 13 cm', '5 x 5 cm'];

    useEffect(() => {
        GetSelectedItem(selectedItem).then(data => setItemData(data)); 
    }, []);

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
            if(index <= 195){
                shortDescription += description[index]; 
            }else{
                return(<>{shortDescription + '-'} <h5 onClick={() => toggleItemDescription(1)} style={{ cursor: 'pointer', color: '#1b548d'}}>...Read More</h5></>);
            }
        }
        return(shortDescription);
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
                        <h4 className='DescriptionBlockText'>{ItemData.description}</h4>
                    </div>
                </div>
            </div>
        </div>
        <div className="gridSingleItem">
            <div className="ItemDisplayContainer" style={{gridArea: 'ItemDisplay'}}>
                <div className="ItemDisplay">
                    <div id='imageBlock'>
                        <div className="catagoryText"><h1>{ItemData.tags[0]}</h1></div>
                        <div className='woodFrame' style={{background: `url('${CurrentWoodFrame}')`}}>
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
                        <h5 className='jost-light'>{ItemData.commentsId.length} reviews</h5>
                        
                        <div style={{ position: 'relative', borderBottom: '4px solid', marginBottom: '16px'}}>
                            <div id='quoteUD'>
                                <h4>
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
                                <span data-text="Oak Wood" onClick={() => setWoodFrame(WoodFrame)} style={{ '--accent-color': '#FFAA44'}}><div className="woodItem" style={{ background: `url('${WoodFrame}')`, backgroundSize: 'cover', border: CurrentWoodFrame == WoodFrame? '2px solid white': '2px solid transparent'}}></div></span>
                                <span data-text="Black Walnut" onClick={() => setWoodFrame(WoodFrame2)} style={{'--accent-color': '#442000'}}><div className="woodItem" style={{ background: `url('${WoodFrame2}')`, backgroundSize: 'cover', border: CurrentWoodFrame == WoodFrame2? '2px solid white': '2px solid transparent' }}></div></span>
                                <span data-text="Bloodwood" onClick={() => setWoodFrame(WoodFrame3)} style={{ '--accent-color': '#880000'}}><div className="woodItem" style={{ background: `url('${WoodFrame3}')`, backgroundSize: 'cover', border: CurrentWoodFrame == WoodFrame3? '2px solid white': '2px solid transparent' }}></div></span>
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
                                            return(<span data-text={frameDimensions[index]} style={{ '--accent-color': '#000000'}}><div><h1 onClick={() => setFrameSize(index)} style={{ '--selected-color': compare(index), cursor: 'pointer' }}>{item}</h1></div></span>);
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ alignSelf: 'flex-end'}}>
                    <div className="checkoutSection">
                        <div className="AddItemWrapper">
                            <h3 style={{ padding: '8px'}}>{CopiesLeft} Copies Left</h3>
                            <div className="AddItem">
                                <button onClick={() => handleCopies(-1)}>-</button>
                                <span>{CopiesAdded}</span>
                                <button onClick={() => handleCopies(1)}>+</button>
                            </div>
                        </div>

                        <div className="AddToCart">
                            <h3 className='jost-regular' style={{ letterSpacing: '4px'}}>Add To Cart</h3>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </>
    )
}

export default SingleItemSelection;