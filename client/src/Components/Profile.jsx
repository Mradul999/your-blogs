import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../Components/bg.css";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const submitHandler=(e)=>{
    e.preventDefault();

  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6 max-w-[500px]  bg-slate-600 py-10 sm:px-6 px-3 mx-3 w-full  rounded-lg profileCard">
        <h1 className="text-center text-4xl font-medium">Profile</h1>
        <img
          src={currentUser.data.profilePic}
          className="w-32 h-32 rounded-full mx-auto cursor-pointer img-shadow"
          alt=""
        />
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          <input
            type="text"
            className="py-3 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 placeholder:text-white "
            defaultValue={currentUser.data.username}
            placeholder="Username"
          />
          <input
            type="text"
            
            className="py-3 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 placeholder:text-white "
            defaultValue={currentUser.data.email}
            placeholder="Email"
          ></input>
          <input
          placeholder="Password"
            type="password"
            className="py-3 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 placeholder:text-white "
          />
          <button className="bg-gradient-to-br from-purple-600 hover:scale-95 transition-all to-blue-500 rounded-lg py-3 text-[15px] font-medium hover:bg-gradient-to-bl">
            {loading ? <span className="loader"></span> : "Update"}
          </button>
          
        </form>
        <button className="bg-red-500 hover:scale-95 transition-all rounded-lg py-3 text-[15px] font-medium ">
            {loading ? <span className="loader"></span> : "Delete Account"}
          </button>
      </div>
    </div>
  );
}
