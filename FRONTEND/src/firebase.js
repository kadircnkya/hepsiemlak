// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-db64d.firebaseapp.com",
  projectId: "mern-estate-db64d",
  storageBucket: "mern-estate-db64d.appspot.com",
  messagingSenderId: "454264526461",
  appId: "1:454264526461:web:49793c00086bf6ff2cc314",
  measurementId: "G-NE19TMDPE0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);