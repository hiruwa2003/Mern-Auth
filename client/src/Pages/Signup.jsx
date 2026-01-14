import React from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md bg-transparent rounded-2xl shadow-xl p-8 border ">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Sign up to get started
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4">
          
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent "
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent "
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent "
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="flex gap-4">
          
          <button className="flex-1 flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition">
            <FaGoogle className="text-red-500" />
            <span className="text-sm font-medium">Google</span>
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition">
            <FaFacebookF className="text-blue-600" />
            <span className="text-sm font-medium">Facebook</span>
          </button>

        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="text-indigo-600 font-medium cursor-pointer">
            Sign In
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;
