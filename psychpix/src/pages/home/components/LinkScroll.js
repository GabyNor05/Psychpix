import lineSquare from '../images/lil_square.png';

function LinkScroll()
{
    return(
    <>
    <div className="linkScroll">
        <img className='lineSquareTL' src={lineSquare} alt='lilSquare'/>
        <img className='lineSquareTR' src={lineSquare} alt='lilSquare'/>
        <img className='lineSquareBL' src={lineSquare} alt='lilSquare'/>
        <img className='lineSquareBR' src={lineSquare} alt='lilSquare'/>
        <div><h4>#weird</h4></div>
        <div><h4>#psychedelic</h4></div>
        <div><h4>#trippy</h4></div>
        <div><h4>#luxury</h4></div>
        <div><h4>#random</h4></div>
        <div><h4>#galaxy</h4></div>
    </div>
    </>
    )
}

export default LinkScroll;