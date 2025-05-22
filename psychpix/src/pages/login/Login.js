import React, { useState } from "react";
import "./css/Login.css";
import LoginForm from "./components/LoginForm";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-page-viewport">
      <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />
    </div>
  );
}

export default Login;