import LongLogo from '../images/LongLogo.png';
function BentoGrids()
{
    return(
    <>
        <div className='HeroSection'>
            <div className="grid-container">
                <div className="box" id='bentoImage1' style={{gridArea: 'box-1'}}></div>
                <div className="box" id='bentoImage2' style={{gridArea: 'box-2'}}><div className='WelcomeUser'><h4>Hi Username</h4> <h4>Welcome to <span>Psychedelic Pixels</span></h4></div></div>
                <div className="box" id='bentoImage3' style={{gridArea: 'box-3'}}></div>
                <div className="box" id='bentoImage4' style={{gridArea: 'box-4'}}></div>
                <div className="box" id='bentoImage5' style={{gridArea: 'box-5'}}><div id='bentoContent1'><h4>users</h4><h1>54K</h1></div></div>
                <div className="box" id='bentoImage6' style={{gridArea: 'box-6'}}></div>
                <div className="box" id='bentoImage7' style={{gridArea: 'box-7'}}><img id='bentoLogo' src={LongLogo}/></div>
            </div>
        </div>
    </>
    )
}

export default BentoGrids;