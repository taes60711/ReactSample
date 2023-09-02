import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHapK1RmjJTGamqS3t7xKlGrf8UrQA-A0",
  authDomain: "react-73a85.firebaseapp.com",
  projectId: "react-73a85",
  storageBucket: "react-73a85.appspot.com",
  messagingSenderId: "204636740631",
  appId: "1:204636740631:web:3bae614a4453e6a5959052",
  measurementId: "G-B7NFFV47D2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);