import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJe6o_K5ZiXSgBO-uIaMSqLXkhTjIZilU",
  authDomain: "taggle-waitlist.firebaseapp.com",
  projectId: "taggle-waitlist",
  storageBucket: "taggle-waitlist.firebasestorage.app",
  messagingSenderId: "857584273268",
  appId: "1:857584273268:web:cbb7a0aaba524d3ed94e21",
  measurementId: "G-341VZGGHV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Connect to emulator in development (optional)
if (import.meta.env.DEV && !import.meta.env.VITE_USE_PROD_FIREBASE) {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
  } catch (error) {
    console.log('Firestore emulator already connected or not available');
  }
}

export default app;