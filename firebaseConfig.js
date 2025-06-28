import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

// Initialize auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize database
const database = getDatabase(app);

export { auth, database };
