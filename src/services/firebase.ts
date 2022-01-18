// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRX1MP1GMPx5UTr5tkzlJ445doqwuHDeU",
  authDomain: "loan-planning-app.firebaseapp.com",
  projectId: "loan-planning-app",
  storageBucket: "loan-planning-app.appspot.com",
  messagingSenderId: "1059742529612",
  appId: "1:1059742529612:web:70a97227aff7f654415ce9",
  measurementId: "G-MZZ8WDPD5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
getAnalytics(app);
