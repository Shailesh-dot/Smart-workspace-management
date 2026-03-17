import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBYauhH5b4f8m4ymQpmb7kv8GoUOr2zCg",
  authDomain: "smart-workflow-management.firebaseapp.com",
  projectId: "smart-workflow-management",
  storageBucket: "smart-workflow-management.firebasestorage.app",
  messagingSenderId: "784456052353",
  appId: "1:784456052353:web:dfc3873658ef9111242780",
  measurementId: "G-PHGDY8K027"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics is only supported in browser environments
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, analytics };
