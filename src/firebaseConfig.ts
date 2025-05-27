// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoNMr9B7NaR-kLdjhE-tWYkHMUPUsYpaA",
  authDomain: "pharmachain-1644b.firebaseapp.com",
  projectId: "pharmachain-1644b",
  storageBucket: "pharmachain-1644b.firebasestorage.app",
  messagingSenderId: "177330359779",
  appId: "1:177330359779:web:b1b54cdbd6faf0c58764d6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };
