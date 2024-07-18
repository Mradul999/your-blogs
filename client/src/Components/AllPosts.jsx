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

  const deletePost = (postId) => {
    // Add your delete post logic here
  };

  const editPost = (post) => {
    // Add your edit post logic here
  };

  return (
    <div className="rounded- p-4 w-screen rouded-lg overflow-x-scroll ">
      <table className="min-w-full bg-slate-700 shadow-md ">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Date Created
            </th>
            <th className="py-4 px-7 bg-slate-600 text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Post Image
            </th>
            <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Post Title
            </th>
            <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Category
            </th>
            <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Delete
            </th>
            <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {userPosts.map((post) => (
            <tr
              key={post._id}
              className=" transition-colors duration-200"
            >
              <td className="py-4 px-6 border-b  text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </td>
              <td className="py-4 px-6 border-b  text-sm">
                <Link to={`/post/${post.slug}`}><img
                  src={post.image}
                  alt=""
                  className="h-20 w-20 object-cover rounded-lg"
                /></Link>
                
              </td>
              <td className="py-4 px-6 border-b  text-sm text-center whitespace-normal">
                {post.title}
              </td>
              <td className="py-4 px-6 border-b  text-sm">{post.category}</td>
              <td className="py-4 px-6 border-b  text-sm">
                <button
                  onClick={() => deletePost(post._id)}
                  className="text-red-600 hover:text-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </td>
              <td className="py-4 px-6 border-b  text-sm">
                <button
                  onClick={() => editPost(post)}
                  className="text-sky-500 hover:text-blue-700 transition-colors duration-200"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
