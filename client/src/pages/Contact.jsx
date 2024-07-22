import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setsuccessMessage] = useState(null);

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData?.name || !formData?.email || !formData?.message) {
      setErrorMessage("All fields are required");
      return;
    }
    try {
      setErrorMessage(null);
      setsuccessMessage(null);

      const response = await axios.post("/api/suggestion/create", formData);
      if (response.status === 201) {
        setsuccessMessage("Form submitted sucessfully");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage("you have already submitted with this email");
        } else {
          setErrorMessage("something went wrong please try again");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-[700px] w-full flex flex-col gap-3 mt-16 mx-3">
        <h1 className="text-center text-2xl">Contact Us</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Name"
            id="name"
            onChange={onChange}
            className="p-2 w-full rounded-lg focus:outline-none focus:border-[2.5px] border-sky-600  bg-slate-500"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={onChange}
            className="p-2 w-full mt-3 rounded-lg focus:outline-none focus:border-[2.5px] border-sky-600 bg-slate-500"
          />
          <textarea
            placeholder="Message"
            id="message"
            onChange={onChange}
            className="p-2 w-full mt-3 h-[200px] rounded-lg    focus:outline-none focus:border-[2.5px] border-sky-600 bg-slate-500"
          />
          {successMessage && (
            <button className="w-full p-2 mt-2 bg-green-600 rounded-lg">
              {successMessage}
            </button>
          )}
          {errorMessage && (
            <button className="w-full p-2 mt-2 bg-red-600 rounded-lg">
              {errorMessage}
            </button>
          )}
          <button className="p-2 w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
