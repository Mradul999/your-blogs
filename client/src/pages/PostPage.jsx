import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

import "../Components/bg.css";
export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  console.log(post);

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/post/getposts?slug=${postSlug}`);

        setPost(response.data.posts[0]);
        setLoading(false);
      } catch (error) {}
    };
    getPost();
  }, [postSlug]);

  return (
    <div className=" overflow-x-hidden ">
      <div className="w-screen min-h-screen flex justify-center my-10">
        {loading && (
          <span className="loader mt-[15rem] w-[50px] h-[50px]"></span>
        )}
        {post && (
          <div className="flex flex-col gap-6 max-w-[1000px] w-full">
            <h1 className="text-4xl font-medium">{post.title}</h1>
            <div className="flex justify-between items-center">
                <Link to={`/search?category=${post.category}`}><p className="bg-violet-700 hover:cursor-pointer hover:scale-105 transition-all rounded-full px-2 py-1">{post.category}</p></Link>
                
            <p className="font-medium"><span className="">Created on </span>  {new Date(post.createdAt).toLocaleDateString()}</p>

            </div>
            <img src={post.image} alt="post image"  className="w-full  rounded-md " />
            <div className="post-content mx-auto mt-3"
              dangerouslySetInnerHTML={{
                __html:post.content,
              }}
            />
            


            
          </div>
        )}
      </div>
    </div>
  );
}
