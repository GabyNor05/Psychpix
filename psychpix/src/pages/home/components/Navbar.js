import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircleIcon, ShoppingCartIcon, MagnifyingGlassIcon, CaretDown } from "@phosphor-icons/react";
import Logo from "../../logo.png";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const searchRef = useRef(null);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  // Use state for user and update when sessionStorage changes
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  // Listen for profile updates
  useEffect(() => {
    const handleUserUpdate = () => {
      try {
        setUser(JSON.parse(sessionStorage.getItem("user")));
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("user-profile-updated", handleUserUpdate);
    return () => window.removeEventListener("user-profile-updated", handleUserUpdate);
  }, []);

  // Focus the input when search bar is expanded
  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSearch]);

  // Close profile menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileMenu]);

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
        <div style={{ marginRight: '50px', marginLeft: 'auto', display: 'flex', gap: '24px', alignItems: 'center' }}>
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
          {/* Profile dropdown */}
          <div
            className="nav-profile-dropdown"
            style={{ position: "relative" }}
            ref={profileMenuRef}
          >
            <div
              className="nav-link-icon"
              style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={() => setShowProfileMenu((prev) => !prev)}
              tabIndex={0}
              title="Profile menu"
            >
              {user && user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: 4,
                    border: "2px rgb(39, 39, 39)"
                  }}
                />
              ) : (
                <UserCircleIcon size={40} weight="fill" />
              )}
            </div>
            {showProfileMenu && (
              <div
                className="profile-dropdown-menu"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "110%",
                  background: "#fff",
                  color: "#222",
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  minWidth: 160,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  zIndex: 1000,
                  padding: "8px 0"
                }}
              >
                <button
                  className="dropdown-item"
                  style={{
                    background: "none",
                    border: "none",
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 20px",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/profile");
                  }}
                >
                  My Profile
                </button>
                {user && user.role === "admin" && (
                  <button
                    className="dropdown-item"
                    style={{
                      background: "none",
                      border: "none",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 20px",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/adminForm");
                    }}
                  >
                    Admin Form
                  </button>
                )}
                <button
                  className="dropdown-item"
                  style={{
                    background: "none",
                    border: "none",
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 20px",
                    cursor: "pointer",
                    color: "#d32f2f"
                  }}
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>    
    </nav>
  );
}

export default Navbar;