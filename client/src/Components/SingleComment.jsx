import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SingleComment({ comment }) {
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes.length);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      setLiked(comment.likes.includes(currentUser.data._id));
    }
  }, [comment.likes, currentUser]);
  const likeHandler = async () => {
    if (!currentUser) {
      navigate("/signin");
    }
    
    try {
      const response = await axios.put(`/api/comment/like/${comment._id}`)

      
      if (response.data.likes.includes(currentUser.data._id)) {
        setLiked(true);
        setLikesCount(likesCount + 1);
      } else {
        setLiked(false);
        setLikesCount(likesCount - 1);
      }

     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`/api/user/${comment.userId}`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [comment]);
  return (
    <div className="w-full flex flex-col gap-2 mx-5 mb-6 ">
      <div className="flex gap-2">
        <img
          src={user?.profilePic}
          className="w-8 h-8 rounded-full"
          alt="userimage"
        />
        <div className="flex flex-col gap-2">
          <div className="flex  gap-7 items-center">
            <p className="text-violet-500">@{user?.username}</p>
            <span className="text-[12px] sm:text-[15px]">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>

          <p className="text-[14px] sm:text-[15px]">{comment.content}</p>
          {/* <div className='bg-slate-400 w-full h-[1px]'></div> */}
          <div className="flex gap-3 items-center">
            {liked ? (
              <FaThumbsUp
                className="text-green-500 cursor-pointer transition-transform"
                onClick={likeHandler}
              />
            ) : (
              <FaThumbsUp
                className=" cursor-pointer transition-transform"
                onClick={likeHandler}
              />
            )}
            <p>{likesCount} {likesCount === 1 ? "like" : "likes"}</p>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>

      <div className="bg-slate-200 h-[1px] w-[93%]  bg-opacity-50 rounded"></div>
    </div>
  );
}
