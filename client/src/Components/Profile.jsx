import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "../Components/bg.css";
import app from "../firebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null); // this is to show the image uploaded by the user in the profile
  const [loading, setLoading] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // to store the uploaded image URL from Firebase
  const [imgUploadingError, setImgUplaodingError] = useState(false);

  const photoRef = useRef();

  // handling when a user inputs an image
  const imageChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  // uploading image to Firebase
  const uploadImage = async () => {
    setImgUploading(true);
    const storage = getStorage(app);
    const storageRef = ref(storage, imageFile.name);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Upload failed", error);
        setImgUploading(false);
        setImgUplaodingError(
          "Either image size exceed or format not supported. Upload failed"
        );
        setImageFileUrl(null);
      },
      () => {
        // Upload completed successfully, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadedImageUrl(downloadURL);
          setImgUploading(false);
        });
      }
    );
  };

  //form submit
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-screen h-screen flex justify-center  items-center">
      <div className="flex flex-col  gap-6 max-w-[500px]   bg-slate-600 md:py-10 py-4 sm:px-6 px-3 mx-3 w-full  rounded-lg profileCard">
        <h1 className="text-center text-4xl font-medium">Profile</h1>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={imageChangeHandler}
          ref={photoRef}
        />
        <div className="relative flex items-center justify-center">
          <img
            onClick={() => photoRef.current.click()}
            src={imageFileUrl || currentUser.data.profilePic}
            className="md:w-32 md:h-32 w-24 h-24 rounded-full mx-auto cursor-pointer img-shadow   "
            alt=""
          />
          {imgUploading && (
            <span className="loader absolute   h-16 w-16 "></span>
          )}
        </div>
        {imgUploadingError && (
          <p className="text-red-600 font-medium">*{imgUploadingError}</p>
        )}

        <form onSubmit={submitHandler} className="flex flex-col gap-3 md:gap-6">
          <input
            type="text"
            className="py-3 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 placeholder:text-white "
            defaultValue={currentUser.data.username}
            placeholder="Username"
          />
          <input
            type="text"
            className="py-3 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 placeholder:text-white "
            defaultValue={currentUser.data.email}
            placeholder="Email"
          ></input>
          <input
            placeholder="Password"
            type="password"
            className="py-3 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 placeholder:text-white "
          />
          <button className="bg-gradient-to-br mt-2 from-purple-600 hover:scale-95 transition-all to-blue-500 rounded-lg py-3 text-[15px] font-medium hover:bg-gradient-to-bl">
            {loading ? <span className="loader"></span> : "Update"}
          </button>
        </form>
        <button className="bg-red-500 hover:scale-95 transition-all rounded-lg py-3 text-[15px] font-medium ">
          {loading ? <span className="loader"></span> : "Delete Account"}
        </button>
      </div>
    </div>
  );
}
