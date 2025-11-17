import LongLogo from '../images/LongLogo.png';
import { motion } from "framer-motion";
import bento1Img from '../images/bento/bento1.jpg';
import bento2Img from '../images/bento/bento2.jpg';
import { useState, useRef, useEffect } from 'react';

function BentoGrids() {
    const [username, setuserName] = useState("Guest");

    useEffect(() => {
        try {
            const user = localStorage.getItem("username");
            setuserName(user);
        } catch {
            // keep default
        }
    }, [])

    const gridContainerVariants = {
        hidden: {opacity: 0}, 
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
            },
        },
    }

    const gridSquareVariants = {
        hidden: {opacity: 0},
        show: {opacity: 1},
    }

    function Testimony(){
        return(<div>
            <div>
                <img src='' />
            </div>
        </div>)
    }

  const [firstImageState, setFirstImage] = useState(100);
  const [secondImageState, setSecondImage] = useState(0);
  const animationRef = useRef(null);

  const interpolate = (start, end, setter, duration = 500) => {
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // Clamp to 1
      const value = start + (end - start) * progress;
      setter(value);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  function swapImages() {
    if (firstImageState === 100) {
      interpolate(100, 0, setFirstImage);
      interpolate(0, 100, setSecondImage);
    } else {
      interpolate(0, 100, setFirstImage);
      interpolate(100, 0, setSecondImage);
    }
  }

    return (
        <>
            <div className='HeroSection'>
                <motion.div variants={gridContainerVariants} 
                initial="hidden"
                animate="show"
                className="grid-container jost-regular">
                    <motion.div onClick={() => swapImages()} variants={gridSquareVariants} className="box" id='bentoImage1' style={{gridArea: 'box-1'}}>
                        <img style={{ height: `${firstImageState}%`, objectFit: 'cover'}} src={bento1Img} />
                        <img style={{ height: `${secondImageState}%`, objectFit: 'cover'}} src={bento2Img} />
                    </motion.div>
                    <motion.div variants={gridSquareVariants} className="box" id='bentoImage2' style={{gridArea: 'box-2'}}>
                        <div className='WelcomeUser p-4'>
                            <h3 style={{ paddingLeft: '16px', paddingTop: '32px'}}>Hi {username}</h3>
                            <h3 style={{ paddingTop: '4px', paddingLeft: '16px'}}>Welcome to <span>Psychedelic Pixels</span></h3>
                        </div>
                    </motion.div>
                    <motion.div variants={gridSquareVariants} className="box" id='bentoImage3' style={{gridArea: 'box-3'}}></motion.div>
                    <motion.div variants={gridSquareVariants} className="box" id='bentoImage4' style={{gridArea: 'box-4'}}></motion.div>
                    <motion.div variants={gridSquareVariants} className="box" id='bentoImage5' style={{gridArea: 'box-5'}}>
                        <div id='bentoContent1'><h4 style={{ fontSize: '48px'}}>users</h4><h1 style={{ fontSize: '96px'}}>54K</h1></div>
                    </motion.div>
                    <motion.div variants={gridSquareVariants} className="box" id='bentoImage6' style={{gridArea: 'box-6'}}>{Testimony()}</motion.div>
                    <motion.div variants={gridSquareVariants} className="box" id='bentoImage7' style={{gridArea: 'box-7'}}><img id='bentoLogo' src={LongLogo}/></motion.div>
                </motion.div>
            </div>
        </>
    )
}

export default BentoGrids;