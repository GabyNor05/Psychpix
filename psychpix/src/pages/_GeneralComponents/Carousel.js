import { useRef, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import lineSquare from './icons/lilsquare.png';
import './Carousel.css';

export default function Carousel({ slides = [], Title}) {
    const scrollRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
    };

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
    };

    function setScroll(amount){
        let scrollAmt = amount;
        const container = scrollRef.current;
        container.scrollBy({ left: scrollAmt - progress, behavior: 'smooth'});
    }

    useEffect(() => {
        const container = scrollRef.current;
    
        const handleScroll = () => {
          //const maxScrollLeft = container.scrollWidth - container.clientWidth;
          const currentScroll = container.scrollLeft;
          //const ratio = currentScroll / maxScrollLeft;
          setProgress(currentScroll);
        };
    
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
      }, [scrollRef]);

    function leftButton(){
        if(progress > 0){
            return(
                <div className='carouselCarot' id="carouselCarotLeft" onClick={scrollLeft}></div>
            )
        }else{
            return(<div className='carouselCarot' id="Inactive" onClick={scrollRight}></div>);
        }
    }

    function RightButton(){
        const container = scrollRef.current;
        if(container == null){
            return(<div className='carouselCarot' id="carouselCarotRight" onClick={scrollRight}></div>);
        }
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if(progress + 10 >= maxScrollLeft){
            return(<div className='carouselCarot' id="Inactive" onClick={scrollRight}></div>)
        }else{
            return(<div className='carouselCarot' id="carouselCarotRight" onClick={scrollRight}></div>);
        }
    }

    const progressBits = () => {
        const container = scrollRef.current;
        if(container == null){
            return(<div className='carouselProgress'></div>);
        }
        const excessScroll = container.scrollWidth - container.clientWidth;
        const increments = excessScroll / 300;
        let currentProgress;

        if(progress + 10 < excessScroll){
            currentProgress = Math.floor(progress / 300);
        }else{
            currentProgress = Math.floor(increments) + 1;
        }
        
        console.log(currentProgress);

        if(increments <= 1){
            return(<div className='carouselProgress'></div>);
        }


        let progressBar = [];

        for (let x = 0; x < increments + 1; x++) {
            if(x != currentProgress){
                progressBar.push(<div key={x} className='carouselProgress' onClick={() => setScroll(x * (excessScroll / increments))}></div>);
            }else{
                progressBar.push(<div key={x} className='carouselProgress' id='currentProg'></div>);
            }
        }

        return(
            progressBar
        )
    }

    return (
        <>
            <div className='carouselTitle domine-Label pb-3 me-2s'>
                <h1 className='fw-bold'>{Title}</h1>
                <img className='lineSquareBR' src={lineSquare} alt='lilSquare'/>
            </div>

            <div className='carouselProgressContainer'>
                <div className='carouselProgressWrapper'>
                    {progressBits()}
                </div>
            </div>

            <div className="carousel-wrapper">
                {leftButton()}

                <div className="GeneralCarousel carousel-scroll" ref={scrollRef}>
                
                    <div className="flex carousel-track">
                        {slides.map((src, i) => (
                        <Link to="/singleItem" className="carouselLink">
                            <img key={i} src={src} className="carousel-image" alt={`Slide ${i}`}/>
                        </Link> 
                        ))}
                    </div>

                </div>
                
                {RightButton()}
            </div>
        </>
        
    );
}

