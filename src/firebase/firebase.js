// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjI6PWeThA4G3g9tX8foicBpRlPav74YQ",
  authDomain: "arknights-calc-6bbae.firebaseapp.com",
  projectId: "arknights-calc-6bbae",
  storageBucket: "arknights-calc-6bbae.appspot.com",
  messagingSenderId: "1060581030486",
  appId: "1:1060581030486:web:9bd36142295d103e1999f7",
  measurementId: "G-L48GM813WT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);