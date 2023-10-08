// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiKu7TX5OVaWmdpLYfV3ozJLrkzSsUqT8",
  authDomain: "biztrust-d95c0.firebaseapp.com",
  projectId: "biztrust-d95c0",
  storageBucket: "biztrust-d95c0.appspot.com",
  messagingSenderId: "922127290088",
  appId: "1:922127290088:web:a551795e42cff8acdd835d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
