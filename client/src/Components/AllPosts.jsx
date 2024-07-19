import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AllPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `/api/post/getposts?userId=${currentUser.data._id}`
        );
        setUserPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.data.isAdmin) {
      fetchPosts();
    }
  }, [currentUser.data._id]);

  const deletePost = async (postId) => {
    try {
      const deleteResponse = await axios.delete(
        `/api/post/delete/${postId}/${currentUser.data._id}`
      );
      if (deleteResponse.status === 200) {
        setUserPosts(userPosts.filter((post) => post._id !== postId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = (post) => {
    // Add your edit post logic here
  };

  return (
    <div className="p-2 w-screen h-screen rouded-lg overflow-x-scroll ">
      {userPosts.length === 0 ? (
        <p className="text-center mt-4">No post created yet</p>
      ) : (
        <table className="min-w-full bg-slate-700 shadow-md ">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 text-start font-semibold text-sm uppercase tracking-wider">
                Date Created
              </th>
              <th className="py-4 px-7 bg-slate-600 text-purple-600 text-start font-semibold text-sm uppercase tracking-wider">
                Post Image
              </th>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-start text-sm uppercase tracking-wider">
                Post Title
              </th>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-start text-sm uppercase tracking-wider">
                Category
              </th>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-start text-sm uppercase tracking-wider">
                Delete
              </th>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-start text-sm uppercase tracking-wider">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map((post) => (
              <tr key={post._id} className=" transition-colors duration-200">
                <td className="py-4 px-6 border-b font-medium  text-sm">
                  {new Date(post.createdAt).toLocaleString()}
                </td>
                <td className="py-4 px-6 border-b  text-sm">
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt=""
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                  </Link>
                </td>
                <td className="py-4 px-6 border-b font-medium  text-sm text-start whitespace-normal">
                  {post.title}
                </td>
                <td className="py-4 px-6 border-b font-medium  text-sm">
                  {post.category}
                </td>
                <td className="py-4 px-6 border-b font-medium  text-sm">
                  <button
                    onClick={() => deletePost(post._id)}
                    className="text-red-600 hover:text-red-700 hover:scale-105  transition-colors duration-200"
                  >
                    Delete
                  </button>
                </td>
                <td className="py-4 px-6 border-b font-medium  text-sm">
                  <Link to={`/updatepost/${post._id}`}>
                    {" "}
                    <button
                      onClick={() => editPost(post)}
                      className="text-sky-600 hover:text-blue-700 hover:scale-110 transition-colors duration-200"
                    >
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
