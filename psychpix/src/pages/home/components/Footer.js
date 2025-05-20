import React from "react";
import { Link } from "react-router-dom";
import LongLogo from '../images/LongLogo.png';
import lineSquare from '../images/lil_square2.png';
import { XLogo, LinkedinLogo, InstagramLogo, MessengerLogo } from "@phosphor-icons/react";
import DockIcons from './DockIcons';

function Footer() {
  return (
    <footer className="footer">
        <div className="footerLinks">
            <Link to="/" className="nav-link"><h5>Home</h5></Link>
            <Link to="/discover" className="nav-link"><h5>Discover</h5></Link>
            <Link to="/about" className="nav-link"><h5>About</h5></Link>
            <Link to="/about" className="nav-link"><h5>Contact Us</h5></Link>
            <Link to="/login" className="nav-link"><h5>Login</h5></Link>
            <Link to="/cart" className="nav-link"><h5>Logout</h5></Link>  
        </div>

        <div id="footerLogoContainer">
            <div className="footerInnerContainer">
                <img src={LongLogo} id='footerLogo' />
                <img className='lineSquareBL' src={lineSquare} alt='lilSquare'/>
                <img className='lineSquareBR' src={lineSquare} alt='lilSquare'/>
            </div>
        </div>

        <div className="footerSocialIcons">
          <DockIcons />
        </div>
        
        <div className="citation">
          <img className='lineSquareTL' src={lineSquare} alt='lilSquare'/>
          <img className='lineSquareTR' src={lineSquare} alt='lilSquare'/>
          <h6 className="jost-light text-white m-auto">© 2025 Psychedelic Pixels. All Right Reserved.</h6>
        </div>
        
    </footer>
  );
}

export default Footer;