import React from "react";
import "../css/About.css";
import logo from "../../logoBlack.png";
import choose from "./choose.jpg";
import contact from "./contact.jpg";
import { Envelope } from "@phosphor-icons/react"; 
import { InstagramLogo} from "@phosphor-icons/react"; 
import { TiktokLogo } from "@phosphor-icons/react"; 
import { YoutubeLogo } from "@phosphor-icons/react"; 
import { XLogo } from "@phosphor-icons/react"; 

function AboutInfo() {
  return (
    <div className="about-container">
                  <h2>Welcome to Psychedelic Pixels!</h2>
      <div className="about-row">
        <img src={logo} alt="Psychedelic Pixels Logo" className="about-logoMain" />
        <div>
          <h1>About Psychedelic Pixels</h1>
          <p>

            Psychedelic Pixels is an e-commerce platform dedicated to showcasing and selling unconventional, surreal, and imaginative artwork. The website offers a curated selection of unique paintings, sculptures, and other artistic creations that fall outside the mainstream. Its primary purpose is to give art lovers, collectors, and curious minds a place to discover and purchase "weird art" works that are bold, thought-provoking, and unlike anything found in traditional galleries. By connecting eccentric artists with an audience that appreciates the bizarre and the extraordinary, Psychedelic Pixels celebrates creativity in its most unusual forms.
          </p>
        </div>
      </div>

      <div className="about-row reverse">
        <img src={choose} alt="Why Choose Us" className="about-logo" />
        <div>
          <h1>Why Choose Psychedelic Pixels?</h1>
          <p>
            At Psychedelic Pixels, we go beyond the ordinary. We champion bold, unconventional art that sparks curiosity and challenges norms. If you're looking for truly unique pieces that break free from the mainstream, our carefully curated collection connects you with artists who dare to dream differently. Choose us to discover art that’s as original and extraordinary as you are.
          </p>
        </div>
      </div>

      <div className="about-row">
        <img src={contact} alt="Contact Icon" className="about-logo" />
        <div style={{ position: 'relative'}}>
          <div className="jost-regular socialLogos" style={{ display: 'flex', justifyContent: 'space-between'}}>
            <span data-text="Email" style={{ '--accent-color' : '#0099FF'}}>
              <Envelope className="about-icon" size={32} color="#030303" weight="light" /><br />
            </span>
            <span data-text="Instagram" style={{ '--accent-color' : '#CC44CC'}}>
              <InstagramLogo className="about-icon" size={32} color="#030303" weight="light" /><br />
            </span>
            <span data-text="TikTok" style={{ '--accent-color' : '#7744FF'}}>
              <TiktokLogo className="about-icon" size={32} color="#030303" weight="light" /><br />
            </span>
            <span data-text="YouTube" style={{ '--accent-color' : 'red'}}>
              <YoutubeLogo className="about-icon" size={32} color="#030303" weight="light" /><br />
            </span>
            <span data-text="X" style={{ '--accent-color' : 'black'}}>
              <XLogo className="about-icon" size={32} color="#030303" weight="light" /><br />
            </span>
          </div>
          <h1>Contact Us</h1>
        </div>
      </div>
    </div>
  );
}

export default AboutInfo;
