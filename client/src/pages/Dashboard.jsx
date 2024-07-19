import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Profile from "../Components/Profile";
import AllPosts from "../Components/AllPosts";
import AllUsers from "../Components/AllUsers";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("profile");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex md:flex-row flex-col justify-between overflow-x-hidden  ">
      <Sidebar />
      {tab === "profile" && <Profile />}
      {tab === "allposts" && <AllPosts />}
      {tab==="allusers" && <AllUsers/>}
    </div>
  );
}
