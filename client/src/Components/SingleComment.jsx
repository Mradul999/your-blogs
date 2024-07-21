import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function SingleComment({ comment, onEdit, onDelete }) {
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes.length);
  const [showEditArea, setShowEditArea] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [modal, setmodal] = useState(false);

  const [content, setContent] = useState(comment.content);

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
      const response = await axios.put(`/api/comment/like/${comment._id}`);

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

  const editButtonHandler = () => {
    setShowEditArea(true);
  };

  const cancelButtonHandler = () => {
    setShowEditArea(false);
  };

  const saveEditedCommentHandler = async () => {
    if (content.length === 0) {
      return;
    }
    try {
      const response = await axios.put(`/api/comment/edit/${comment._id}`, {
        content,
      });

      onEdit(comment, response.data.content);
      setShowEditArea(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(`/api/comment/delete/${comment._id}`);
      onDelete(response.data);
      setmodal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 mx-5 mb-6 ">
      {modal && (
        <div className="  modal-overlay ">
          <div className=" absolute  mx-3   bg-slate-700  z-20 py-6 md:py-8 flex flex-col gap-4 px-3  md:px-6 rounded-md">
            <span className="sm:text-xl ">Delete comment</span>

            <h1 className="sm:text-[1.1rem] font-normal text-center  ">
              Delete your comment permanently?
            </h1>
            <div className="flex flex-row justify-around ">
              <button
                onClick={deleteHandler}
                className=" text-sky-600 sm:text-xl font-medium py-2 hover:bg-blue-400 hover:rounded-full hover:bg-opacity-30  transition-all  px-6 rounded-md"
              >
                Delete
              </button>
              <button
                onClick={() => setmodal(false)}
                className=" text-sky-600 sm:text-xl hover:bg-blue-400 hover:rounded-full hover:bg-opacity-30 transition-all  font-medium py-2 px-6 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-2">
        <img
          src={user?.profilePic}
          className="w-8 h-8 rounded-full"
          alt="userimage"
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex  gap-7 items-center">
            <p className="text-violet-500">@{user?.username}</p>
            <span className="text-[12px] sm:text-[15px]">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>

          {showEditArea ? (
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-[90%] focus:outline-none focus:border-[3px] rounded-lg bg-slate-300 text-black sm:text-[15px] text-[13px] p-2 border-sky-600"
                rows="2"
              ></textarea>
              <div className="flex gap-2">
                <button
                  onClick={saveEditedCommentHandler}
                  className="hover:text-violet-800 text-violet-600 transition-all font-medium"
                >
                  Save
                </button>
                <button
                  onClick={cancelButtonHandler}
                  className="hover:text-violet-800 transition-all text-violet-600 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-[14px] sm:text-[15px]">{comment.content}</p>

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
                <p>
                  {likesCount} {likesCount === 1 ? "like" : "likes"}
                </p>
                {(currentUser?.data._id.toString() ===
                  comment?.userId.toString() ||
                  currentUser?.data.isAdmin) && (
                  <button onClick={editButtonHandler}>Edit</button>
                )}

                {(currentUser?.data._id.toString() ===
                  comment?.userId.toString() ||
                  currentUser?.data.isAdmin) && (
                  <button onClick={() => setmodal(true)}>Delete</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-200 h-[1px] w-[93%]  bg-opacity-50 rounded"></div>
    </div>
  );
}
