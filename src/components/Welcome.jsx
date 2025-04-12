import React, { useState } from "react";
import { Link } from "react-router-dom";
import backgroundimage from "../assets/image.jpg";
import RegistrationForm from "../Authetication/Registration";
import LoginForm from "../Authetication/Login";

function Welcome() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleGetStarted = () => {
    setShowRegistration(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegistration(false);
  };

  const closeForms = () => {
    setShowRegistration(false);
    setShowLogin(false);
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundimage})` }}
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex flex-col justify-between overflow-hidden"
    >
      {/* Overlay forms when active */}
      {(showRegistration || showLogin) && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={closeForms}
        ></div>
      )}

      <div className="flex-grow flex items-center justify-center text-center px-4 relative z-0">
        <div
          className={`bg-black/30 p-6 rounded-lg text-white max-w-xl w-full transition-all duration-300 ${
            showRegistration || showLogin ? "translate-y-20" : ""
          }`}
        >
          <h3 className="text-4xl font-bold mb-4">Welcome to BintiAI</h3>
          <p className="mb-6">
            Your trusted digital companion for personalized sexual and
            reproductive health
          </p>

          <button
            onClick={handleGetStarted}
            className="text-white bg-pink-500 py-2 px-6 rounded-full hover:bg-pink-700 transition w-full sm:w-auto"
          >
            Get Started
          </button>

          <p className="mt-4">
            Already have an account?{" "}
            <button
              onClick={handleLoginClick}
              className="text-pink-300 underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>

      {/* Registration Form Slide-in */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-20 transition-all duration-500 ${
          showRegistration ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <RegistrationForm onClose={closeForms} />
      </div>

      {/* Login Form Slide-in */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-20 transition-all duration-500 ${
          showLogin ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <LoginForm onClose={closeForms} />
      </div>
    </div>
  );
}

export default Welcome;
