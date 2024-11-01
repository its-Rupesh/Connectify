import express from "express";
import { login, newUser } from "../controllers/user.js";

//Express->Contain Router for Routing purpose
const app = express.Router();
app.post("/new", newUser);
app.post("/login", login);

export default app;
