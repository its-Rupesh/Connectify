import express from "express";
import userRouter from "./routes/user.js";
const app = express();
const PORT = 8000;

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello Homepage");
});

app.listen(PORT, () => {
  console.log("working");
});
