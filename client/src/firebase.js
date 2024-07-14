// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-a0db3.firebaseapp.com",
  projectId: "mern-blog-app-a0db3",
  storageBucket: "mern-blog-app-a0db3.appspot.com",
  messagingSenderId: "702465643435",
  appId: "1:702465643435:web:5dc2b55daef2af30baf8ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

