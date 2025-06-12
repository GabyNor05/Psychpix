import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import lineSquare from '../../home/images/lil_square.png';

function TopArt() {
    const [ItemData, setItemData] = useState(null);
    const topArtID = '684a11d88c6d1bb7bd45b1c6';
    async function GetSelectedItem(ItemID){
            try {
            const response = await fetch(`http://localhost:5000/api/items/${ItemID}`);

            if (response.ok) {
                const item = await response.json();
                console.log('Item data:', item);
                return item;
            } else {
                console.log(ItemID);
                toast.error('Item not found');
            }
            } catch (err) {
            console.error('Fetch failed:', err);
        }
    }

    GetSelectedItem(topArtID).then(item => setItemData(item));
    if(!ItemData){
        return(<>...Loading</>);
    }

    console.log(ItemData);
    
    return (
        <div className='ArtWeekWrapper'>
            <h3 className='domine-Label' style={{ paddingBottom: '32px'}}>Art of The Week</h3>
            <div className='ArtWeek jost-regular'>
                <img style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: '12px'}} src={ItemData.imageUrl} />
                <div style={{ width: '70%'}}>
                    <h1 className='domine-Label'>{ItemData.title}</h1>
                    <div style={{ borderBottom: '2px solid black', width: 'fit-content', paddingRight: '32px', position: 'relative'}}>
                        <h3>{ItemData.creator}</h3>
                        <img className="lineSquareBR" src={lineSquare} />
                    </div>
                    
                    
                    <h4 style={{ paddingTop: '32px'}}>{ItemData.description}</h4>
                </div>
            </div>
        </div>
    );
}

export default TopArt;