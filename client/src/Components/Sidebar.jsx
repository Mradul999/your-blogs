import React, { useEffect, useState } from 'react'
import { FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutUserSuccess } from '../redux/slices/UserSlice';
import axios from "axios";

export default function Sidebar() {
    const location = useLocation();
  const [tab, setTab] = useState ("");
  const dispatch=useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } 
  }, [location.search]);

  const signoutHandler=async()=>{
    try {
      
      const signoutResponse=await axios.post("/api/user/signout");
      if(signoutResponse.status===200){
        
        dispatch(signoutUserSuccess());
        navigate("/signin");
      }

      
    } catch (error) {
      console.log(error)
      
    }

  }

  return (
    <div className='md:w-[250px] md:h-[99.3%] my-auto     flex flex-col  gap-5    p-3 rounded-r-md bg-slate-700  '>
        <Link  to="/dashboard?tab=profile"><button className='bg-slate-500 w-full py-3 hover:scale-95 transition-all flex justify-between rounded-lg text-xl text-start px-3 font-medium'>Profile <span className='bg-slate-800 rounded text-[13px] px-[0.4rem]'>user</span></button></Link>
        
        <button onClick={signoutHandler} className='text-xl bg-red-600 rounded-lg py-2    font-medium flex items-center px-3  gap-2  hover:font-semibold hover:scale-95 transition-all'> <FaSignOutAlt />  Sign out</button>

    </div>
  )
}
