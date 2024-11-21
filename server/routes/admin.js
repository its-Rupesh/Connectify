import express from "express";
import { allChats, allUser } from "../controllers/admin.js";
const app = express.Router();

app.get("/", allUser);
app.get("/chats", allChats);
app.post("/verify");
app.get("/logout");
app.get("/users");
app.get("/messages");
app.get("/stats");
export default app;
