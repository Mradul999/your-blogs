import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SingleComment from "./SingleComment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [currentcharacter, setCharacters] = useState(0);
  const [content, setContent] = useState(null);
  const [comments, setComments] = useState([]);
  const userId = currentUser.data._id;

  const commentChangeHandler = (e) => { 
    setCharacters(e.target.value.length);
    setContent(e.target.value);
  };
  console.log(comments);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comment/getcomments/${postId}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        }
      } catch (error) {}
    };
    fetchComments();
  }, [postId]);

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
      setComments([commentResponse.data,...comments])
      setContent("");
    } catch (error) {
      console.log(error);
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
        <div>
          <form
            onSubmit={submitHandler}
            className="mt-3 w-full border-[1px] rounded-md p-3 border-violet-700  "
          >
            <textarea
            value={content}
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
          <p className="mt-5 mb-7 sm:text-[15px] text-[13px]"> Total Comments <span className="border  px-2   ">{comments?.length}</span> </p>
          {comments?.map((comment)=>(<SingleComment key={comment._id} comment={comment}/>)
            
          )}
        </div>
      )}
    </div>
  );
}
