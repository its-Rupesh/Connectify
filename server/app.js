import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";

import chatRouter from "./routes/chat.js";
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";

//MongoDb Connection Using env file
dotenv.config({ path: "./.env" });
const mongoURL = process.env.MONGO_URL;
connectDB(mongoURL);

const adminKey = process.env.ADMIN_SECRET_KEY;

const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());

const PORT = 8000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
// Routing
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/admin", adminRouter);
app.get("/", (req, res) => {
  res.send("Hello Homepage");
});

// Error Handler Middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${envMode}`);
});
export { adminKey, envMode };
