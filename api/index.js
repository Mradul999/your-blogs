import mongoose from "mongoose";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import authRoute from "./Routes/auth.js";

app.use(express.json());

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
