import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //checking empty fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    //checking if the user already exist in the db
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already registered please login.",
      });
    }

    //hashing the password for security

    const hashedPass = bcryptjs.hashSync(password, 10);
    //creating a new user in the db with the current data
    const newUser = new User({
      username,
      email,
      password:hashedPass,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Internal server error",
    });
  }
};
