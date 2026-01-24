import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Hardcoded Firebase configuration from user
const firebaseConfig = {
  apiKey: "AIzaSyAVFyj7SIN1oRNrsG5_ZDJLrneYqeJG0IY",
  authDomain: "studio-3840794144-59de8.firebaseapp.com",
  projectId: "studio-3840794144-59de8",
  storageBucket: "studio-3840794144-59de8.firebasestorage.app",
  messagingSenderId: "337983153382",
  appId: "1:337983153382:web:39086f1df0d42975bdc727"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
