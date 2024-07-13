import express from "express";
import {GenerateOTP, VerifyOTP, signup}  from "../Controllers/auth.controller.js";
const router=express.Router();

router.post("/signup",signup)
router.post("/generateotp",GenerateOTP)
router.post("/verifyotp",VerifyOTP)

export default router;