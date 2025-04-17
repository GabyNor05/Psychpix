import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../logo.png";


function Navbar() {
  return (
    <nav className="navbar">
      <img className = "logo" src={Logo} alt="PyschPixels"/>
      <div className = "nav-links" >
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/discover" className="nav-link">Discover</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/cart" className="nav-link">Cart</Link>     
      </div>
    </nav>
  );
}

export default Navbar;