import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Paino from "./components/paino";
import "./css/SignUpStep2.css";

// SignUpStep2 handles the 2-factor authentication setup during signup
function SignUpStep2() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, email, password, role, adminToken } = location.state || {};

  const [notes, setNotes] = useState([]);
  const [factorKeys, setFactorKeys] = useState([]);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  // Send notes to email on component mount (only once)
  useEffect(() => {
    if (sent) return;
    console.log("Sending signup 2FA notes");
    async function sendNotes() {
      const res = await fetch("http://localhost:5000/api/users/send-2fa-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setNotes(data.notes);
        setSent(true);
      } else {
        setError(data.message || "Failed to send notes to email.");
      }
    }
    sendNotes();
  }, [email, sent]);

  const handleSubmit = async () => {
    if (factorKeys.length !== 7) {
      setError("Please play all 7 notes.");
      return;
    }
    if (factorKeys.join(",") !== notes.join(",")) {
      setError("The notes you played do not match the email notes.");
      setFactorKeys([]);
      return;
    }
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          role,
          adminToken
        })
      });
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("user", JSON.stringify({
          username: data.user.username,
          role: data.user.role,
          email: data.user.email,
          id: data.user.id || data.user._id,
          profilePic: data.user.profilePic || ""
        }));
        localStorage.setItem("token", data.token);
        alert("Signup successful! Welcome, " + data.user.username);
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.message || "Signup failed.");
      }
    } catch (err) {
      setError("Signup failed: " + err.message);
    }
  };

  return (
    <div>
      <h2 style={{textAlign: "center"}}>Step 2: Play the 7 notes sent to your email</h2>
      {error && <div style={{color: "red", textAlign: "center"}}>{error}</div>}
      <Paino
        factorKeys={factorKeys}
        setFactorKeys={setFactorKeys}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default SignUpStep2;