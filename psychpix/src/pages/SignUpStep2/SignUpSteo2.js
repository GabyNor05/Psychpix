import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Paino from "./components/paino";
import "./css/SignUpStep2.css";

function SignUpStep2() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, email, password } = location.state || {};

  const [step, setStep] = useState(1);
  const [firstKeys, setFirstKeys] = useState([]);
  const [confirmKeys, setConfirmKeys] = useState([]);
  const [error, setError] = useState("");

  const handleFirstSubmit = () => {
    if (firstKeys.length !== 7) {
      setError("Please select exactly 7 keys for your 2-factor authentication.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleConfirmSubmit = async () => {
    if (confirmKeys.length !== 7) {
      setError("Please confirm by selecting exactly 7 keys.");
      return;
    }
    if (firstKeys.join(",") !== confirmKeys.join(",")) {
      setError("The keys you played do not match. Please try again.");
      setConfirmKeys([]);
      return;
    }
    setError("");
    // Submit to backend
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          twoFactor: firstKeys
        })
      });
      if (response.ok) {
        alert("Sign up complete!");
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