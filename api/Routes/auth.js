import express from "express";
import {GenerateOTP, VerifyOTP, signin, signup}  from "../Controllers/auth.controller.js";
const router=express.Router();

router.post("/signup",signup)
router.post("/generateotp",GenerateOTP)
router.post("/verifyotp",VerifyOTP)
router.post("/signin",signin)

export default router;