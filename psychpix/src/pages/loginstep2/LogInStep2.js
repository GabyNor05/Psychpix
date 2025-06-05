import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Paino from "./components/paino";
import "./css/LogInStep2.css";

// LogInStep2 handles the 2-factor authentication step after username/password login
function LogInStep2() {
  // Get navigation and location hooks from React Router
  const location = useLocation();
  const navigate = useNavigate();
  // Retrieve username and password from previous login step
  const { username, password } = location.state || {};

  // State to store the 7 piano keys the user plays for 2FA
  const [factorKeys, setFactorKeys] = useState([]);
  // State for displaying error messages
  const [error, setError] = useState("");

  // Handles submission of the 2FA piano keys
  const handleSubmit = async () => {
    // Require exactly 7 keys for 2FA
    if (factorKeys.length !== 7) {
      setError("Please play exactly 7 keys for your 2-factor authentication.");
      return;
    }
    setError("");
    // Send username, password, and 2-factor keys to backend for login
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          twoFactor: factorKeys
        })
      });
      if (response.ok) {
        // Login successful, show welcome and go to home page
        const data = await response.json();
        // Save user info in sessionStorage
        sessionStorage.setItem("user", JSON.stringify({
          username: data.user.username,
          role: data.user.role,
          email: data.user.email,
          id: data.user.id || data.user._id, // <-- Always store as id
          profilePic: data.user.profilePic || ""
        }));
        localStorage.setItem("token", data.token);
        alert("Login successful! Welcome, " + data.user.username);
        navigate("/"); // Go to home page
      } else {
        // Show error from backend
        const data = await response.json();
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("Login failed: " + err.message);
    }
  };

  return (
    <div>
      {/* Title for 2FA step */}
      <h2 style={{textAlign: "center"}}>2-Factor Authentication: Play your 7 keys</h2>
      {/* Show error if present */}
      {error && <div style={{color: "red", textAlign: "center"}}>{error}</div>}
      {/* Render the Paino component for 2FA input */}
      <Paino
        factorKeys={factorKeys}
        setFactorKeys={setFactorKeys}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default LogInStep2;