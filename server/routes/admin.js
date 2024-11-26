import express from "express";
import {
  adminLogin,
  adminLogOut,
  allChats,
  allMessages,
  allUser,
  getDashboardStats,
} from "../controllers/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validator.js";
const app = express.Router();

app.post("/verify", adminLoginValidator(), validateHandler, adminLogin);
app.get("/logout", adminLogOut);
// Only Admin Can access
app.get("/");
app.get("/users", allUser);
app.get("/chats", allChats);
app.get("/messages", allMessages);
app.get("/stats", getDashboardStats);
export default app;
