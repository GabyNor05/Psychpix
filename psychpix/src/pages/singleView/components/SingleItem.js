
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
            </div>
        </div>
    </>
    )
}

export default SingleItemSelection;