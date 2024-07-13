import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import otpGenerator from "otp-generator";
import OTP from "../Models/otp.model.js";
import { sendMail } from "../utils/sendMail.js";
//signup functionality
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

    if (parseInt(otp)!==parseInt(otpDoc.otp)) {
      return res.status(409).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // if (otpDoc.createdAt < new Date(Date.now() - 2 * 60 * 1000)) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "otp expire please generate a new otp",
    //   });
    // }

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

export const signin=async(req,res)=>{
  try {

    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch=bcryptjs.compareSync(password,user.password);
    if(!isMatch){
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    res.status(200).json({
      success: true,
      message: "User signed in successfully",
    });

    
  } catch (error) {
    res.status({
      success: false,
      message: "Internal server error",
    })
    
  }

}
