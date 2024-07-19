import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("current user token=>",token)
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "unauthorized",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
    req.user = user;
    next();
  });
};
