import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

// LoginForm component handles both login and signup forms
const LoginForm = ({ isLogin, setIsLogin }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState("");

  // React Router navigation hook
  const navigate = useNavigate();

  // Handles input changes for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handles form submission for login or signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      // Sign Up: check if passwords match, then go to signupstep2
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      const { username, email, password } = formData;
      // Pass form data to signup step 2 (do NOT call /register here)
      const signupData = {
        username,
        email,
        password,
        role: isAdmin ? 'admin' : 'customer',
        adminToken: isAdmin ? adminToken : undefined
      };
      // Sign Up: go to signupstep2
      navigate("/signupstep2", { state: signupData });
    } else {
      // Login: send username & password to backend for verification (step 1)
      try {
        const response = await fetch("http://localhost:5000/api/users/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          })
        });
        if (response.ok) {
          // Credentials correct, go to 2-factor login step
          const { username } = formData;
          localStorage.setItem("username", username);
          // Do NOT set userRole or token yet!
          // Login: go to loginstep2
          navigate("/loginstep2", { state: { username, password: formData.password } });
        } else {
          const data = await response.json();
          alert(data.message || "Login failed.");
        }
      } catch (err) {
        alert("Login failed: " + err.message);
      }
    }
  };

  if (!isAdmin) {
    // Redirect or hide admin features
  }

  return (
    <div className="login-container">
      <div className="auth-box">
        <div className="auth-left">
          {/* Title changes based on login/signup */}
          <h2 style={{ fontSize: '28px', marginBottom: '20px', fontWeight: 'bold' }}>
            {isLogin ? "Log in" : "Sign up"}
          </h2>
          {/* Tabs to switch between login and signup */}
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
            {/* Main form for login/signup */}
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
              {/* Email field only for signup */}
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
              {/* Confirm password only for signup */}
              {!isLogin && (
                <div className="input-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              {/* Admin fields only for admin signup */}
              {!isLogin && (
                <div className="input-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={isAdmin}
                      onChange={e => setIsAdmin(e.target.checked)}
                    />
                    I am an admin
                  </label>
                  {isAdmin && (
                    <input
                      type="text"
                      placeholder="Enter admin invite token"
                      value={adminToken}
                      onChange={e => setAdminToken(e.target.value)}
                      required
                    />
                  )}
                </div>
              )}
              {/* Submit button changes text based on mode */}
              <button type="submit" className="auth-button">
                {isLogin ? "Log In" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
        {/* Right side can be used for images or additional info */}
        <div className="auth-right"></div>
      </div>
    </div>
  );
};

export default LoginForm;