import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  updateSuccess,
  deleteUserSuccess,
  signoutUserSuccess,
} from "../redux/slices/UserSlice.js";
import { useDispatch } from "react-redux";
import "../Components/bg.css";
import app from "../firebase.js";
import axios from "axios";
import { CgDanger } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";

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
  const [successMessage, setsuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const [deleteLoading, setDeleteLoading] = useState(false);

  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const photoRef = useRef();

  // handling when a user inputs an image
  const imageChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const modalHandler = () => {
    setModal(true);
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
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
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
          setFormData({ ...formData, profilePic: downloadURL });
          setImgUploading(false);
        });
      }
    );
  };
  //changing form state
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //form submit
  const submitHandler = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }

    try {
      setLoading(true);
      setsuccessMessage(null);
      setErrorMessage(null);

      const updateResponse = await axios.put(
        `/api/user/update/${currentUser.data._id}`,
        formData
      );

      if (updateResponse.status === 200) {
        setsuccessMessage("Profile updated successfully");

        setLoading(false);
        dispatch(updateSuccess(updateResponse));
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 402) {
          setErrorMessage(
            "Username should be 7-12 characters long, all lowercase letters, and should not contain spaces or special characters"
          );
        } else if (error.response.status === 401) {
          setErrorMessage("Password should be between 6 and 15 characters");
        } else if (error.response) {
          setErrorMessage("Network error. Please try again.");
        } else {
          setErrorMessage("unexpected error occured");
        }
      }
    }
  };

  //delete handler
  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      console.log("current user id", currentUser.data._id);
      const deleteResponse = await axios.delete(
        `/api/user/delete/${currentUser.data._id}`
      );
      if (deleteResponse.status === 200) {
        setDeleteLoading(false);
        dispatch(deleteUserSuccess());
        navigate("/signin");
      }
    } catch (error) {
      setDeleteLoading(false);
      console.log(error);
    }
  };

  //signout handler
  const signoutHandler = async () => {
    try {
      const signoutResponse = await axios.post("/api/user/signout");
      if (signoutResponse.status === 200) {
        dispatch(signoutUserSuccess());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen relative px-auto min-h-screen flex justify-center  items-center">
      {modal && (
        <div className="  modal-overlay ">
          <div className=" absolute  mx-3   bg-white  z-20 py-6 md:py-16 flex flex-col gap-4 px-2  md:px-10 rounded-md">
            <CgDanger className="text-gray-600 mx-auto text-5xl md:text-7xl" />

            <h1 className="sm:text-2xl text-center  text-gray-500">
              Are you sure to delete this account
            </h1>
            <div className="flex md:flex-row flex-col justify-center gap-4">
              <button
                onClick={deleteHandler}
                className="bg-red-600 hover:bg-red-800 text-white sm:text-xl font-medium py-2  px-8 rounded-md"
              >
                Yes,sure
              </button>
              <button
                onClick={() => setModal(false)}
                className="bg-gray-600 hover:bg-gray-800 sm:text-xl text-white font-medium py-2 px-8 rounded-md"
              >
                No,Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col  gap-6 max-w-[500px]    bg-slate-600  py-4   sm:px-6 px-3 mx-3 w-full  rounded-lg profileCard">
        <h1 className="text-center text-2xl sm:text-4xl font-medium">Profile</h1>
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
        {imgUploading && <p className="text-green-600  text-center text-[1.1rem]">please wait image is uploading</p>}

        <form onSubmit={submitHandler} className="flex flex-col gap-3 md:gap-3">
          <input
            id="username"
            onChange={changeHandler}
            type="text"
            className="py-4 rounded-lg text-[13px] pl-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 placeholder:text-white "
            defaultValue={currentUser.data.username}
            placeholder="Username"
          />
          <input
            id="email"
            readOnly
            onChange={changeHandler}
            type="text"
            className="py-4 rounded-lg cursor-not-allowed  text-[13px] pl-2 bg-slate-700 focus:outline-none  focus:border-sky-400 placeholder:text-white "
            value={currentUser.data.email}
            placeholder="Email"
          ></input>
          <input
            id="password"
            onChange={changeHandler}
            placeholder="Password"
            type="password"
            className="py-4 rounded-lg text-[13px] pl-2 pr-2 bg-slate-700 focus:outline-none focus:border-[0.2rem] focus:border-sky-400 placeholder:text-white "
          />

          {successMessage && (
            <button className="rounded-lg py-3 text-[15px] font-medium bg-green-500">
              {successMessage}
            </button>
          )}
          {errorMessage && (
            <button className="rounded-lg py-3 text-[15px] font-medium bg-red-600">
              !! {errorMessage}
            </button>
          )}
          <button disabled={imgUploading}  className={`bg-gradient-to-br mt-2 from-purple-600  transition-all ${imgUploading?"cursor-not-allowed":"cursor-pointer hover:scale-95 hover:bg-gradient-to-bl"} to-blue-500 rounded-lg py-3 text-[15px] font-medium `}>
            {loading ? <span className="loader"></span> : "Update Profile"}
          </button>
          <NavLink  to="/createpost">
            {currentUser?.data.isAdmin && (
              <button  type="button" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-95 transition-all w-full  rounded-lg py-3 text-[15px] font-medium hover:bg-gradient-to-bl">
                Create a post
              </button>
            )}
          </NavLink>
        </form>
        <div className="flex justify-between">
          <button
            onClick={modalHandler}
            className=" hover:scale-95 transition-all rounded-lg mt-1  text-[15px] text-red-600 font-medium "
          >
            Delete Account
          </button>
          <button
            onClick={signoutHandler}
            className=" hover:scale-95 transition-all rounded-lg mt-1  text-[15px] text-red-600 font-medium "
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
