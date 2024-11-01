import express from "express";
import userRouter from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const mongoURL = process.env.MONGO_URL;
connectDB(mongoURL);

const app = express();
const PORT = 8000;

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello Homepage");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
