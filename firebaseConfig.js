// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3MC2D02BFd4t5kVypeUXJozC5lTroccw",
  authDomain: "smartchekin.firebaseapp.com",
  projectId: "smartchekin",
  storageBucket: "smartchekin.firebasestorage.app",
  messagingSenderId: "942461581194",
  databaseURL: "https://smartchekin-default-rtdb.firebaseio.com",
  appId: "1:942461581194:web:cceacf8c848156a694fa73",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
