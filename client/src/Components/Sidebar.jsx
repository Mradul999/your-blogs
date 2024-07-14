import React, { useEffect, useState } from 'react'
import { FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();
  const [tab, setTab] = useState ("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } 
  }, [location.search]);
  return (
    <div className='md:w-[250px] md:h-[99.3%] my-auto     flex flex-col  gap-5    p-3 rounded-r-md bg-slate-700  '>
        <Link  to="/dashboard?tab=profile"><button className='bg-slate-500 w-full py-3 flex justify-between rounded-lg text-xl text-start px-3 font-medium'>Profile <span className='bg-slate-800 rounded text-[13px] px-[0.4rem]'>user</span></button></Link>
        
        <button className='text-xl   hover:text-purple-700 font-medium flex items-center px-3  gap-2  hover:font-semibold hover:scale-105 transition-all'> <FaSignOutAlt />  Sign out</button>

    </div>
  )
}
