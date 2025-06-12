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
        <div className='ArtWeekWrapper' style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>

        <div
            style={{
                backgroundImage: `url(${ItemData.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1
            }}
        />

            <div style={{ position: 'relative', zIndex: 1, padding: '16px' }}>
                <div
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.66)', // Adjust alpha for brightness
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 0,
                        borderRadius: '12px',
                        backdropFilter: 'blur(12px)'
                    }}
                />

                <div style={{ position: 'relative', zIndex: 1}}>
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
                
            </div>
            
        </div>
    );
}

export default TopArt;