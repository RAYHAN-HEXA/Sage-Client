// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6-oel1ZrfrmZpZ9CRuh7AgZXy_zI7AH4",
  authDomain: "digital-life-lessons-c707c.firebaseapp.com",
  projectId: "digital-life-lessons-c707c",
  storageBucket: "digital-life-lessons-c707c.firebasestorage.app",
  messagingSenderId: "878692482776",
  appId: "1:878692482776:web:56618868fafe845665e1ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
