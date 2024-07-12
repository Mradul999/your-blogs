import React from "react";
import "../Components/bg.css";
import { NavLink } from "react-router-dom";

export default function SignUp() {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="h-screen  bg-slate-800 text-white overflow-x-hidden px-3  ">
      <div className="max-w-[400px] signup mx-auto mt-[9rem] px-3 sm:px-8 py-16  bg-gray-600 rounded-lg  ">
        <h1 className="text-center text-[2rem] font-semibold mb-6">SignUp</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          <label className="flex flex-col" htmlFor="username">
            Enter username
            <input placeholder="Mradul Verma"
              className="py-2 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 "
              name="username"
              type="text"
            />
          </label>
          <label className="flex flex-col" htmlFor="username">
            Enter email
            <input placeholder="mradul@gmail.com"
              className="py-2 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 "
              name="username"
              type="text"
            />
          </label>
          <label className="flex flex-col" htmlFor="username">
            Enter Password
            <input placeholder="****"
              className="py-2 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 "
              name="username"
              type="text"
            />
          </label>
          <p>
            Already regsitered?{" "}
            <NavLink to="/signin">
              {" "}
              <button className="text-sky-500 font-semibold"> Login</button>
            </NavLink>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
