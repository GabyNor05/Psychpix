import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircleIcon, ShoppingCartIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import Logo from "../../logo.png";


function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Focus the input when search bar is expanded
  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSearch]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navlinks text-white fs-5" style={{ display: 'flex', alignItems: 'center', width: '100%'}}>
        <img className="nav-logo" src={Logo} alt="PsychPixels" />
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/discover" className="nav-link">Discover</Link>
        <Link to="/about" className="nav-link" >About</Link>
        <div style={{ marginRight: '50px', marginLeft: 'auto', display: 'flex', gap: '24px', alignItems: 'left' }}>
          {/* Collapsible Search */}
          <div className="nav-search-container" style={{ position: 'relative' }}>
            {showSearch ? (
              <input
                ref={searchRef}
                type="text"
                className="nav-search-input"
                placeholder="Search..."
                onBlur={() => setShowSearch(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // Handle search logic here
                    console.log('Searching for:', e.target.value);
                    setShowSearch(false);
                  }
                }}
              />
            ) : (
              <MagnifyingGlassIcon
                weight="bold"
                size={48}
                className="nav-link-icon"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowSearch(true)}
                title="Search"
              />
            )}
          </div>
          <Link to="/cart" className="nav-link-icon" title="Cart">
            <ShoppingCartIcon size={48} weight="fill"/>
          </Link>
          <Link to="/profile" className="nav-link-icon" title="profile">
            <UserCircleIcon size={48} weight="fill"/>
          </Link>
          <button
            className="nav-link-icon"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "inherit",
              fontSize: 18,
              marginLeft: 12
            }}
            onClick={handleLogout}
            title="Log out"
          >
            Log out
          </button>
        </div>
      </div>    
    </nav>
  );
}

export default Navbar;