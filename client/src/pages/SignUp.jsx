import React, { useState } from "react";
import "../Components/bg.css";
import { FaGoogle } from "react-icons/fa6";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../Components/bg.css";
import Oauth from "../Components/Oauth";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      setErrorMessage("Please fill all fields");
      return;
    }

    setErrorMessage(null);

    try {
      //send mail with a otp to user at that email
      setLoading(true);
      const response = await fetch("api/auth/generateotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.status === 400) {
        setLoading(false);
        setErrorMessage("user already registered");
        return;
      }
      if (response.status === 200) {
        sessionStorage.setItem("email", formData.email);
        sessionStorage.setItem("username", formData.username);
        sessionStorage.setItem("password", formData.password);
        setLoading(false);
        navigate("/otpverification");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen  bg-slate-800 text-white overflow-x-hidden px-3  ">
      <div className="max-w-[400px] signup mx-auto mt-[6rem] px-3 sm:px-8 py-14  bg-gray-600 rounded-lg  ">
        <h1 className="text-center text-[2rem] font-semibold mb-6">SignUp</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-6 mb-6">
          <label className="flex flex-col" htmlFor="username">
            Enter username
            <input
              id="username"
              onChange={handleChange}
              placeholder="Mradul Verma"
              className="py-2 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 "
              name="username"
              type="text"
            />
          </label>
          <label className="flex flex-col" htmlFor="username">
            Enter email
            <input
              id="email"
              onChange={handleChange}
              placeholder="mradul@gmail.com"
              className="py-2 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 "
              name="username"
              type="text"
            />
          </label>
          <label className="flex flex-col" htmlFor="username">
            Enter Password
            <input
              id="password"
              onChange={handleChange}
              placeholder="****"
              className="py-2 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 "
              name="username"
              type="password"
            />
          </label>
          {errorMessage && <p className="text-red-600 ">*{errorMessage}</p>}
          <button className="bg-gradient-to-br hover:scale-95 transition-all from-purple-600 to-blue-500 rounded-lg py-3 text-[15px] font-medium hover:bg-gradient-to-bl">
            {loading ? <span className="loader"></span> : "Sign up"}
          </button>
        </form>
        <Oauth />

        <p className="mt-6">
          Already regsitered?{" "}
          <NavLink to="/signin">
            {" "}
            <button className="text-sky-500 font-semibold"> Login</button>
          </NavLink>{" "}
        </p>
      </div>
    </div>
  );
}
