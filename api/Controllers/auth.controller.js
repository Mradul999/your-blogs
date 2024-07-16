import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import otpGenerator from "otp-generator";
import OTP from "../Models/otp.model.js";
import { sendMail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//signup functionality
export const signup = async (req, res) => {
  const { name, email, password, profilePic } = req.body;
  try {
    //checking empty fields
    if (!name || !email || !password) {
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
    const username =
      name.replace(/\s+/g, "").toLowerCase() +
      Math.floor(1000 + Math.random() * 9000);

    const hashedPass = bcryptjs.hashSync(password, 10);
    //creating a new user in the db with the current data
    const newUser = new User({
      username,
      email,
      password: hashedPass,
      profilePic,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Internal server error",
    });
  }
};

//generating otp and sending to user mail
export const GenerateOTP = async (req, res) => {
  //generate otp
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already registered please login.",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //save this otp in the db
    const newOtp = new OTP({
      email,
      otp,
    });
    await newOtp.save();

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

//verifying the otp
export const VerifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const otpDoc = await OTP.findOne({ email });
    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (parseInt(otp) !== parseInt(otpDoc.otp)) {
      return res.status(409).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    res.status(200).json({
      success: true,
      message: "otp verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//signin
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    const { password: pass, ...rest } = user._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//google authentication
export const googleAuth = async (req, res) => {
  try {
    const { email, displayName, photoURL } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      //generate a random password for this user
      const username =
        displayName.replace(/\s+/g, "").toLowerCase() +
        Math.floor(1000 + Math.random() * 9000);
      const randomPass = username + Math.floor(1000 + Math.random() * 9000);
      const hashedPass = bcryptjs.hashSync(randomPass, 10);

      const newUser = new User({
        email,
        username,
        profilePic: photoURL,
        password: hashedPass,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, 
        );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          
        })
        .json(rest);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//updating the user

