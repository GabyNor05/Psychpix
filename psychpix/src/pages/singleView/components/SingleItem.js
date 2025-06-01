import dummyItem from '../../home/images/bento/bento2.jpg';
import { GetItemsData } from '../../../ItemsData';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

    useEffect(() => {
        GetSelectedItem(selectedItem).then(data => setItemData(data));
    }, [])

    if(!ItemData){
        return <p>Loading...</p>;
    }

    console.log(ItemData);
    return(
    <>
        <div className="singleItemOverlay">
        
        </div>
        <div className="gridSingleItem">

            <div className="ItemDisplayContainer" style={{gridArea: 'ItemDisplay'}}>
                <div className="ItemDisplay">
                    <div id='imageBlock'>
                        <div className="catagoryText"><h1>{ItemData.tags[0]}</h1></div>
                        <img src={ItemData.imageUrl} id='itemImage' />
                    </div>
                    
                    <div className="yearDisplay"><h1>{ItemData.year}</h1></div>
                </div>
            </div>
            
            <div className="artInfo" style={{gridArea: 'ItemInfo'}}>
                <div >
                    <div className="ItemTitle">
                        <h1>{ItemData.title}</h1>
                        <h1>{ItemData.creator}</h1>
                    </div>
                    
                    <div className="ItemDetails">
<<<<<<< HEAD
                        {ItemData.discount > 0? (
                            <div style={{ display: 'flex'}}>
                                <h1 style={{ paddingRight: '32px'}} className='jost-light discountedPrice'><strike>R {FormatPrice(ItemData.price)}</strike></h1>
                                <h1 className='jost-light'>R {FormatPrice(ItemData.price * (1 - (ItemData.discount / 100)))}</h1>
                            </div>
                            ) : (<h1 className='jost-light'>R {FormatPrice(ItemData.price)}</h1>)}
                        <h5 className='jost-light'>{ItemData.commentsId.length} reviews</h5>
                        
                        <div id='quoteUD'>
                            <h4>
                                {expandDescription(ItemData.description)}
                            </h4>
                        </div>
=======
                        <h1>R {ItemData.price}</h1>
                        <h1>69 reviews</h1>
                        <h4>{ItemData.description}</h4>
>>>>>>> parent of a71beb4 (Item Page touch ups)
                    </div>

                    <div className="userSelect">
                        <div className="selectBoxWrapper">
                            <h5>Wood Frame</h5>
                            <div className="selectBox">
                                <div className="woodItem" />
                                <div className="woodItem" />
                                <div className="woodItem" />
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
                                    <h1>XL</h1>
                                    <h1 id="SelectedSize">L</h1>
                                    <h1>M</h1>
                                    <h1>S</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ alignSelf: 'flex-end'}}>
                    <div className="checkoutSection">
                        <div className="AddItemWrapper">
                            <h4 style={{ padding: '8px'}}>{ItemData.stock} Copies Left</h4>
                            <div className="AddItem">
                                <span>-</span>
                                <span>0</span>
                                <span>+</span>
                            </div>
                        </div>

                        <div className="AddToCart">
                            <h1>Add To Cart</h1>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </>
    )
}

export default SingleItemSelection;