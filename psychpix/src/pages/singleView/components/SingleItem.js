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

        <div className='DescriptionModal' style={{ opacity: showItemDesc}}>
            <div className='DescriptionModalContent' ref={descRef}>
                <div className='DesciptionBlock'>
                    <XIcon onClick={() => toggleItemDescription(0)} size={48} id='xIcon' />
                    <h2 className='domine-Label' style={{ textAlign: 'center', paddingTop: '32px'}}>Description</h2>
                    <div className='DesciptionBlockContent'>
                        <img src={ItemData.imageUrl} style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '16px'}} />
                        <div className='DTextWrapper'>
                            <div className='D-Block-Text'>
                                <h4 className='DescriptionBlockText'>{ItemData.description}</h4>
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
                        <h1>R {ItemData.price}</h1>
                        <h1>69 reviews</h1>
                        <h4>{ItemData.description}</h4>
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
                    <div className="checkoutSection" style={{ columnCount: 1}}>
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