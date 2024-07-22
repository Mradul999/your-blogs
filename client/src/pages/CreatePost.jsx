import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import app from "../firebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "../Components/bg.css";
import axios from "axios";

export default function CreatePost() {
  const [imageFile, setImageFile] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const [imgUploadingError, setImgUplaodingError] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const [successMessage, setsuccessMessage] = useState(null);

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const uploadImageHandler = async () => {
    if (!imageFile) {
      return;
    }
    setImgUploading(true);
    setImgUplaodingError(false);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setImgUploading(false);
        setImgUplaodingError(
          "Either image size exceed or format not supported. Upload failed"
        );
      },
      () => {
        // Upload completed successfully, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUploading(false);
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"], // adding video
      ["blockquote", "code-block"], // adding blockquote and code-block
      ["clean"], // remove formatting button
    ],
  };

  const changeHandler = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const publishHandler = async (e) => {
    e.preventDefault();
    try {
      setPublishLoading(true);
      setsuccessMessage(null);
      setPublishError(null);
      const publishResponse = await axios.post(
        "/api/post/createpost",
        formData
      );
      console.log("publish response=>", publishResponse);
      setPublishLoading(false);
      setsuccessMessage("Post created successfully");
      navigate(`/post/${publishResponse.data.slug}`);
    } catch (error) {
      setPublishLoading(false);
      if (error.response) {
        if (error.response.status === 400) {
          setPublishError(
            "Either title or content is missing. Please fill them"
          );
        } else if (error.response.status === 500) {
          setPublishError("Already a post exist with this title");
        } else {
          setPublishError("Unexpected error occurred, please try again later");
        }
      }
    }
  };

  return (
    <div className="px-auto min-h-screen flex justify-center items-center">
      <div className="md:max-w-[60%] my-10 max-w-[85%] w-full flex flex-col gap-5">
        <h1 className="text-center md:text-2xl text-xl">Create Post</h1>
        <form onSubmit={publishHandler} className="flex flex-col gap-3">
          <input
            onChange={changeHandler}
            id="title"
            placeholder="Title"
            className="focus:outline-sky-600 rounded-lg placeholder:text-slate-700 py-2 pl-2 bg-slate-200 text-slate-600"
            type="text"
          />
          <select
            onChange={changeHandler}
            className="cursor-pointer focus:outline-none rounded-lg py-1 pl-2 text-slate-700 bg-slate-200"
            id="category"
          >
            <option value="uncategorized">Select Category</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React.js">React.js</option>
            <option value="Next.js">Next.js</option>
          </select>
          <div className="flex sm:flex-row flex-col justify-between items-center border-dotted border-teal-500 border-[3px] rounded-md p-5">
            <input
              accept="image/*"
              className="rounded-lg sm:w-[33%] w-full bg-red-500"
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <div className="flex flex-col">
              <button
                type="button"
                onClick={uploadImageHandler}
                disabled={imgUploading}
                className={`bg-gradient-to-br mt-2 px-2 sm:px-5 from-purple-600 transition-all ${
                  imgUploading
                    ? "cursor-not-allowed"
                    : "cursor-pointer hover:scale-95 hover:bg-gradient-to-bl"
                } to-blue-500 rounded-lg sm:py-3 py-2 text-[13px] sm:text-[15px] font-medium`}
              >
                {imgUploading ? (
                  <span className="loader h-6 w-6"></span>
                ) : (
                  "Upload Image"
                )}
              </button>
            </div>
          </div>
          {imgUploadingError && (
            <span className="sm:text-[14px] text-[12px] text-center text-red-600">
              {imgUploadingError}
            </span>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="object-contain w-full h-72"
            />
          )}
          <ReactQuill
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
            modules={modules}
            theme="snow"
            placeholder="Write your post here..."
            className="w-full h-72 bg-white mb-[6rem] sm:mb-12 "
          />
          {publishError && (
            <p className="text-[14px] sm:text-[18px] text-center bg-red-500 rounded-lg py-2">
              {publishError}
            </p>
          )}
          {successMessage && (
            <p className="text-[14px] sm:text-[18px] text-center bg-green-500 rounded-lg py-2">
              {successMessage}
            </p>
          )}
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-center"
          >
            {publishLoading ? (
              <span className="loader h-6 w-6"></span>
            ) : (
              "Publish"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
