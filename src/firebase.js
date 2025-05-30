import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Reemplaza esto con tu configuración de Firebase:
const firebaseConfig = {
  apiKey: "AIzaSyDkUcgP2H2wE7wdYKulB6DKxayhd8u0s8c",
  authDomain: "pepepow-bff24.firebaseapp.com",
  projectId: "pepepow-bff24",
  storageBucket: "pepepow-bff24.firebasestorage.app",
  messagingSenderId: "293369980710",
  appId: "1:293369980710:web:7358138d1a8459f718c3e7",
  measurementId: "G-24FV4YM18E"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);