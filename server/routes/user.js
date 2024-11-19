import express from "express";
import {
  getMyProfile,
  login,
  newUser,
  logout,
  searchUser,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  loginValidator,
  registerValidator,
  validateHandler,
} from "../lib/validator.js";

//Express->Contain Router for Routing purpose
const app = express.Router();

// singleAvatar is a middleware for media file
// app.post(/routes,....MIDDLEWARE....,Funcn)->|
app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);

// After here user must be Logged in To Acess the routes
app.get("/me", isAuthenticated, getMyProfile);
app.get("/logout", isAuthenticated, logout);
app.get("/searchUser", isAuthenticated, searchUser);
export default app;
