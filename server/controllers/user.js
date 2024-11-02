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
const login = async (req, res) => {
  const { username, password } = req.body;

  // Select [User Schema ->False] To select password also we use select
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return res.status(300).json({ message: "No User Available" });
  }
  console.log("user", user);
  console.log("req->password", password);
  console.log("dbs->password", user.password);
  const isMatch = await compare(password, user.password);
  console.log("isMatch", isMatch);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Password" });
  }
  sendToken(res, user, 200, `Welcome Back ${user.name}`);
};

export { login, newUser };
