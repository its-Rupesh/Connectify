import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";

//Create New User and Save it to Database and cookies
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  console.log(req.body);

  const avatar = {
    public_id: "asdfg",
    url: "cvbnm",
  };

  const user = await User.create({
    name,
    username,
    password,
    avatar,
    bio,
  });

  sendToken(res, user, 201, "User Created");
};
const login = async (req, res, next) => {
  const { username, password } = req.body;

  // Select [User Schema ->False] To select password also we use select
  const user = await User.findOne({ username }).select("+password");
  if (!user) return next(new Error("No Such User Present"));

  // console.log("user", user);
  // console.log("req->password", password);
  // console.log("dbs->password", user.password);
  // console.log("isMatch", isMatch);
  const isMatch = await compare(password, user.password);
  if (!isMatch) return next(new Error("Invalid Password"));
  sendToken(res, user, 200, `Welcome Back ${user.name}`);
};
const getMyProfile = async (res, req) => {};
export { login, newUser, getMyProfile };
