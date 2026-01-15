import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase.jsx';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [preview, setPreview] = useState(currentUser?.photo || '');
  const [uploadPercent, setUploadPercent] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');

  const fileRef = useRef();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">
          You are not signed in. Please sign in to view your profile.
        </p>
      </div>
    );
  }

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setSuccessMsg(''); // reset previous message
    uploadImage(file);
  };

  // Upload image to Firebase
  const uploadImage = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadPercent(progress);
      },
      (error) => console.error('Upload error:', error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPreview(downloadURL); // update preview
          setSuccessMsg('Image updated successfully ✅'); // show success message
          setUploadPercent(0); // reset progress
        });
      }
    );
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('Update profile:', { fullName, email, password, photo: preview });
    // Dispatch update action here
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-2">Profile</h1>
      <p className="text-xl text-gray-700 mb-8 text-center">
        Welcome, <span className="font-semibold">{currentUser.name}</span>
      </p>

      <form
        onSubmit={handleUpdate}
        className="flex flex-col items-center gap-6 w-full bg-white p-6 rounded-xl shadow-lg"
      >
        {/* Profile Image */}
        <div className="relative">
          <img
            src={preview}
            alt={currentUser.name}
            className="h-28 w-28 rounded-full object-cover border-4 border-blue-500 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => fileRef.current.click()}
          />
          {uploadPercent > 0 && uploadPercent < 100 && (
            <span className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {uploadPercent}%
            </span>
          )}
        </div>

        {/* Success Message */}
        {successMsg && (
          <p className="text-green-600 font-medium text-sm mt-2">{successMsg}</p>
        )}

        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Full Name */}
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          type="text"
          placeholder="Full Name"
          className="w-full bg-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full bg-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full bg-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Update Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>

      {/* Delete Account / Sign Out */}
      <div className="flex flex-col items-center mt-6 gap-4">
        <span className="text-red-600 cursor-pointer hover:underline">Delete Account</span>
        <span className="text-gray-800 cursor-pointer hover:underline">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
