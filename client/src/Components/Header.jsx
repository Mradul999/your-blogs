import React, { useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const burgerClickHandler = () => {
    setVisible(!visible);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="flex flex-col mb-2">
      <div className="flex justify-between px-2 sm:px-12 bg-slate-600 shadow-sm shadow-slate-300 py-3 items-center text-gray-200">
        <h1 className="text-white text-xl">
          <span className="bg-gradient-to-br from-purple-600 to-blue-500 px-2 py-1 rounded-lg">
            Your
          </span>{" "}
          Blogs
        </h1>
        <div className="flex items-center relative ">
          <input
            placeholder="Search"
            className="bg-slate-500 hidden sm:block rounded-lg py-3 focus:outline-none pl-2 placeholder:text-[13px] placeholder:text-white    "
            type="text"
          />
          <CiSearch className="absolute right-2 hidden sm:block text-2xl cursor-pointer" />
        </div>

        <ul className="sm:flex hidden gap-6 text-[1.1rem]">
          <NavLink to="/" onClick={() => handleLinkClick('home')}>
            <li className={activeLink === 'home' ? "text-purple-600" : "text-white"}>Home</li>
          </NavLink>
          <NavLink to="/about" onClick={() => handleLinkClick('about')}>
            <li className={activeLink === 'about' ? "text-purple-600" : "text-white"}>About</li>
          </NavLink>
          <NavLink to="/projects" onClick={() => handleLinkClick('projects')}>
            <li className={activeLink === 'projects' ? "text-purple-600" : "text-white"}>Projects</li>
          </NavLink>
        </ul>
        <div className="sm:gap-6 gap-3 flex items-center">
          <CiSearch className="text-2xl cursor-pointer sm:hidden block flex-none" />
          <FaMoon className="text-2xl" />
          <NavLink to="/signin">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center"
            >
              Sign in
            </button>
          </NavLink>
          <RxHamburgerMenu
            className="sm:hidden text-3xl cursor-pointer "
            onClick={burgerClickHandler}
          />
        </div>
      </div>
      {visible && (
        <div className="sm:hidden bg-gray-200 ">
          <ul className="flex flex-col gap-1">
            <NavLink to="/" onClick={() => handleLinkClick('home')}>
              <li className={activeLink === 'home' ? "text-purple-600 font-semibold" : "text-black"}>Home</li>
            </NavLink>
            <NavLink to="/about" onClick={() => handleLinkClick('about')}>
              <li className={activeLink === 'about' ? "text-purple-600 font-semibold" : "text-black"}>About</li>
            </NavLink>
            <NavLink to="/projects" onClick={() => handleLinkClick('projects')}>
              <li className={activeLink === 'projects' ? "text-purple-600 font-semibold" : "text-black"}>Projects</li>
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
}
