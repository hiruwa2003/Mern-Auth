import React from "react";
import { FaGoogle, FaFacebookF, FaInstagram } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import { app, isFirebaseConfigured } from "../firebase.jsx";
import { useDispatch } from "react-redux";
import { SigninSuccess } from "../../Redux/userSlice.js";

const OAuth = () => {
    const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    if (!isFirebaseConfigured || !app) {
      console.warn('Firebase not configured; Google sign-in unavailable.')
      return
    }
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res  = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        }),
      });
      const data = await res.json();
      // backend returns { token, user } — store only the user in Redux
      const userPayload = data.user || data;
      dispatch(SigninSuccess(userPayload));
      
    } catch (error) {
      console.error("Could not login with Google (popup); falling back to redirect:", error);
      try {
        // Fallback to redirect flow when popup-based auth is blocked by COOP
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        await signInWithRedirect(auth, provider);
      } catch (redirErr) {
        console.error('Redirect sign-in failed:', redirErr);
      }
    }
  }

  useEffect(() => {
    const processRedirect = async () => {
      if (!isFirebaseConfigured || !app) return;
      try {
        const auth = getAuth(app);
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          const res  = await fetch("/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              photo: result.user.photoURL
            }),
          });
          const data = await res.json();
          dispatch(SigninSuccess(data));
        }
      } catch (err) {
        // ignore if no redirect result or user cancelled
        console.warn('No redirect sign-in result:', err && err.message ? err.message : err);
      }
    }
    processRedirect();
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-center gap-4 mt-4">
        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleClick}
          disabled={!isFirebaseConfigured}
          title={!isFirebaseConfigured ? 'Google sign-in not configured' : 'Sign in with Google'}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-red-500
                     text-red-500
                     hover:bg-red-500 hover:text-white
                     transition-all duration-300"
        >
          <FaGoogle className="text-lg" />
        </button>

        {/* Facebook */}
        <button
          type="button"
          className="w-12 h-12 flex items-center justify-center rounded-full border border-blue-600
                     text-blue-600
                     hover:bg-blue-600 hover:text-white
                     transition-all duration-300"
        >
          <FaFacebookF className="text-lg" />
        </button>

        {/* Instagram */}
        <button
          type="button"
          className="w-12 h-12 flex items-center justify-center rounded-full border border-pink-500
                     text-pink-600
                     hover:bg-pink-500 hover:text-white
                     transition-all duration-300"
        >
          <FaInstagram className="text-lg" />
        </button>
      </div>
    </div>
  );
}

export default OAuth;
