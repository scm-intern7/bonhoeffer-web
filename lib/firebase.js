// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF8IAa3wuXTsH2tmEnxDbBfwt3zgNz0P8",
  authDomain: "bon-contact-form.firebaseapp.com",
  projectId: "bon-contact-form",
  storageBucket: "bon-contact-form.firebasestorage.app",
  messagingSenderId: "850667621736",
  appId: "1:850667621736:web:baafd31b7cd4be4486dadd",
  measurementId: "G-2QDQ051DEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const db = getFirestore(app);

export { db };