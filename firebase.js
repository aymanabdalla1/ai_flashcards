// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrrHywaG8i6zO2wHBP5Eq0S4klXLpmozs",
  authDomain: "flashcards-455ed.firebaseapp.com",
  projectId: "flashcards-455ed",
  storageBucket: "flashcards-455ed.appspot.com",
  messagingSenderId: "699512977938",
  appId: "1:699512977938:web:7bc7f56dc2d6341f3f76cb",
  measurementId: "G-3C8W1B1ZTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);