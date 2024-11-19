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
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages,
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
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);
app.get("/message/:id", getMessages);
export default app;
