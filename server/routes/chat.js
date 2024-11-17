import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  getMyChat,
  getMyGroups,
  newGroupChat,
  removeMembers,
} from "../controllers/chat.js";

//Express->Contain Router for Routing purpose
const app = express.Router();

// isAuthenticated Middleware all below routes will use
app.use(isAuthenticated);

app.post("/new", newGroupChat);
app.get("/my", getMyChat);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMembers);
app.put("/removemembers", removeMembers);
export default app;
