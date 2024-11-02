import { User } from "../models/user.js";

//Create New User and Save it to Database and cookies
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  console.log(req.body);

  const avatar = {
    public_id: "asdfg",
    url: "cvbnm",
  };

  await User.create({
    name,
    username,
    password,
    avatar,
    bio,
  });
  res.status(201).json({ status: "User CREATED" });
};
const login = (req, res) => {
  res.send("Hello From login");
};

export { login, newUser };
