import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex justify-center ">
      <div className="flex flex-col max-w-[1000px] w-full gap-6 mx-2 sm:text-[1.2rem] text-[15px] mt-20">
        <h1 className="text-center sm:text-3xl text-xl">Welcome to devBlogs</h1>
        <p className="text-center ">This blog website is created by Mradul. Here you will find blogs related to web developement,software engineering and programming.You can also  add your thoughts in the comment section of articles.There is also a filter functionality in the search section where you can find articles by filtering them accordingly. please share your suggestions in the contact us page.</p>
      </div>
    </div>
  );
}
