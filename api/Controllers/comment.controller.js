import Comment from "../Models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const { content, userId, postId } = req.body;

    if (userId !== req.user.id) {
      return res.status(401).json({
        succcess: false,
        message: "you are not allowed to make comment",
      });
    }
    const newComment = new Comment({
      content,
      userId,
      postId,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
