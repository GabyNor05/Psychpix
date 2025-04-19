import React from "react";
import './SingleView.css';

function SingleView() {
  return (
   <>
      <div className="singleItemOverlay">
        
      </div>
      <div className="gridSingleItem">
          <div className="singleItemFixed" style={{gridArea: 'ItemDisplay'}}>
            <div className="yearDisplay">
              <h1>Sculpture</h1>
            </div>
            <div className="ItemDisplay">
            
            </div>

            <div className="yearDisplay">
              <h1>2016</h1>
            </div>
          </div>
          
          <div className="ItemInfo" style={{gridArea: 'ItemInfo'}}>
            <div>
              <h1>The Art Title 101</h1>
              <h3>John Pork</h3>
            </div>

            <div>
              <h1>R 24,000</h1>
              <h5>69 Reviews</h5>
            </div> 

            <div className="ItemUserEdits">
              <div className="UserEdit" id="woodEdit">
                <div id="exampleWood">

                </div>
                <div id="exampleWood">

                </div>
                <div className='WoodSelected' id="exampleWood">

                </div>
              </div>
              
              <div className="UserEdit">

              </div>

              <div className="UserEdit">

              </div>
            </div>
          </div> 

          
        </div>
   </>
  );
}

export default SingleView;