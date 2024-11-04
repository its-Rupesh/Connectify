import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

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
// Try Catch ckeck flow .txt file
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Select [User Schema ->False] To select password also we use select
    const user = await User.findOne({ username }).select("+password");
    // Error Handling 1.Create Error instance 2.add statuscode,name,.. 3.then send using next
    if (!user) return next(new ErrorHandler("No Such User Present", 404));
    const isMatch = await compare(password, user.password);
    if (!isMatch)
      return next(new ErrorHandler("Username or Password Incorrect", 401));
    sendToken(res, user, 200, `Welcome Back ${user.name}`);
  } catch (error) {
    next(error);
  }
};
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    return res.status(200).json({
      success: true,
      data: req.user,
      user,
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("Connectify-Token", "", { ...cookieOptions, maxAge: 0 })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    next(error);
  }
};
const searchUser = async (req, res) => {
  try {
    // name{*<-url me chaiye "name"} Taken from Search query
    const { name } = req.query;

    return res.status(200).json({ success: true, message: name });
  } catch (error) {
    next(error);
  }
};
export { login, newUser, getMyProfile, logout, searchUser };
