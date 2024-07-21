import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutUserSuccess } from "../redux/slices/UserSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";


export default function Sidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  const dispatch = useDispatch();

 
 

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const signoutHandler = async () => {
    try {
      const signoutResponse = await axios.post("/api/user/signout");
      if (signoutResponse.status === 200) {
        dispatch(signoutUserSuccess());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="md:w-[230px] md:min-h-screen     flex flex-col     sm:gap-1 my-[0.1rem]    p-3 rounded-r-md bg-slate-700  ">
      <Link to="/dashboard?tab=dashboard">
        {" "}
        {currentUser?.data.isAdmin && (
          <button
            onClick={() => setTab("dashboard")}
            className={`w-full py-3 transition-all flex  gap-2 items-center rounded-lg text-[1rem] text-start px-3 font-medium ${
              tab === "dashboard" ? "bg-slate-600" : "bg-transparent"
            }`}
          >
            <AiFillDashboard  className="text-[20px]" /> Dashboard
          </button>
        )}
      </Link>
      <Link to="/dashboard?tab=profile">
        <button
          onClick={() => setTab("profile")}
          className={`w-full py-3 transition-all flex justify-between items-center rounded-lg text-[1rem] text-start px-3 font-medium ${
            tab === "profile" ? "bg-slate-600" : "bg-transparent"
          }`}
        >
          <div className="flex items-center gap-2"> <FaUser className="text-[20px]" /> Profile</div>
         {" "}
          <span className="bg-slate-800 rounded text-[13px] px-[0.4rem]">
            {currentUser?.data.isAdmin?"Admin":"User"}
            
          </span>
        </button>
      </Link>
      <Link to="/dashboard?tab=allposts">
        {" "}
        {currentUser?.data.isAdmin && (
          <button
            onClick={() => setTab("allposts")}
            className={`w-full py-3 transition-all flex  gap-2 items-center rounded-lg text-[1rem] text-start px-3 font-medium ${
              tab === "allposts" ? "bg-slate-600" : "bg-transparent"
            }`}
          >
            <IoDocumentTextOutline className="text-[20px]" /> All Posts
          </button>
        )}
      </Link>
      <Link to="/dashboard?tab=allusers">
        {" "}
        {currentUser?.data.isAdmin && (
          <button
            onClick={() => setTab("allusers")}
            className={`w-full py-3 transition-all flex  gap-2 items-center rounded-lg text-[1rem] text-start px-3 font-medium ${
              tab === "allusers" ? "bg-slate-600" : "bg-transparent"
            }`}
          >
            <FaUsers className="text-[20px]" /> Users
          </button>
        )}
      </Link>
      <Link to="/dashboard?tab=allcomments">
        {" "}
        {currentUser?.data.isAdmin && (
          <button
            onClick={() => setTab("allcomments")}
            className={`w-full py-3 transition-all flex  gap-2 items-center rounded-lg text-[1rem] text-start px-3 font-medium ${
              tab === "allcomments" ? "bg-slate-600" : "bg-transparent"
            }`}
          >
            <FaComments className="text-[20px]" /> Comments
          </button>
        )}
      </Link>
      
      <button
        onClick={signoutHandler}
        className="text-[1rem] rounded-lg py-2    font-medium flex items-center px-3  gap-2  hover:font-semibold hover:scale-95 transition-all"
      >
        {" "}
        <FaSignOutAlt /> Sign out
      </button>
    </div>
  );
}
