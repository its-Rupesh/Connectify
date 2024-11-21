import express from "express";
import {
  getMyProfile,
  login,
  newUser,
  logout,
  searchUser,
  sendrequest,
  acceptrequest,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  loginValidator,
  registerValidator,
  sendrequestValidator,
  validateHandler,
  acceptrequestValidator,
} from "../lib/validator.js";

//Express->Contain Router for Routing purpose
const app = express.Router();

// singleAvatar is a middleware for media file
// app.post(/routes,....MIDDLEWARE....,Funcn)->|
app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);

// After here user must be Logged in To Acess the routes
app.use(isAuthenticated);
app.get("/me", getMyProfile);
app.get("/logout", logout);
app.get("/searchUser", searchUser);
app.put("/sendrequest", sendrequestValidator(), validateHandler, sendrequest);
app.put(
  "/accept-request",
  acceptrequestValidator(),
  validateHandler,
  acceptrequest
);
export default app;
