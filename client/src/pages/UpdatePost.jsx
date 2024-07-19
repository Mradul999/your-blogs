import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import { useNavigate,useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import app from "../firebase.js";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "../Components/bg.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const [imageFile, setImageFile] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const [imgUploadingError, setImgUplaodingError] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [successMessage, setsuccessMessage] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  console.log("data of the form=>",formData);
  const {postId}=useParams();

  const {currentUser}=useSelector((state)=>state.user);


  useEffect(()=>{
    try {
        const getSinglePost=async()=>{
            const postResponse=await axios.get(`/api/post/getposts?postId=${postId}`);
            // console.log("post response=>",postResponse)
            setFormData(postResponse.data.posts[0]);
           

        }
        getSinglePost();
        
        
    } catch (error) {
        console.log(error);
        
    }



  },[postId])

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

  const changeHandler = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      setsuccessMessage(null);
      setUpdateError(null);
      const updateResponse = await axios.put(
        `/api/post/update/${postId}/${currentUser.data._id}`,
        formData
      );
      console.log("update response=>",updateResponse);
      setUpdateLoading(false);
      setsuccessMessage("Post updated successfully");
      navigate(`/post/${updateResponse.data.slug}`)

    } catch (error) {
      setUpdateLoading(false);
      if (error.response) {
        if (error.response.status === 400) {
          setUpdateError(
            "Either title or content is missing. Please fill them"
          );
        } else if (error.response.status === 500) {
          setUpdateError("Already a post exist with this title");
        } else {
          setUpdateError("unexpected error occur please try again later");
        }
      }
    }
  };

  return (
    <div className="   px-auto min-h-screen flex justify-center   items-center">
      <div className="md:max-w-[60%] my-10  max-w-[85%] w-full flex flex-col gap-5">
        <h1 className="text-center md:text-2xl text-xl">Update Post</h1>
        <form onSubmit={updateHandler} className="flex flex-col gap-3">
          <input
          value={formData.title}
            onChange={changeHandler}
            id="title"
            placeholder="Title"
            className=" focus:outline-sky-600 rounded-lg placeholder:text-slate-700  py-2 pl-2 bg-slate-200  text-slate-600"
            type="text"
          />
          <select
          value={formData.category}
            onChange={changeHandler}
            className="cursor-pointer focus:outline-none rounded-lg py-1 pl-2  text-slate-700 bg-slate-200"
            name=""
            id="category"
          >
            <option value="">Select Category</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React.js">React.js</option>
            <option value="Next.js"> Next.js</option>
          </select>
          <div className="flex sm:flex-row flex-col justify-between items-center  border-dotted border-teal-500 border-[3px] rounded-md p-3  ">
            <input
              accept="image/*"
              className="rounded-lg sm:w-[33%] w-full  bg-red-500"
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <div className="flex flex-col">
              <button
                type="button"
                onClick={uploadImageHandler}
                disabled={imgUploading}
                className={`bg-gradient-to-br mt-2 px-2 sm:px-5 from-purple-600  transition-all ${
                  imgUploading
                    ? "cursor-not-allowed"
                    : "cursor-pointer hover:scale-95 hover:bg-gradient-to-bl"
                } to-blue-500 rounded-lg sm:py-3 py-2 text-[13px] sm:text-[15px] font-medium `}
              >
                {imgUploading ? (
                  <span className="loader  h-6 w-6  "></span>
                ) : (
                  "Uplaod Image"
                )}
              </button>
            </div>
          </div>
          {imgUploadingError && (
            <span className="sm:text-[14px] text-[12px] text-center  text-red-600  ">
              {imgUploadingError}
            </span>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="object-cover w-full h-72"
            ></img>
          )}
          {}
          <ReactQuill
          value={formData.content}
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
            theme="snow"
            placeholder="Write your post here..."
            className="w-full h-72 bg-white mb-[6rem] sm:mb-12 "
          />
          {updateError && (
            <p className=" text-[14px] sm:text-[18px] text-center bg-red-500 rounded-lg py-2  ">
              {updateError}
            </p>
          )}
          {successMessage && (
            <p className=" text-[14px] sm:text-[18px] text-center bg-green-500 rounded-lg py-2  ">
              {successMessage}
            </p>
          )}
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none  focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-center"
          >
            {updateLoading ? (
              <span className="loader  h-6 w-6  "></span>
            ) : (
              "Update Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
