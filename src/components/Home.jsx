import React, { useState, useEffect } from "react";
import girl1 from "../assets/girl2.jpg";
import girl2 from "../assets/girl2.jpg"; // Replace with different image
import girl3 from "../assets/girl2.jpg"; // Replace with different image
import logo from "../assets/logo2.png";
import { GiNotebook } from "react-icons/gi";
import { FaBell, FaPills } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import gemini from "../assets/gemini.png";
import { VscAccount } from "react-icons/vsc";

function Home() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [girl1, girl2, girl3];

  const handleGeminiClick = () => {
    window.open("https://gemini.google.com/", "_blank");
  };

  const triggerBounce = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 1000);
  };

  const navigateToProfile = () => {
    // Using window.location instead of useNavigate
    window.location.href = "/profile";
    // Alternatively: window.location.pathname = '/profile';
  };

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col">
      {/* Navbar */}
      <nav className="bg-opacity-20 backdrop-blur-md w-full py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <img src={logo} alt="App Logo" className="h-12 w-12 mr-3" />
            <span className="text-white font-bold text-2xl">BintiAI</span>
          </div>

          <div className="flex space-x-8">
            <button className="text-white hover:text-pink-200 transition">
              <GiNotebook className="text-4xl" title="Journal" />
            </button>
            <button className="text-white hover:text-pink-200 transition">
              <FaBell className="text-4xl" title="Reminders" />
            </button>
            <button className="text-white hover:text-pink-200 transition">
              <FaPills className="text-4xl" title="Contraceptives" />
            </button>
            <button className="text-white hover:text-pink-200 transition">
              <FaClipboardQuestion className="text-4xl" title="Q&A" />
            </button>
            <button
              onClick={navigateToProfile}
              className="text-white hover:text-pink-200 transition"
            >
              <VscAccount className="text-4xl" title="Profile" />
            </button>
          </div>
        </div>
      </nav>

      {/* Rest of your component remains the same... */}
      {/* Main Content */}
      <div className="flex-grow p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
          {/* Animated Image Carousel */}
          <div className="relative flex justify-center items-center h-96">
            {/* Circular container */}
            <div className="relative w-64 h-64">
              {images.map((img, index) => {
                const angle = (index * 120 + currentImage * 120) % 360;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * 120;
                const y = Math.sin(rad) * 120;

                return (
                  <div
                    key={index}
                    className={`absolute transition-all duration-1000 ease-in-out ${
                      index === currentImage ? "z-10" : "z-0"
                    }`}
                    style={{
                      transform: `translate(${x}px, ${y}px) scale(${
                        index === currentImage ? 1.1 : 0.8
                      })`,
                      opacity: index === currentImage ? 1 : 0.7,
                    }}
                  >
                    <img
                      src={img}
                      alt={`Woman ${index + 1}`}
                      className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                );
              })}

              {/* Center circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white font-bold">BintiAI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Column */}
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Women's Health Companion
            </h1>

            <button className="w-full max-w-xs text-white bg-pink-600 hover:bg-pink-700 py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg text-lg">
              Period Tracker
            </button>

            <button className="w-full max-w-xs text-white bg-pink-600 hover:bg-pink-700 py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg text-lg">
              Journal
            </button>

            <button className="w-full max-w-xs text-white bg-pink-600 hover:bg-pink-700 py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg text-lg">
              Contraceptive Reminder
            </button>

            <button className="w-full max-w-xs text-white bg-pink-600 hover:bg-pink-700 py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg text-lg">
              Ask Me a Question
            </button>

            {/* Gemini Image */}
            <div
              className="relative mt-4"
              onMouseEnter={() => {
                setShowTooltip(true);
                triggerBounce();
              }}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={handleGeminiClick}
            >
              <img
                src={gemini}
                alt="Gemini AI Chatbot"
                className={`w-16 h-16 cursor-pointer transition duration-300 ${
                  isBouncing ? "animate-bounce" : ""
                }`}
              />
              {showTooltip && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white text-pink-600 px-3 py-1 rounded-full shadow-lg text-sm font-medium whitespace-nowrap">
                  Ask me any question!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
