import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";
import { createUser } from "./seeders/user.js";

//MongoDb Connection Using env file
dotenv.config({ path: "./.env" });
const mongoURL = process.env.MONGO_URL;
connectDB(mongoURL);

const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());

const PORT = 8000;

// Routing
app.use("/user", userRouter);
app.use("/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("Hello Homepage");
});

// Error Handler Middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
