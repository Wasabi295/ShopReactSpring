import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB7GUNQER2jkCxWGzDgrxkwje-NjKf3KE4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "shopchat-48c0a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "shopchat-48c0a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "shopchat-48c0a.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "893741054544",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:893741054544:web:2c6222ee995c6a5a9daf55",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-CW37R6H1QJ"
};

const app = initializeApp(firebaseConfig);


export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

console.log("🔥 Firebase conectat la proiectul:", firebaseConfig.projectId);