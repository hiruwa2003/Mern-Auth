import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-2">Profile</h1>
      <p className="text-xl text-gray-700 mb-8 text-center">
        Welcome, <span className="font-semibold">{currentUser.name}</span>
      </p>

      {/* Profile Form */}
      <form className="flex flex-col items-center gap-6 w-full bg-white p-6 rounded-xl shadow-lg">
        
        {/* Profile Image */}
        <img
          src={currentUser.photo}
          alt={currentUser.name}
          className="h-28 w-28 rounded-full object-cover border-4 border-blue-500 cursor-pointer hover:scale-105 transition-transform"
        />

        {/* Full Name */}
        <input
          defaultValue={currentUser.name}
          type="text"
          id="name"
          placeholder="Full Name"
          className="w-full bg-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="w-full bg-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full bg-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Edit / Update Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>

      {/* Delete Account / Sign Out */}
      <div className="flex flex-col items-center mt-6 gap-4">
        <span className="text-red-600 cursor-pointer hover:underline">
          Delete Account
        </span>
        <span className="text-gray-800 cursor-pointer hover:underline">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
