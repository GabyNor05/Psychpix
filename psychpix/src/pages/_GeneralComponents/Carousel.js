import carotRight from './icons/CarouselArrowRight.png';
import { useRef, useEffect, useState } from 'react';

export default function Carousel({ slides = []}) {
    const scrollRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

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
            console.log("#p");
            return(
                <div id="carouselCarotLeft" onClick={scrollLeft}></div>
            )
        }else{
            return('');
        }
    }

    function RightButton(){
        const container = scrollRef.current;
        if(container == null){
            return(<div id="carouselCarotRight" onClick={scrollRight}></div>);
        }
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if(progress >= maxScrollLeft){
            console.log();
            return('')
        }else{
            return(<div id="carouselCarotRight" onClick={scrollRight}></div>);
        }
    }

    return (
        <>
            <div className='carouselProgressContainer'>
                <div className='carouselProgress'></div>
                <div className='carouselProgress'></div>
                <div className='carouselProgress'></div>
            </div>
            
            <div className="carousel-wrapper">
                {leftButton()}

                <div className="GeneralCarousel carousel-scroll" ref={scrollRef}>
                
                    <div className="flex carousel-track" >
                        {slides.map((src, i) => (
                        <img key={i} src={src} className="h-auto flex-shrink-0 carousel-image" alt={`Slide ${i}`}/>
                        ))}
                    </div>

                </div>
                
                {RightButton()}
            </div>

            
        </>
        
    );
}

