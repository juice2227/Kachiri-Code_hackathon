import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-pink-500 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <form>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 text-black rounded-md mb-2"
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 text-black rounded-md mb-2 pr-10"
            />
          </div>
        </form>
        <div className="mt-4 text-center">
          <button className="text-blue-500 hover:underline disabled:text-blue-300">
            Forgot Password?
          </button>
          <h3 className="mt-2">Don't have an account?</h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
