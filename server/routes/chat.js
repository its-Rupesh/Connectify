import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachementsMulter } from "../middlewares/multer.js";
import {
  addMembers,
  getMyChat,
  getMyGroups,
  newGroupChat,
  removeMembers,
  leaveGroup,
  sendAttachments,
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
app.delete("/leave/:id", leaveGroup);
app.post("/message", attachementsMulter, sendAttachments);
//Get Messages
// Get Chat Details,rename,delete
export default app;
