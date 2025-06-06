import LongLogo from '../images/LongLogo.png';
import { motion } from "framer-motion";

function BentoGrids() {
    // Get user from sessionStorage
    let username = "Log in";
    try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user && user.username) {
            username = user.username;
        }
    } catch {
        // keep default
    }

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

    return (
        <>
            <div className='HeroSection'>
                <motion.div variants={gridContainerVariants} 
                initial="hidden"
                animate="show"
                className="grid-container">
                    <motion.div variants={gridSquareVariants} className="box" id='bentoImage1' style={{gridArea: 'box-1'}}></motion.div>
                    <motion.div variants={gridSquareVariants} className="box" id='bentoImage2' style={{gridArea: 'box-2'}}>
                        <div className='WelcomeUser'>
                            <h4>Hi {username}</h4>
                            <h4>Welcome to <span>Psychedelic Pixels</span></h4>
                        </div>
                    </motion.div>
                    <motion.div variants={gridSquareVariants} className="box" id='bentoImage3' style={{gridArea: 'box-3'}}></motion.div>
                    <motion.div variants={gridSquareVariants} className="box" id='bentoImage4' style={{gridArea: 'box-4'}}></motion.div>
                    <motion.div variants={gridSquareVariants} className="box" id='bentoImage5' style={{gridArea: 'box-5'}}>
                        <div id='bentoContent1'><h4>users</h4><h1>54K</h1></div>
                    </motion.div>
                    <motion.div variants={gridSquareVariants} className="box" id='bentoImage6' style={{gridArea: 'box-6'}}></motion.div>
                    <motion.div variants={gridSquareVariants} className="box" id='bentoImage7' style={{gridArea: 'box-7'}}><img id='bentoLogo' src={LongLogo}/></motion.div>
                </motion.div>
            </div>
        </>
    )
}

export default BentoGrids;