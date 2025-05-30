import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Paino from "./components/paino";
import "./css/SignUpStep2.css";

// SignUpStep2 handles the 2-factor authentication setup during signup
function SignUpStep2() {
  // Get navigation and location hooks from React Router
  const location = useLocation();
  const navigate = useNavigate();
  // Retrieve username, email, and password from previous signup step
  const { username, email, password, role, adminToken } = location.state || {};

  // State to track which step the user is on (1: create, 2: confirm)
  const [step, setStep] = useState(1);
  // State to store the first set of 7 keys the user plays
  const [firstKeys, setFirstKeys] = useState([]);
  // State to store the confirmation set of 7 keys
  const [confirmKeys, setConfirmKeys] = useState([]);
  // State for displaying error messages
  const [error, setError] = useState("");

  // Handles submission of the first set of keys
  const handleFirstSubmit = () => {
    // Require exactly 7 keys for 2FA
    if (firstKeys.length !== 7) {
      setError("Please select exactly 7 keys for your 2-factor authentication.");
      return;
    }
    setError("");
    setStep(2); // Move to confirmation step
  };

  // Handles submission of the confirmation set of keys
  const handleConfirmSubmit = async () => {
    // Require exactly 7 keys for confirmation
    if (confirmKeys.length !== 7) {
      setError("Please confirm by selecting exactly 7 keys.");
      return;
    }
    // Check if the confirmation keys match the first set
    if (firstKeys.join(",") !== confirmKeys.join(",")) {
      setError("The keys you played do not match. Please try again.");
      setConfirmKeys([]);
      return;
    }
    setError("");
    // Submit registration data (including 2FA keys) to backend
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          role,
          adminToken,
          twoFactor: firstKeys
        })
      });
      if (response.ok) {
        alert("Sign up complete!");
        console.log(response);
        navigate("/"); // Go to home page after successful signup
      } else {
        const data = await response.json();
        alert("Sign up failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      alert("Sign up failed: " + err.message);
    }
  };

  return (
    <div>
      {/* Step 1: User creates their 2FA piano key sequence */}
      {step === 1 ? (
        <div>
          <h2 style={{textAlign: "center"}}>Step 1: Play your 7 piano keys</h2>
          {error && <div style={{color: "red", textAlign: "center"}}>{error}</div>}
          <Paino
            factorKeys={firstKeys}
            setFactorKeys={setFirstKeys}
            onSubmit={handleFirstSubmit}
          />
        </div>
      ) : (
        // Step 2: User confirms their 2FA piano key sequence
        <div>
          <h2 style={{textAlign: "center"}}>Step 2: Confirm your 7 piano keys</h2>
          {error && <div style={{color: "red", textAlign: "center"}}>{error}</div>}
          <Paino
            factorKeys={confirmKeys}
            setFactorKeys={setConfirmKeys}
            onSubmit={handleConfirmSubmit}
          />
        </div>
      )}
    </div>
  );
}

export default SignUpStep2;