import React, { useState } from "react";
import "../Components/bg.css";
import { NavLink } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";
export default function Signin(){

  const submitHandler = (e) => {
    e.preventDefault();

  };

  return (
    <div className="h-screen  bg-slate-800 text-white overflow-x-hidden px-3  ">
      <div className="max-w-[400px] signup mx-auto mt-[9rem] px-3 sm:px-8 py-16  bg-gray-600 rounded-lg  ">
        <h1 className="text-center text-[2rem] font-semibold mb-6">Sign In</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          <label className="flex flex-col" htmlFor="username">
            Enter email
            <input
              placeholder="mradul@gmail.com"
              className="py-2 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 "
              name="username"
              type="text"
            />
          </label>
          <label className="flex flex-col" htmlFor="username">
            Enter Password
            <input
              placeholder="****"
              className="py-2 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 "
              name="username"
              type="text"
            />
          </label>
          <button className="bg-gradient-to-br from-purple-600 hover:scale-105 transition-all to-blue-500 rounded-lg py-3 text-[15px] font-medium hover:bg-gradient-to-bl">
            Sign in
          </button>
          <button className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-all rounded-lg py-3 text-[15px] font-medium flex items-center justify-center gap-2">
            <FaGoogle className="-mt-[0.2rem] bg-white text-2xl text-black p-1 rounded-full" />
            Continue with Google
          </button>
          <p>
            Not regsitered yet?{" "}
            <NavLink to="/signup">
              {" "}
              <button className="text-sky-500 font-semibold"> Signup</button>
            </NavLink>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};
