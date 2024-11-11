import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getMyChat, newGroupChat } from "../controllers/chat.js";

//Express->Contain Router for Routing purpose
const app = express.Router();

// isAuthenticated Middleware all below routes will use
app.use(isAuthenticated);

app.post("/new", newGroupChat);
app.get("/my",getMyChat);
export default app;
