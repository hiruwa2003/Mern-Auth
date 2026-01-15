// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-db376.firebaseapp.com",
  projectId: "mern-auth-db376",
  storageBucket: "mern-auth-db376.firebasestorage.app",
  messagingSenderId: "91661110114",
  appId: "1:91661110114:web:f929cccf1891f1b355fa3b",
  measurementId: "G-QVP7YEXPSN"
};

// Initialize Firebase only when config is present
const hasApiKey = Boolean(firebaseConfig.apiKey);
let appInstance = null;
let analyticsInstance = null;

if (!hasApiKey) {
  console.warn('Firebase API key is missing. Firebase will not be initialized. Set VITE_FIREBASE_API_KEY in your environment.')
} else {
  appInstance = initializeApp(firebaseConfig);
  try {
    analyticsInstance = getAnalytics(appInstance);
  } catch (err) {
    // analytics may fail in some environments (SSR, unsupported browsers)
    console.warn('Firebase analytics init failed:', err.message || err);
  }
}

export const app = appInstance;
export const analytics = analyticsInstance;
export const isFirebaseConfigured = hasApiKey;