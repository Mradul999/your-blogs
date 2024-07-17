import React from "react";
import { FaGoogle } from "react-icons/fa6";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase.js";
import axios from "axios";
import { signInSuccess } from "../redux/slices/UserSlice.js";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function Oauth() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const OauthHandler = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      //   console.log(resultFromGoogle);
      const displayName = resultFromGoogle.user.displayName;
      const photoURL = resultFromGoogle.user.photoURL;
      const email = resultFromGoogle.user.email;
      const response = await axios.post("/api/auth/googleauth", {
        displayName,
        photoURL,
        email,
      });
      console.log("response of oauth=>", response);
      if (response.status === 200) {
        dispath(signInSuccess(response));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={OauthHandler}
      className="bg-red-600 w-full hover:bg-red-700 hover:scale-95 transition-all rounded-lg py-3 text-[15px] font-medium flex items-center justify-center gap-2"
    >
      <FaGoogle className="-mt-[0.2rem]  bg-white text-2xl text-black p-1 rounded-full" />
      Continue with Google
    </button>
  );
}
