import express from "express";
import { getMyProfile, login, newUser } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

//Express->Contain Router for Routing purpose
const app = express.Router();

// singleAvatar is a middleware for media file
// app.post(/routes,....MIDDLEWARE....,Funcn)->|
app.post("/new", singleAvatar, newUser);
app.post("/login", login);

// After here user must be Logged in To Acess the routes
app.get("/me", isAuthenticated, getMyProfile);
export default app;
