import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Components/bg.css";
import SinglePost from "../Components/SinglePost";

import { Link } from "react-router-dom";

export default function Home() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/post/getposts?limit=9`);
        setRecentPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecentPost();
  }, []);
  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-[1000px] flex flex-col gap-6 w-full mx-3 my-16">
        <h1 className=" text-3xl sm:text-4xl font-semibold">
          Welcome to nextBlogs
        </h1>
        <p>
          Here you'll find variety of articles and tutorials on topics such as
          development ,software engineering and programming languages
        </p>

        <p
          className=" text-xl
        text-center"
        >
          Recent Posts
        </p>

        {loading ? (
          <span className=" mx-auto mt-20 w-16 h-16 loader"></span>
        ) : (
          <div className="grid grid-row-2 sm:grid-rows-3  grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
            {recentPosts
              ? recentPosts.map((post) => (
                  <SinglePost key={post._id} post={post} />
                ))
              : "no recent posts"}
          </div>
        )}

        <button className="text-sky-600 font-medium ">
          <Link to="/search">View all articles</Link>
        </button>
      </div>
    </div>
  );
}
