import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

import authRoute from "./Routes/auth.js";


dotenv.config();
const app = express();

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
