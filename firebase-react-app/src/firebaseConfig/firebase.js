// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxXBylo-WqXcg9yVd6xmrGYx0D91F3xEs",
  authDomain: "fir-react-crud-6ac76.firebaseapp.com",
  projectId: "fir-react-crud-6ac76",
  storageBucket: "fir-react-crud-6ac76.appspot.com",
  messagingSenderId: "967525238118",
  appId: "1:967525238118:web:be2f0f4a7098ccc1c3f4a7",
  measurementId: "G-TE3XTRXTDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
