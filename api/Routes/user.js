import express from "express";
const router = express.Router();
import { verifyToken } from "../utils/verifyUser.js";
import { deleteUser, getUsers, signoutUser, updateUser } from "../Controllers/user.controller.js";

router.delete("/delete/:userid",verifyToken,deleteUser)
router.put("/update/:userid", verifyToken, updateUser);
router.post("/signout",signoutUser)
router.get("/getusers",verifyToken,getUsers);

export default router;
