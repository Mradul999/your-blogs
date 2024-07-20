import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [currentcharacter, setCharacters] = useState(0);
  const [content, setComment] = useState(null);
  const userId = currentUser.data._id;

  const commentChangeHandler = (e) => {
    setCharacters(e.target.value.length);
    setComment(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!currentcharacter || currentcharacter > 200) {
      return;
    }
    try {
      const commentResponse = await axios.post("/api/comment/create", {
        content,
        postId,
        userId,
      });
      console.log(commentResponse);
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="     rounded-lg ">
      {!currentUser ? (
        <p>
          Sign in to comment{" "}
          <Link to="/signin">
            {" "}
            <span className="text-sky-600 hover:cursor-pointer hover:underline">
              {" "}
              Sign in
            </span>
          </Link>{" "}
        </p>
      ) : (
        <p className="flex gap-2">
          Signed in as{" "}
          <Link to="/dashboard?tab=profile">
            <p className="text-sky-500 hover:underline">
              @{currentUser.data.username}
            </p>{" "}
          </Link>
        </p>
      )}

      {currentUser && (
        <form
          onSubmit={submitHandler}
          className="mt-3 w-full border-[1px] rounded-md p-2 border-violet-700  "
        >
          <textarea
            onChange={commentChangeHandler}
            name=""
            id=""
            maxLength="200"
            placeholder="Add a comment...."
            className="w-full rounded-md bg-gray-300 placeholder:text-slate-700 focus:outline-none focus:border-[3px] border-sky-400   text-black sm:text-[15px] text-[13px] sm:placeholder:text-[15px] placeholder:text-[13px] p-2"
            rows="3"
          ></textarea>
          <div className="flex justify-between items-center mt-2">
            <div className="sm:text-[15px] text-[13px]">
              {200 - currentcharacter} characters left
            </div>
            <button
              type="submit"
              className="sm:text-[15px] text-[13px] hover:text-green-500 transition-all  bg-gradient-to-br from-purple-600 to-blue-500 p-1  rounded-lg  "
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
