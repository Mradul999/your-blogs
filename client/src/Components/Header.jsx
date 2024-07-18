import React, { useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { FaRegSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { signoutUserSuccess } from "../redux/slices/UserSlice";
import axios from "axios";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  console.log(theme);
  const dispatch = useDispatch();

  const burgerClickHandler = () => {
    setVisible(!visible);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const profileClickHandler = () => {
    setDropdown(!dropdown);
  };
  const navigate = useNavigate();
  const dashboardHandler = () => {
    navigate("/dashboard");
    setDropdown(false);
    setActiveLink("");
  };

  const signoutHandler = async () => {
    try {
      const signoutResponse = await axios.post("/api/user/signout");
      if (signoutResponse.status === 200) {
        setDropdown(false);

        dispatch(signoutUserSuccess());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col text-white ">
      <div className="flex justify-between px-3 bg-slate-700 shadow-sm shadow-slate-300 py-2 items-center text-gray-200">
        <NavLink to="/">
          <h1 className="text-white text-xl cursor-pointer">
            <span className="bg-gradient-to-br from-purple-600 to-blue-500 px-2 py-1 rounded-lg">
              Byte
            </span>{" "}
            Blogs
          </h1>
        </NavLink>

        <div className="flex items-center relative ">
          <input
            placeholder="Search"
            className="bg-slate-500 hidden sm:block rounded-lg py-3 focus:outline-none pl-2 placeholder:text-[13px] placeholder:text-white    "
            type="text"
          />
          <CiSearch className="absolute right-2 hidden sm:block text-2xl cursor-pointer" />
        </div>

        <ul className="sm:flex hidden gap-6 text-[1.1rem]">
          <NavLink to="/" onClick={() => handleLinkClick("home")}>
            <li
              className={
                activeLink === "home" ? "text-purple-600" : "text-white"
              }
            >
              Home
            </li>
          </NavLink>
          <NavLink to="/about" onClick={() => handleLinkClick("about")}>
            <li
              className={
                activeLink === "about" ? "text-purple-600" : "text-white"
              }
            >
              About
            </li>
          </NavLink>
          <NavLink to="/projects" onClick={() => handleLinkClick("projects")}>
            <li
              className={
                activeLink === "projects" ? "text-purple-600" : "text-white"
              }
            >
              Projects
            </li>
          </NavLink>
        </ul>
        <div className="sm:gap-6 gap-3 flex items-center relative">
          <CiSearch className="text-2xl cursor-pointer sm:hidden block flex-none" />
          {theme === "light" ? (
            <FaMoon
              onClick={() => dispatch(toggleTheme())}
              className="text-2xl cursor-pointer"
            />
          ) : (
            <FaRegSun
              onClick={() => dispatch(toggleTheme())}
              className="text-2xl cursor-pointer"
            />
          )}

          {currentUser ? (
            <img
              onClick={profileClickHandler}
              src={currentUser.data.profilePic}
              className="rounded-full w-10 cursor-pointer h-10"
              alt="userprofile"
            />
          ) : (
            <NavLink to="/signin">
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </NavLink>
          )}
          {dropdown && (
            <div className="absolute bg-slate-800 rounded-md px-5 py-3   flex flex-col top-16 right-0 ">
              <p>@{currentUser?currentUser.data.username:""}</p>

              <p>{currentUser?currentUser.data.email:""}</p>

              <div className="w-full h-[0.8px] my-1 rounded-full bg-gray-400"></div>
              <p
                onClick={dashboardHandler}
                className="mt-3 hover:text-purple-600  text-[14px] font-medium cursor-pointer transition-all hover"
              >
                Profile
              </p>
              <div className="w-full h-[0.6px] my-1 rounded-full bg-gray-400"></div>
              <p
                onClick={signoutHandler}
                className="mt-3 cursor-pointer transition-all w-[6rem]  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg px-2 py-2 "
              >
                Sign out
              </p>
            </div>
          )}

          <RxHamburgerMenu
            className="sm:hidden text-3xl cursor-pointer "
            onClick={burgerClickHandler}
          />
        </div>
      </div>
      {visible && (
        <div className="sm:hidden bg-gray-200 ">
          <ul className="flex flex-col gap-1">
            <NavLink to="/" onClick={() => handleLinkClick("home")}>
              <li
                className={
                  activeLink === "home"
                    ? "text-purple-600 font-semibold"
                    : "text-black"
                }
              >
                Home
              </li>
            </NavLink>
            <NavLink to="/about" onClick={() => handleLinkClick("about")}>
              <li
                className={
                  activeLink === "about"
                    ? "text-purple-600 font-semibold"
                    : "text-black"
                }
              >
                About
              </li>
            </NavLink>
            <NavLink to="/projects" onClick={() => handleLinkClick("projects")}>
              <li
                className={
                  activeLink === "projects"
                    ? "text-purple-600 font-semibold"
                    : "text-black"
                }
              >
                Projects
              </li>
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
}
