import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { FiCheck } from "react-icons/fi";
import { getComments } from '../../../api/Controllers/comment.controller';

export default function AllUsers() {
    const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);



  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "/api/comment/getallcomments"
        );
        setComments(response.data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.data.isAdmin) {
        fetchComments();
    }
  }, []);


  const deleteComment= async(commentId)=>{

    try {
      const response = await axios.delete(`/api/comment/delete/${commentId}`);
      if (response.status === 200) {
        setComments(comments.filter((comment) => comment._id!== commentId));
      }
    } catch (error) {
      console.log(error);
    }


  }

  


  return (
    <div className="p-2 w-screen h-screen rouded-lg overflow-x-scroll ">
      {comments.length === 0 ? (
        <p className="text-center mt-4">no comments</p>
      ) : (
        <table className="min-w-full bg-slate-700 shadow-md ">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 text-start font-semibold text-sm uppercase tracking-wider">
                COMMENT CREATED ON
              </th>
              <th className="py-4 px-7 bg-slate-600 text-purple-600 text-start font-semibold text-sm uppercase tracking-wider">
                COMMENT CONTENT
              </th>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-start text-sm uppercase tracking-wider">
                NUMBER OF LIKES
              </th>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-start text-sm uppercase tracking-wider">
                POSTID
              </th>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-start text-sm uppercase tracking-wider">
                USERID
              </th>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-start text-sm uppercase tracking-wider">
                DELETE
              </th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment._id} className=" transition-colors duration-200">
                <td className="py-4 px-6 border-b font-medium  text-sm">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 border-b  text-sm">
                  
                    <p>{comment.content}</p>
                 
                </td>
                <td className="py-4 px-6 border-b font-medium  text-sm text-start whitespace-normal">
                  {comment.likes.length}
                </td>
                <td className="py-4 px-6 border-b font-medium  text-sm">
                  {comment.postId}
                </td>
                <td className="py-4 px-6 border-b font-medium  text-sm">
                  {comment.userId}
                </td>
                <td className="py-4 px-6 border-b font-medium  text-sm">
                  
                    {" "}
                    <button
                    
                    onClick={()=>deleteComment(comment._id)}
                      className="text-red-600  hover:text-red-800 transition-all duration-200"
                    >
                      Delete
                    </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
