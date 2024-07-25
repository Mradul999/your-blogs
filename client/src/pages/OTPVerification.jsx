import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/slices/UserSlice";

export default function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const changeHandler = (event) => {
    setOtp(event.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!otp) {
      setErrorMessage("please fill the OTP");
      return;
    }
    setErrorMessage(null);

    try {
      setLoading(true);
      const email = sessionStorage.getItem("email");
      const name = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const profilePic =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
      const response = await axios.post("/api/auth/verifyotp", { otp, email });
      if (response.status === 200) {
        setLoading(false);
        const signupResponse = await axios.post("/api/auth/signup", {
          name,
          email,
          password,
          profilePic,
        });

        dispatch(signInSuccess(signupResponse));

        navigate("/signin");
      }

      if (response.status === 409) {
        setLoading(false);
        setErrorMessage("Invalid OTP");
        return;
      }
      if (response.status === 400) {
        setLoading(false);
        setErrorMessage("OTP expire please generate a new OTP.");
        return;
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 409) {
        setErrorMessage("invalid otp ");
      } else if (error.response && error.response.status === 400) {
        setErrorMessage("otp expire please generate a new otp");
      } else {
        setErrorMessage("Internal server error");
      }
    }
  };
  return (
    <div className=" h-screen  bg-slate-800 text-white overflow-x-hidden px-3  ">
      <div className="flex flex-col max-w-[400px] mx-auto mt-[11rem]   px-6 py-12 bg-slate-600 rounded-lg ">
        <h1 className=" text-3xl text-white  font-medium mb-6">
          OTP VERIFICATION
        </h1>
        <form
          onSubmit={submitHandler}
          className="flex flex-col text-white text-[14px] gap-1  "
        >
          <label htmlFor="">Enter 6 digit otp sent to your mail</label>
          <input
            onChange={changeHandler}
            type="text"
            className="bg-slate-700  focus:outline-none focus:border-[0.2rem] border-sky-600 py-2 pl-2 rounded-lg"
          />
          {errorMessage && (
            <p className="text-red-600 text-[12px] ">*{errorMessage}</p>
          )}
          <button className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl mx-auto rounded-md px-2 py-1 mt-1">
            {loading ? <span className="loader"></span> : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}
