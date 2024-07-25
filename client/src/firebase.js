// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "blogapp-4a461.firebaseapp.com",
  projectId: "blogapp-4a461",
  storageBucket: "blogapp-4a461.appspot.com",
  messagingSenderId: "276364116255",
  appId: "1:276364116255:web:3fe253c6aa47e80d0df02a",
  measurementId: "G-M6411TTP4D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
