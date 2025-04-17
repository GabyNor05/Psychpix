import React from "react";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="navbar">
      <img className = "logo" src={logo} alt="Disney+"  />
      <div className = "nav-link" >
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/discover" className="nav-link">Discovr</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
      
      </div>
    </nav>
  );
}

export default Navbar;