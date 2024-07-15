import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userid) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to update this user",
    });
  }

  const { password, username, profilePic } = req.body;
  const updateData = {};

  if (password) {
    if (password.length < 6 || password.length > 15) {
      return res.status(401).json({
        success: false,
        message: "Password should be between 6 and 15 characters",
      });
    }
    const hashedPass = bcryptjs.hashSync(password, 10);
    updateData.password = hashedPass;
  }

  if (username) {
    if (
      username.includes(" ") ||
      username.length < 7 ||
      username.length > 12 ||
      /[^a-zA-Z0-9]/.test(username) ||
      username !== username.toLowerCase()
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Username should be 7-12 characters long, all lowercase letters, and should not contain spaces or special characters",
      });
    }
    updateData.username = username;
  }

  if (profilePic) {
    updateData.profilePic = profilePic;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userid,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { password, ...rest } = updatedUser._doc;

    res.json({ success: true, rest });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
