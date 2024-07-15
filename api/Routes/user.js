import express from "express";
const router=express.Router();
import { verifyToken ,} from "../utils/verifyUser.js";
import { updateUser } from "../Controllers/auth.controller.js";
router.put("/update/:userid",verifyToken,updateUser);

export default router;