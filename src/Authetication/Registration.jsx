import React from "react";

const Registration = () => {
  return (
    <div className="flex justify-center items-center  min-h-screen ">
      <div className="bg-pink-500 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-4 mt-4">
          <input
            type="text"
            name="Username"
            placeholder="Username"
            required
            className="w-full p-2 border border-gray-300 text-black rounded-md"
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            required
            className="w-full p-2 border border-gray-300  text-black rounded-md"
          />

          <input
            type="text"
            name="password"
            placeholder="ConfirmPassword"
            required
            className="w-full p-2 border border-gray-300  text-black rounded-md"
          />
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Show Password</span>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-purple rounded-md hover:bg-purple-600"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <h3>Already have an account? </h3>
        </div>
      </div>
    </div>
  );
};

export default Registration;
