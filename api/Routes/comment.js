import express from "express";
import { createComment, deleteComment, editComment, getAllComments, getComments, likeComment } from "../Controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";



const router = express.Router();

router.post("/create",verifyToken,createComment)
router.get("/getcomments/:postId",getComments);
router.put("/like/:commentId",verifyToken,likeComment)
router.put("/edit/:commentId",verifyToken,editComment)
router.delete("/delete/:commentId",verifyToken,deleteComment);
router.get("/getallcomments",verifyToken,getAllComments);
export default router;
