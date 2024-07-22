import React from "react";
import { Link } from "react-router-dom";

export default function SinglePost({ post }) {
  return (
    <div className="max-w-[400px] w-full  sm:h-[300px] h-[270px]    border border-sky-600 rounded-lg overflow-hidden hover:scale-95 transition-all cursor-pointer ">
      <Link to={`/post/${post?.slug}`}>
        <img
          src={post?.image}
          className="w-full h-48 object-cover"
          alt={post?.title}
        />
      </Link>
      <div className="sm:p-4 p-1 h-full bg-white">
        <h3 className="sm:text-lg font-semibold mb-2 text-sky-600">
          {post?.title}
        </h3>
        <p className="text-sm text-gray-600">{post?.category}</p>
      </div>
    </div>
  );
}
