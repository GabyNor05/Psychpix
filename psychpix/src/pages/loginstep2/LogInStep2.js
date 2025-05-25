import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Paino from "./components/paino";
import "./css/LogInStep2.css";

function LogInStep2() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, password } = location.state || {};

  const [factorKeys, setFactorKeys] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
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
        const data = await response.json();
        alert("Login successful! Welcome, " + data.user.username);
        navigate("/"); // Go to home page
      } else {
        const data = await response.json();
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("Login failed: " + err.message);
    }
  };

  return (
    <div>
      <h2 style={{textAlign: "center"}}>2-Factor Authentication: Play your 7 keys</h2>
      {error && <div style={{color: "red", textAlign: "center"}}>{error}</div>}
      <Paino
        factorKeys={factorKeys}
        setFactorKeys={setFactorKeys}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default LogInStep2;