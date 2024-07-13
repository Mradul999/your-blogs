import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import otpGenerator from "otp-generator";

import { sendMail } from "../utils/sendMail.js";
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
      return res.status(409).json({
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
      password: hashedPass,
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

export const GenerateOTP = async (req, res) => {
  //generate otp
  try {
    const {email}=req.body;
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets:false,
      specialChars: false,
    });

    //save this otp in the db
    //send this otp to the user
    const mailResponse = await sendMail(email, otp);
    if (mailResponse.success) {
      res.status(200).json({
        success: true,
        message: "OTP generated and sent successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        message: mailResponse.message,
      });
    }
  } catch (error) {
    res.status.json({
      success: false,
      message: "Failed to generate OTP",
    });
  }
};
