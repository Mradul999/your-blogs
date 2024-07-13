import express from "express";
import {GenerateOTP, signup}  from "../Controllers/auth.controller.js";
const router=express.Router();

router.post("/signup",signup)
router.post("/generateotp",GenerateOTP)

export default router;