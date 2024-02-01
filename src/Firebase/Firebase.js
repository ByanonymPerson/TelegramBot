// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAx7hGnf2H2od3EfujXlmbe4mxYwBwr-BQ",
  authDomain: "telegramstore-96e1e.firebaseapp.com",
  databaseURL: "https://telegramstore-96e1e-default-rtdb.firebaseio.com",
  projectId: "telegramstore-96e1e",
  storageBucket: "telegramstore-96e1e.appspot.com",
  messagingSenderId: "454886096625",
  appId: "1:454886096625:web:8fb97c3a405772d44f7350",
  measurementId: "G-S47G5VXH3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);