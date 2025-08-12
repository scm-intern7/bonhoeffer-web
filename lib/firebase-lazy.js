// Alternative Firebase configuration approach
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Function to get Firebase config
function getFirebaseConfig() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };

  // Check if running in development and use fallbacks
  if (process.env.NODE_ENV === 'development') {
    return {
      apiKey: config.apiKey || "AIzaSyDF8IAa3wuXTsH2tmEnxDbBfwt3zgNz0P8",
      authDomain: config.authDomain || "bon-contact-form.firebaseapp.com",
      projectId: config.projectId || "bon-contact-form",
      storageBucket: config.storageBucket || "bon-contact-form.firebasestorage.app",
      messagingSenderId: config.messagingSenderId || "850667621736",
      appId: config.appId || "1:850667621736:web:baafd31b7cd4be4486dadd",
      measurementId: config.measurementId || "G-2QDQ051DEP"
    };
  }

  return config;
}

// Initialize Firebase lazily
let app, db, storage;

export function getFirebaseApp() {
  if (!app) {
    try {
      const config = getFirebaseConfig();
      app = initializeApp(config);
    } catch (error) {
      console.error('Failed to initialize Firebase app:', error);
      throw error;
    }
  }
  return app;
}

export function getFirebaseDb() {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

export function getFirebaseStorage() {
  if (!storage) {
    storage = getStorage(getFirebaseApp());
  }
  return storage;
}

// Export for backward compatibility
export const initializeFirebase = () => {
  return {
    db: getFirebaseDb(),
    storage: getFirebaseStorage()
  };
};
