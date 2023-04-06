import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyA-t2X2kKoi6pIrukdhCy9mKxjTSikDUP0",
  authDomain: "lanzillow-c6261.firebaseapp.com",
  projectId: "lanzillow-c6261",
  storageBucket: "lanzillow-c6261.appspot.com",
  messagingSenderId: "180492763219",
  appId: "1:180492763219:web:3fb6ca696b7c723b4486a6",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();


