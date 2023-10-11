// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI9Zf1eHeelSsVcSaSKIj4yJxR0BaFBC8",
  authDomain: "mapping-c1fa2.firebaseapp.com",
  projectId: "mapping-c1fa2",
  storageBucket: "mapping-c1fa2.appspot.com",
  messagingSenderId: "982576276876",
  appId: "1:982576276876:web:35ee1f3b065910ec69a2a9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
