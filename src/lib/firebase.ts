import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJe6o_K5ZiXSgBO-uIaMSqLXkhTjIZilU",
  authDomain: "taggle-waitlist.firebaseapp.com",
  projectId: "taggle-waitlist",
  storageBucket: "taggle-waitlist.firebasestorage.app",
  messagingSenderId: "857584273268",
  appId: "1:857584273268:web:cbb7a0aaba524d3ed94e21",
  measurementId: "G-341VZGGHV4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };