import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCGrILfzpNa1XSFmi6N1R_uohFqIWd7FmM",
  authDomain: "shopnova-353e9.firebaseapp.com",
  projectId: "shopnova-353e9",
  storageBucket: "shopnova-353e9.firebasestorage.app",
  messagingSenderId: "705227854292",
  appId: "1:705227854292:web:28d5cad59378d30b0f8641",
  measurementId: "G-EFVSPB6Q21"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export default app;