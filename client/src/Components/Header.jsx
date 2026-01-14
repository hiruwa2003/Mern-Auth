import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-slate-900 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Row */}
        <div className="relative flex items-center h-16">

          {/* Left - Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <Link to="/">
              <span className="text-xl font-bold text-gray-200">
                Mern Auth
              </span>
            </Link>
          </div>

          {/* Center - Links */}
          <ul className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
            <Link to="/" className="text-gray-200 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-200 hover:text-blue-600 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-200 hover:text-blue-600 font-medium">
              Contact
            </Link>
          </ul>

          {/* Right - SignUp Button */}
          <div className="ml-auto">
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;
