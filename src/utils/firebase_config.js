// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABDpitvzeAFR46Pvwe5pJ4CzXfUpx6x_o",
  authDomain: "invoice-369221.firebaseapp.com",
  projectId: "invoice-369221",
  storageBucket: "invoice-369221.appspot.com",
  messagingSenderId: "204908010951",
  appId: "1:204908010951:web:66c7d109c6bb222e3f4de2",
  measurementId: "G-7K1DEHTRTR",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;
