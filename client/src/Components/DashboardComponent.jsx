import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function DashboardComponent() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/user/getusers?limit=5`);
        setUsers(response.data.users);
        setTotalUsers(response.data.totalUsers);
        setLastMonthUsers(response.data.lastMonthUsers);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comment/getallcomments?limit=5`);
        setComments(response.data.comments);
        setTotalComments(response.data.totalComments);
        setLastMonthComments(response.data.lastMonthComments);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/post/getposts?limit=5`);
        setPosts(response.data.posts);
        setTotalPosts(response.data.totalPosts);
        setLastMonthPosts(response.data.lastMonthPosts);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.data.isAdmin) {
      fetchUsers();
      fetchComments();
      fetchPosts();
    }
  }, [currentUser]);

  return (
    <div className="w-screen min-h-screen px-auto flex  justify-center ">
      <div className=" max-w-[950px]  w-full flex flex-col px-3 py-6 gap-10">
        <div className="flex flex-col gap-3 sm:flex-row  justify-between ">
          <div className="flex justify-between grow rounded-md p-3 bg-gray-600">
            <div className="flex flex-col   gap-1 ">
              <h1 className="font-medium text-xl">TOTAL USERS</h1>
              <p className="text-3xl font-medium">{totalUsers}</p>
              <p className="flex items-center gap-2 mt-2">
                {" "}
                <span className="flex items-center text-green-400">
                  <FaArrowUp /> {lastMonthUsers}{" "}
                </span>{" "}
                Last month
              </p>
            </div>
            <FaUsers className="text-xl  bg-rose-600 w-12 h-12 rounded-full p-2" />
          </div>

          <div className="flex justify-between grow p-3 rounded-md  bg-gray-600">
            <div className="flex flex-col   gap-1 ">
              <h1 className="font-medium text-xl">TOTAL COMMENTS</h1>
              <p className="text-3xl font-medium">{totalComments}</p>
              <p className="flex items-center gap-2 mt-2">
                {" "}
                <span className="flex items-center text-green-400">
                  <FaArrowUp /> {lastMonthComments}{" "}
                </span>{" "}
                Last month
              </p>
            </div>
            <FaComments className="text-xl  bg-green-600 w-12 h-12 rounded-full p-2" />
          </div>

          <div className="flex justify-between grow rounded-md  p-3 bg-gray-600">
            <div className="flex flex-col   gap-1 ">
              <h1 className="font-medium text-xl">TOTAL POSTS</h1>
              <p className="text-3xl font-medium">{totalPosts}</p>
              <p className="flex items-center gap-2 mt-2">
                {" "}
                <span className="flex items-center text-green-400">
                  <FaArrowUp /> {lastMonthPosts}{" "}
                </span>{" "}
                Last month
              </p>
            </div>
            <IoDocumentTextOutline className="text-xl  bg-yellow-600 w-12 h-12 rounded-full p-2" />
          </div>
        </div>

        <div className="flex sm:flex-row flex-col gap-2  ">
          <table className=" grow border rounded-lg border-gray-400 overflow-hidden ">
            <thead>
              <tr className="bg-gray-600  ">
                <th className="py-4 px-6 text-left  ">Recent users</th>
                <th className="py-4 px-6 text-right ">
                  {" "}
                  <Link to="/dashboard?tab=allusers">
                    <button className="bg-violet-600 p-2 rounded-lg">
                      See All
                    </button>
                  </Link>{" "}
                </th>
              </tr>
              <tr className="">
                <th className="py-4 px-6 text-left bg-red-400">USER IMAGE</th>
                <th className="py-4 px-6 text-center bg-red-400"> USERNAME</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="bg-slate-700">
                  <td className="py-4 px-6 border-b text-left ">
                    {" "}
                    <img
                      src={user.profilePic}
                      className="h-14 w-14 object-cover rounded-full"
                      alt=""
                    />
                  </td>
                  <td className="py-4 px-6 border-b text-center">
                    {user.username}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className=" border grow border-gray-400 rounded-lg overflow-hidden ">
            <thead>
              <tr className="bg-gray-600 rounded-lg ">
                <th className="py-4 px-6 text-left">Recent Comments</th>
                <th className="py-4 px-6 text-right">
                  {" "}
                  <Link to="/dashboard?tab=allcomments">
                    {" "}
                    <button className="bg-violet-600 p-2  rounded-lg">
                      See All
                    </button>
                  </Link>{" "}
                </th>
              </tr>
              <tr className="">
                <th className="py-4 px-6 text-left bg-red-400">
                  COMMENT CONTENT
                </th>
                <th className="py-4 px-6 pr-8 text-center bg-red-400 ">
                  {" "}
                  LIKES
                </th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr className="bg-slate-700">
                  <td className="py-4 px-6 border-b text-left">
                    {comment.content}{" "}
                  </td>
                  <td className="py-4 px-6 pr-12 border-b text-center">
                    {comment.likes.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex sm:flex-row flex-col gap-3   overflow-x-scroll">
          <table className=" grow border rounded-lg border-gray-400 overflow-hidden ">
            <thead>
              <tr className="bg-gray-600  ">
                <th className="py-4 px-6 text-left  ">Recent Posts</th>
                <th></th>
                <th className="py-4 px-6  text-right ">
                  {" "}
                  <Link to="/dashboard?tab=allposts">
                    <button className="bg-violet-600 p-2 rounded-lg">
                      See All
                    </button>
                  </Link>{" "}
                </th>
                
              </tr>
              <tr className="">
                <th className="py-4 px-6 text-left bg-red-400">POST IMAGE</th>
                <th className="py-4 px-6 text-center bg-red-400"> POST TITLE</th>
                <th className="py-4 px-6 text-center bg-red-400">
                  {" "}
                  POST CATEGORY
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr className="bg-slate-700">
                  <td className="py-4 px-6 border-b text-left ">
                    {" "}
                    <img
                      src={post.image}
                      className="h-14 w-14 object-cover rounded-full"
                      alt=""
                    />
                  </td>
                  <td className="py-4 px-6 border-b text-center">
                    {post.title}
                  </td>
                  <td className="py-4 px-6 border-b text-center">
                    {post.category}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
