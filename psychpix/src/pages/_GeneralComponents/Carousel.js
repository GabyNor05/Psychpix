import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lineSquare from './icons/lilsquare.png';
import './Carousel.css';

export default function Carousel({ slides = [], Title}) {
    const scrollRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' });
    };

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -600, behavior: 'smooth' });
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

    const [progressKey, setProgressKey] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    // In the effect:
    useEffect(() => {
        if (imagesLoaded === slides.length && slides.length > 0) {
            setProgressKey(k => k + 1); // force re-evaluation
        }
    }, [imagesLoaded, slides.length]);

    const MAX_INDICATORS = 6;

    const progressBits = () => {
        const container = scrollRef.current;
        if (container == null) {
            return <div className='carouselProgress'></div>;
        }

        const excessScroll = container.scrollWidth - container.clientWidth;
        if (excessScroll <= 0) return null;

        let increments = Math.floor(excessScroll / 500) + 1;

        // Cap to MAX_INDICATORS
        let indicatorCount = Math.min(increments, MAX_INDICATORS);
        let stepSize = excessScroll / indicatorCount;

        let currentProgress = Math.floor(progress / stepSize);

        let progressBar = [];

        for (let i = 0; i < indicatorCount; i++) {
            const isActive = i === currentProgress;
            progressBar.push(
                <div
                    key={i}
                    className='carouselProgress'
                    id={isActive ? 'currentProg' : undefined}
                    onClick={() => !isActive && setScroll(i * stepSize)}
                />
            );
        }

        return progressBar;
    };
    
    const navigate = useNavigate();

    const handleSelect = (item) => {
        navigate(`/singleItem/${item}`, { state: { selectedItem: item } });
        window.location.reload();
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [sortHigh, setSortMethod] = useState(false);
    const menuRef = useRef();

    // Close menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function sortByPrice(array, order = 'asc') {
        if (!Array.isArray(array)) return [];

        return array.slice().sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/,/g, ''));
            const priceB = parseFloat(b.price.replace(/,/g, ''));

            if (isNaN(priceA) || isNaN(priceB)) return 0;

            return order === 'asc' ? priceA - priceB : priceB - priceA;
        });
    }

    const [sortedSlides, sortPrice] = useState(slides);

    useEffect(() => {
        if(sortHigh){
            sortPrice(sortByPrice(sortedSlides, 'asc'));
        }else{
            sortPrice(sortByPrice(sortedSlides, 'desc'));
        }
    }, [sortHigh])

    return (
        <div style={{ display: slides.length == 0? 'none' : 'block'}}>
            <div className='carouselTitle domine-Label pb-3 me-2s'>
                <h1 className='fw-bold'>{Title}</h1>
                <img className='lineSquareBR' src={lineSquare} alt='lilSquare'/>
            </div>

            <div className='carouselProgressContainer'>
                <div className='carouselProgressWrapper' key={progressKey}>
                    {progressBits()}
                </div>
            </div>

            <div className="carousel-wrapper">
                {leftButton()}

                <div className="GeneralCarousel carousel-scroll" ref={scrollRef}>
                
                    <div className="carousel-track">
                        {slides.map((item, i) => (
                            <div key={i}>
                                <img src={item.imageUrl || item} className="carousel-image" alt={`Slide ${i}`} style={{ height: '350px'}} onLoad={() => setImagesLoaded(prev => prev + 1)} onClick={() => handleSelect(item.id)}/>
                                <h5 className='jost-regular'>{item.name}</h5>
                                <h4 className='jost-regular'>R{item.price}</h4>
                            </div>
                        ))}
                    </div>

                </div>
                
                {RightButton()}
            </div>
        </div>
        
    );
}

