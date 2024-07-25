import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SinglePost from "../Components/SinglePost";
import "../Components/bg.css";

export default function Search() {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });


  const [posts, setPosts] = useState([]);


  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSideBarData({
        ...sideBarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [location.search]);

  const changeHandler = (e) => {
    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sideBarData, searchTerm: e.target.value });
    }

    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSideBarData({ ...sideBarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSideBarData({ ...sideBarData, category });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("category", sideBarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="min-h-screen flex sm:flex-row flex-col  gap-6  p-6">
      <form
        onSubmit={submitHandler}
        className="sm:border-r flex flex-col gap-4   pr-2"
      >
        <div className=" flex flex-col gap-1  ">
          <label htmlFor="">Search Term:</label>
          <input
            className="text-gray-600 placeholder:text-gray-600 py-1 pl-2 focus:outline-none focus:border-[2.7px] border-sky-600 rounded-lg w-full"
            onChange={changeHandler}
            value={sideBarData.searchTerm}
            id="searchTerm"
            type="text"
            placeholder="search term"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Sort:</label>
          <select
            onChange={changeHandler}
            value={sideBarData.sort}
            id="sort"
            className="text-gray-600 placeholder:text-gray-600 py-1 pl-2  pr-2 rounded-lg focus:outline-none focus:border-[2.7px] border-sky-600 "
          >
          
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </select>
        </div>
        <div className="flex flex-col  gap-1">
          <label>Category:</label>
          <select
            onChange={changeHandler}
            value={sideBarData.category}
            id="category"
            className="text-gray-600 placeholder:text-gray-600 py-1 pl-2  pr-2 rounded-lg focus:outline-none focus:border-[2.7px] border-sky-600 "
          >
            <option value="uncategorized">uncategorized</option>
            <option value="React.js">React.js</option>
            <option value="Next.js">Next.js</option>
            <option value="JavaScript">Javascript</option>
          </select>
        </div>
        <button
          type="submit"
          className=" bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none py-2 rounded-lg"
        >
          Apply changes
        </button>
      </form>

      <div className="flex    flex-wrap gap-3">
        {loading ? (
          <span className="loader mx-auto mt-20 sm:mt-1 w-16 h-16 "></span>
        ) : posts.length ? (
          posts.map((post) => <SinglePost key={post._id} post={post} />)
        ) : (
          <span className="flex">No post available</span>
        )}
      </div>
    </div>
  );
}
