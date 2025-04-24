import React from "react";
import { Link } from "react-router-dom";
import LongLogo from '../images/LongLogo.png';
import lineSquare from '../images/lil_square2.png';
import { XLogo, LinkedinLogo, InstagramLogo, MessengerLogo } from "@phosphor-icons/react";

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
                <img className='lineSquareTL' src={lineSquare} alt='lilSquare'/>
                <img className='lineSquareTR' src={lineSquare} alt='lilSquare'/>
                <img className='lineSquareBL' src={lineSquare} alt='lilSquare'/>
                <img className='lineSquareBR' src={lineSquare} alt='lilSquare'/>
            </div>
        </div>

        <div className="footerSocialIcons">
          <XLogo size={48} weight="light" />
          <LinkedinLogo size={48} weight="light" />
          <InstagramLogo size={48} weight="light" />
          <MessengerLogo size={48} weight="light" />
        </div>
        
    </footer>
  );
}

export default Footer;