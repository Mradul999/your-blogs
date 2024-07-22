import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

import Header from "./Components/Header";
import OTPVerification from "./pages/OTPVerification";
import Footer from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";
import IsAdminPrivateRoute from "./Components/IsAdminPrivateRoute";

import "./App.css";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./Components/ScrollToTop";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />

        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<Contact />} />
        
          <Route path="search" element={<Search />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/otpverification" element={<OTPVerification />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/createpost"
            element={
              <IsAdminPrivateRoute>
                <CreatePost />
              </IsAdminPrivateRoute>
            }
          />
          <Route
            path="/updatepost/:postId"
            element={
              <IsAdminPrivateRoute>
                <UpdatePost />
              </IsAdminPrivateRoute>
            }
          />
          <Route path="/post/:postSlug" element={<PostPage />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}
