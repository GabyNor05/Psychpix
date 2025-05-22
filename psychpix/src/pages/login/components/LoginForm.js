import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import LongLogo from "../../../pages/LongLogo.png";

const LoginForm = ({ onSignUp, isLogin, setIsLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      // Sign Up: send data to backend
      try {
        const response = await fetch("http://localhost:5000/api/users/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
          })
        });
        if (response.ok) {
          alert("Sign up successful!");
          // Redirect to SignUpStep2 page after successful signup
          navigate("/signupstep2");
        } else {
          const data = await response.json();
          alert("Sign up failed: " + (data.message || "Unknown error"));
        }
      } catch (err) {
        alert("Sign up failed: " + err.message);
      }
    } else {
      // Log In: check credentials
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          })
        });
        if (response.ok) {
          const data = await response.json();
          alert("Login successful! Welcome, " + data.user.username);
          // Optionally: navigate or set user state here
        } else {
          const data = await response.json();
          alert("Login failed: " + (data.message || "Unknown error"));
        }
      } catch (err) {
        alert("Login failed: " + err.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="auth-box">
        <div className="auth-left">
          <h2 style={{ fontSize: '28px', marginBottom: '20px', fontWeight: 'bold' }}>
            {isLogin ? "Log in" : "Sign up"}
          </h2>
          <div className="auth-tabs">
            <button
              className={`tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              sign up
            </button>
            <button
              className={`tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              log in
            </button>
          </div>

          <div className="auth-content">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Username</label>
                <input 
                  type="text" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              {!isLogin && (
                <div className="input-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              )}
              <div className="input-group">
                <label>Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <button type="submit" className="auth-button">
                {isLogin ? "Log In" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
        <div className="auth-right"></div>
      </div>
    </div>
  );
};

export default LoginForm;