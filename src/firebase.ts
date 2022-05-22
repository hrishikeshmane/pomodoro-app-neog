import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUw3Og43ZQmmRWIhcy8ey3_AD9Bn3G2TE",
  authDomain: "pomodoro-app-5cc39.firebaseapp.com",
  projectId: "pomodoro-app-5cc39",
  storageBucket: "pomodoro-app-5cc39.appspot.com",
  messagingSenderId: "31536904812",
  appId: "1:31536904812:web:8b040e46fa012700743649",
};

const app = initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth();

const googleAuthProvider = new GoogleAuthProvider();

export { auth, db, googleAuthProvider, firebaseApp };
