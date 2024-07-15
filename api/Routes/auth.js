import express from "express";
import {GenerateOTP, VerifyOTP, googleAuth, signin, signup, }  from "../Controllers/auth.controller.js";

const router=express.Router();

router.post("/signup",signup)
router.post("/generateotp",GenerateOTP)
router.post("/verifyotp",VerifyOTP)
router.post("/signin",signin)
router.post("/googleauth",googleAuth)


export default router;