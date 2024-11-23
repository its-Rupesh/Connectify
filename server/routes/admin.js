import express from "express";
import {
  allChats,
  allMessages,
  allUser,
  getDashboardStats,
} from "../controllers/admin.js";
const app = express.Router();

app.get("/", allUser);
app.get("/chats", allChats);
app.get("/messages", allMessages);
app.post("/verify");
app.get("/logout");
app.get("/users");
app.get("/stats", getDashboardStats);
export default app;
