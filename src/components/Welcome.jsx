import React from "react";
import { FaHome, FaBell } from "react-icons/fa";
import backgroundimage from "../assets/image.jpg";

function Welcome() {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundimage})` }}
      className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col justify-between"
    >
      <div className="flex justify-between p-4 text-white">
        <FaHome />
        <FaBell />
      </div>

      <div className="flex-grow flex items-center justify-center text-center px-4">
        <div className="bg-black/30 p-6 rounded-lg text-white max-w-xl">
          <h3 className="text-4xl font-bold mb-4">Welcome to BintiAI</h3>
          <p className="mb-6">
            Your trusted digital companion for personalized sexual and
            reproductive health
          </p>
          <button className="text-white bg-pink-500 py-2 px-6 rounded-full hover:bg-pink-700 transition">
            Get Started
          </button>
          <p className="mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-pink-300 underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
