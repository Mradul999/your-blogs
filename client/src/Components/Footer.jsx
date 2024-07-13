import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import "../Components/bg.css";


export default function Footer() {
  return (
    <div className="bg-slate-700 footer">
        
      <div className="flex sm:flex-row flex-col gap-6 justify-between px-2 sm:px-12 py-8 sm:py-16 shadow-md shadow-black text-white ">
        <div className="flex gap-4 text-3xl">
        <a
        href="https://github.com/Mradul999"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer hover:text-purple-800 transition-all"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/mradul-verma-b74048254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer hover:text-purple-800 transition-all"
      >
        <FaLinkedin />
      </a>
      <a
        
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer hover:text-purple-800 transition-all"
      >
        <FaInstagram />
      </a>
      <a
        
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer hover:text-purple-800 transition-all"
      >
        <FaFacebook />
      </a>
        </div>
        <div className="flex gap-4">
          <a className="cursor-pointer hover:text-purple-800 transition-all" >Terms of Use </a>
          <a  className="cursor-pointer hover:text-purple-800 transition-all">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
