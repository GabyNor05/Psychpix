import React, { useState } from "react";
import "../css/Login.css";
import LongLogo from "../../../pages/LongLogo.png";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your authentication logic here
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={LongLogo} alt="Logo" className="logo" />
      </div>
      <div className="auth-box">
        <div className="auth-left">
          <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>
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