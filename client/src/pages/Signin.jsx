import React, { useState } from "react";
import "../Components/bg.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/slices/UserSlice";
import Oauth from "../Components/Oauth";
export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  };

  const submitHandler = async (e, req, res) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      setErrorMessage("Please fill all fields");
      return;
    }
    setErrorMessage(null);

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/signin", {
        email: formData.email,
        password: formData.password,
      });

      dispatch(signInSuccess(response));
      setLoading(false);

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 404) {
        setErrorMessage("User not found");
      } else if (error.response && error.response.status === 400) {
        setErrorMessage("Invalid credentials");
      } else {
        setErrorMessage("Internal server error");
      }
    }
  };

  return (
    <div className="h-screen  bg-slate-800 flex flex-col  justify-center  text-white overflow-x-hidden px-3  ">
      <div className="max-w-[500px] w-full signup mx-auto  px-3 sm:px-8 py-10  bg-gray-600 rounded-lg  ">
        <h1 className="text-center text-[2rem] font-semibold mb-6">Sign In</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-6 mb-6">
          <label className="flex flex-col" htmlFor="username">
            Enter email
            <input
              id="email"
              onChange={handleChange}
              placeholder="mradul@gmail.com"
              className="py-2 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 "
              name="username"
              type="text"
            />
          </label>
          <label className="flex flex-col" htmlFor="username">
            Enter Password
            <input
              id="password"
              onChange={handleChange}
              placeholder="****"
              className="py-2 rounded-lg text-[13px] pl-2 pr-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 "
              name="username"
              type="password"
            />
          </label>
          {errorMessage && <p className="text-red-600 ">*{errorMessage}</p>}
          <button className="bg-gradient-to-br from-purple-600 hover:scale-95  transition-all to-blue-500 rounded-lg py-3 text-[15px] font-medium hover:bg-gradient-to-bl">
            {loading ? <span className="loader"></span> : "Sign In"}
          </button>

          
        </form>
        <Oauth />
        <p className="mt-6">
            Not regsitered yet?{" "}
            <NavLink to="/signup">
              {" "}
              <button className="text-sky-500 font-semibold"> Signup</button>
            </NavLink>{" "}
          </p>
      </div>
    </div>
  );
}
