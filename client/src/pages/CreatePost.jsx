import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  return (
    <div className=" h-screen flex justify-center mt-10 overflow-x-hidden">
      <div className="md:max-w-[60%] max-w-[85%] w-full flex flex-col gap-5">
        <h1 className="text-center md:text-2xl text-xl">Create Post</h1>
        <form className="flex flex-col gap-3">
          <input
            placeholder="Title"
            className=" focus:outline-sky-600 rounded-lg placeholder:text-slate-700  py-2 pl-2 bg-slate-200  text-slate-600"
            type="text"
          />
          <select
            className="cursor-pointer focus:outline-none rounded-lg py-1 pl-2  text-slate-700 bg-slate-200"
            name=""
            id=""
          >
            <option value="">Select Category</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React.js">React.js</option>
            <option value="Next.js"> Next.js</option>
          </select>
          <div className="flex  justify-between items-center  border-dotted border-teal-500 border-[3px] rounded-md p-5  ">
            <input
              accept="images/.*"
              className="rounded-lg w-[50%]  bg-red-500"
              type="file"
              name=""
              id=""
            />
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-center"
            >
              Uplaod Image
            </button>
          </div>
          <ReactQuill
            theme="snow"
            placeholder="Write your post here..."
            className="w-full h-60 bg-white  "
          />
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none mt-12 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-center"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}
