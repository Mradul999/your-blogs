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
      return res.status(402).json({
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

    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//deleting the user completelyt from backend and frotnend
export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin) {
    if (req.user.id !== req.params.userid) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this user",
      });
    }
  }

  try {
    await User.findByIdAndDelete(req.params.userid);
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const signoutUser = async (req, res) => {
  try {
    res.clearCookie("access_token");
   
    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    console.log("Users without password:", usersWithoutPassword);

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




export const getUser=async(req,res)=>{

  try {
    const user= await User.findById(req.params.userId);
    res.status(200).json(user);
    
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "User not found"
    })
    
  }


}
