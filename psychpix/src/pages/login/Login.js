import React from "react";
import "./css/Login.css";

import LoginForm from "./components/LoginForm";
import SignUpStep2 from "./components/SignUpStep2";


function Login() {
  return (
    <div>
      <LoginForm />
      <SignUpStep2 />
    </div>

  );
}

export default Login;