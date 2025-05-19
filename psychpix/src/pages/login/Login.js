import React, { useState } from "react";
import "./css/Login.css";
import LongLogo from "../LongLogo.png";

import LoginForm from "./components/LoginForm";
import SignUpStep2 from "./components/SignUpStep2";
import SignUpStep2Con from "./components/SignUpStep2Con"; // Import confirmation step
import LogInStep2 from "./components/LogInStep2"; // import your login piano step

function Login() {
  const [step, setStep] = useState("login"); // "login", "signup2", "login2"
  const [isLogin, setIsLogin] = useState(true); // track which tab

  const handleSignUp = () => setStep(isLogin ? "login2" : "signup2");

  // Handler to move to confirmation step
  const handleConfirm = () => setStep("signup2con");

  // Handler to go back from confirmation to signup2
  const handleBackToSignup2 = () => setStep("signup2");

  return (
    <div className="login-page-viewport">
      <div className="login-steps-wrapper">
        <div className={`login-form-slide ${step !== "login" ? "slide-up" : ""}`}>
          <LoginForm
            onSignUp={handleSignUp}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
        </div>
        <div className={`signup-step2-slide ${step === "signup2" ? "slide-in" : ""}`}>
          <SignUpStep2 
            onBack={() => setStep("login")} 
            onSubmit={handleConfirm} // <-- Add this line
          />
        </div>
        <div className={`signup-step2-slide ${step === "login2" ? "slide-in" : ""}`}>
          <LogInStep2 onBack={() => setStep("login")} />
        </div>
        <div className={`signup-step2con-slide ${step === "signup2con" ? "slide-in" : ""}`}>
          <SignUpStep2Con
            onBack={handleBackToSignup2}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;