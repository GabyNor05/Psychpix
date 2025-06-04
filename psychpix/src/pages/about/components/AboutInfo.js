import React from "react";
import "../css/About.css";
import logo from "../../logo.png";
import choose from "./profile4.webp"; // Assuming you have a logo image
import contact from "./profile7.webp"; // Assuming you have a contact image

function AboutInfo() {
  return (
    <div className="about-container">
      <div className="about-row">
        <img src={logo} alt="Psychedelic Pixels Logo" className="about-logo" />
        <div>
          <h1>About Psychedelic Pixels</h1>
          <p>
            Welcome to Psychedelic Pixels!<br />
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
        <div>
          <h1>Our Location & Contact</h1>
          <p>
            ✉️ Email us at: <a href="mailto:contact@psychedelicpixels.com">contact@psychedelicpixels.com</a><br />
            📱 Follow us on Instagram: <a href="https://instagram.com/psychedelicpixels">@psychedelicpixels</a><br />
            We're always here to connect and collaborate.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutInfo;
