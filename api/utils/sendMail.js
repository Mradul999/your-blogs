import transporter from "../config/nodemailer.js"
export const sendMail=async(email,otp)=>{
    const mailOptions={
        from:'yourBlogs',
        to:email,
        subject:"Register using this OTP",
        text:`Your OTP is ${otp}`
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log("Mail sent successfully");
        return { success: true, message: "Mail sent successfully" };
      } catch (error) {
        console.error("Failed to send OTP:", error);
        return { success: false, message: "Failed to send OTP" };
      }



}