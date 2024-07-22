import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import postRoute from "./Routes/post.js";
import commentroute from "./Routes/comment.js";
import suggestionroute from "./Routes/suggestion.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB connected successfuly");
  })
  .catch(() => {
    console.log("Error while connecting to DB");
  });

app.listen(process.env.PORT, () => {
  console.log("Server is runnin on port 3000");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentroute);
app.use("/api/suggestion", suggestionroute);
