// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBS0tfDynheCHtuB2JWU1PsexqXtuX7_ic",
  authDomain: "codegang-v2.firebaseapp.com",
  projectId: "codegang-v2",
  storageBucket: "codegang-v2.firebasestorage.app",
  messagingSenderId: "1089954521894",
  appId: "1:1089954521894:web:43ca7dccdaa8f2a0bad7e7"
};

// Singleton pattern to prevent multiple initializations in Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore (Standard Mode)
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };