import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC6WrBBsKXe0U5Hbm7hIHxyOateur9WDAg",
  authDomain: "taggle-registered.firebaseapp.com",
  projectId: "taggle-registered",
  storageBucket: "taggle-registered.firebasestorage.app",
  messagingSenderId: "1097683204635",
  appId: "1:1097683204635:web:56621358dc01b82677d6be",
  measurementId: "G-Q6TS7HJJD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Sign in with Google using redirect
const signInWithGoogleRedirect = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Error signing in with Google:", error);
    // Handle errors here (e.g., display an error message to the user)
  }
};

// Sign out
const logOut = async () => {
  await signOut(auth);
};

// Export all necessary variables as named exports
export { app, db, auth, signInWithGoogleRedirect, logOut, onAuthStateChanged };