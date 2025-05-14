
function SingleItemSelection()
{
    return(
    <>
        <div className="singleItemOverlay">
        
        </div>
        <div className="gridSingleItem">
            <div className="ItemDisplayContainer" style={{gridArea: 'ItemDisplay'}}>
                <div className="ItemDisplay">
                    <div className="yearDisplay"><h1>2016</h1></div>
                    <div className="catagoryText"><h1>Illustration</h1></div>
                </div>
            </div>
            
            <div style={{gridArea: 'ItemInfo'}}>
                <div className="ItemTitle">
                    <h1>The Art Title 101</h1>
                    <h1>John Pork</h1>
                </div>
                
                <div className="ItemDetails">
                    <h1>R 24,000</h1>
                    <h1>69 reviews</h1>
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
                    
                    <div className="selectBoxWrapper">
                        <h5>Orientation</h5>
                        <div className="selectBox">

                        </div>
                    </div>

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

                <div className="checkoutSection">
                    
                    <div className="AddItemWrapper">
                        <h4>1 Copy Left</h4>
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
    </>
    )
}

export default SingleItemSelection;