import express from "express";
import { login, newUser } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";

//Express->Contain Router for Routing purpose
const app = express.Router();

// singleAvatar is a middleware for media file
// app.post(/routes,....MIDDLEWARE....,Funcn)->|
app.post("/new", singleAvatar, newUser);

app.post("/login", login);

export default app;