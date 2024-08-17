// Import the functions you need from the SDKs you need
import { initializeApp } from "NEXT_PUBLIC_firebase/app";
import { getAnalytics } from "NEXT_PUBLIC_firebase/analytics";
import { getFirestore } from "NEXT_PUBLIC_firebase/firestore"
// TODO: Add SDKs for NEXT_PUBLIC_Firebase products that you want to use
// https://NEXT_PUBLIC_firebase.google.com/docs/web/setup#available-libraries

// Your web app's NEXT_PUBLIC_Firebase configuration
// For NEXT_PUBLIC_Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize NEXT_PUBLIC_Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export {db}