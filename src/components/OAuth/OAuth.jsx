import React from "react";
import { useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import "./OAuth.css";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Oauth() {
  const navigate = useNavigate();

  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);

      //check if user exist
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      
      if(!docSnap.exists()){
        setDoc(docRef, {
          name: user.displayName,
          email:user.email,
          timestamp: serverTimestamp(),
        })
      }
      
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button className="oauth-btn" onClick={onGoogleClick}>
      <FcGoogle className="icon" /> Continue with Google
    </button>
  );
}
