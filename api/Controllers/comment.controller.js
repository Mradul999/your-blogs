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

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "comment not found",
      });
    }

    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.likes.push(req.user.id);
    } else {
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const editComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "comment not found",
      });
    }

    if (comment.userId.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        success: false,
        message: "you are not allowed to edit this comment",
      });
    }

    comment.content = req.body.content;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "comment not found",
      });
    }

    if (comment.userId.toString() !== req.user.id.toString()&&!req.user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "you are not allowed to delete this comment",
      });
    }
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentId
    );
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};


export const getAllComments=async(req,res)=>{
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const comments = await Comment.find()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    

    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });



    res.status(200).json({
      comments: comments,
      totalComments,
      lastMonthComments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }



}
