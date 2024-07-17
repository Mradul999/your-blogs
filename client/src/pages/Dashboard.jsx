import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Profile from "../Components/Profile";

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
    <div className="min-h-screen flex md:flex-row flex-col justify-between  ">
      <Sidebar />
      {tab === "profile" && <Profile />}
    </div>
  );
}
