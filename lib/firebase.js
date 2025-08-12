// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDF8IAa3wuXTsH2tmEnxDbBfwt3zgNz0P8",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "bon-contact-form.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "bon-contact-form",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "bon-contact-form.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "850667621736",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:850667621736:web:baafd31b7cd4be4486dadd",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-2QDQ051DEP"
};

// Validate that we have the minimum required configuration
if (!firebaseConfig.projectId || firebaseConfig.projectId === 'undefined') {
  console.error('Firebase projectId is missing or undefined');
  console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    projectIdValue: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  });
}

// Initialize Firebase
let app, db, storage, analytics;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
  
  // Initialize analytics only in browser environment
  if (typeof window !== "undefined" && firebaseConfig.measurementId) {
    try {
      analytics = getAnalytics(app);
    } catch (analyticsError) {
      console.warn('Analytics initialization failed:', analyticsError);
    }
  }
} catch (error) {
  console.error('Firebase initialization failed:', error);
  console.error('Config used:', firebaseConfig);
  throw error;
}

export { db, storage, analytics };